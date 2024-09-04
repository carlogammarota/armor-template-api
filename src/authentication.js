const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require("express-session");
const path = require("path");
const { permission } = require("process");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  // Configuración de la sesión
  app.use(
    session({
      secret: "yourSecretKey",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  const axios = require("axios");

  const getSubdomain = (req) => {
    const host = req.headers.host;
    const subdomain = host.split(".")[0]; // Obtén el primer segmento del dominio
    return subdomain !== "armortemplate" ? subdomain : null;
  };

  // Configuración de Passport.js
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "581198273846-ddc8u98cf5g86rskj9c011oai3sgtbur.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: (req) => {
          const subdomain = getSubdomain(req);
          return subdomain
            ? `https://api-${subdomain}.armortemplate.site/auth/google/callback`
            : `https://api.armortemplate.site/auth/google/callback`;
        },
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const subdomain = getSubdomain(request);
          const userService = app.service("users");

          // Busca al usuario en la base de datos por googleId o email en la API principal
          let result = await userService.find({
            query: {
              $or: [{ googleId: profile.id }, { email: profile.email }],
            },
          });

          let user;

          if (result.total === 0) {
            // Si el usuario no existe en la API principal, lo crea
            user = await userService.create({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.email,
              image: profile.picture,
              name: profile.displayName,
              permissions: ["customer"],
            });
          } else {
            // Si el usuario ya existe, lo usa
            user = result.data[0];
          }

          // Crear el usuario en la API del subdominio si es necesario
          if (subdomain) {
            // Crea el usuario en el subdominio
            await axios.post(
              `https://api-${subdomain}.armortemplate.site/users`,
              {
                strategy: "local",
                email: user.email,
                password: "google-auth",
              }
            );

            // Realizar el POST a api/superpassword en el subdominio
            const superpasswordResponse = await axios.post(
              `https://api-${subdomain}.armortemplate.site/superpassword`,
              {
                email: user.email,
                superPassword: "super_secret_password_123",
              }
            );

            // Extraer el token y user_id del response
            const {
              accessToken: token,
              user: { _id: user_id },
            } = superpasswordResponse.data;

            // Adjuntar el token y user_id al usuario
            user = { ...user, token, user_id };
          } else {
            // Genera un token JWT para el usuario en la API principal
            const payload = { userId: user._id.toString() };
            const jwt = await app
              .service("authentication")
              .createAccessToken(payload, {
                subject: user._id.toString(),
                issuer: "feathers",
              });

            // Adjunta el token al usuario
            user = { ...user, token: jwt };
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialización y deserialización de usuario
  passport.serializeUser(function (user, done) {
    done(null, user._id); // Usa _id si es MongoDB
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await app.service("users").get(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Rutas de autenticación
  app.get("/auth/google", (req, res, next) => {
    const subdomain = getSubdomain(req);
    passport.authenticate("google", {
      scope: ["email", "profile"],
      state: subdomain, // Pasar el subdominio como estado si es necesario
    })(req, res, next);
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
    }),
    (req, res) => {
      // Redirige al éxito y pasa el token JWT
      const subdomain = getSubdomain(req);
      const redirectUrl = subdomain
        ? `https://${subdomain}.armortemplate.site/autologin?token=${req.user.token}&user_id=${req.user.user_id}`
        : `https://armortemplate.site/autologin?token=${req.user.token}&user_id=${req.user._id}`;

      res.redirect(redirectUrl);
    }
  );

  //pico.charlygproducciones.com/auth/google/callback?code=4%2F0ATx3LY6TNvFQtpCV5u-D3G7oB16n2qFZB_wLgjNe6eoeb92oiHJHEBdfv6-RhIH02Bq7gA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=4&prompt=consent

  // app.get("/auth/google/success", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/success.html"));
  // });

  // app.get("/auth/google/failure", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/failure.html"));
  // });

  // app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });
  const passwordSecret = async (req, res, next) => {
    // La contraseña maestra llega con el email y tiene que ser "super_secret_password_123", si no, no se autentica.
    const { superPassword } = req.body;
    console.log(superPassword);
    if (superPassword === "super_secret_password_123") {
      return next(); // Proceed to the next middleware or route handler.
    }

    res.status(401).send("Unauthorized");
    return; // Stop further execution.
  };

  // Super password para autenticar con solo el usuario.
  app.post("/superpassword", passwordSecret, async (req, res) => {
    const userService = app.service("users");
    const { email, password } = req.body;

    try {
      const result = await userService.find({
        query: {
          email,
          // password,
        },
      });

      if (result.total === 0) {
        return res.status(401).send("Unauthorized");
      } else {
        const user = result.data[0];
        const payload = { userId: user._id.toString() };
        const jwt = await app
          .service("authentication")
          .createAccessToken(payload, {
            subject: user._id.toString(),
            issuer: "feathers",
          });

        return res.send({ token: jwt, user });
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });

  app.use("/authentication", authentication);
  app.configure(expressOauth());
};
