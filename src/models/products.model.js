// products-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'products';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({

    // General fields
    title: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    metaData: { type: Object, required: true },
    category: { type: Object, required: true },
    user_id: { type: String, required: true },
    user: { type: Object, required: true },
    slug: { type: String, required: true },
    categoryId: { type: String, required: true },
    subcategory: { type: String, required: true },
    type: { type: String, required: true },
    iva: { type: Boolean, required: false },

    // Automotive fields (if needed)
    brand: { type: String },
    model: { type: String },
    year: { type: String },
    km: { type: String },
    color: { type: String },
    fuel: {
      type: String,
      enum: ['Nafta', 'Diesel', 'GNC', 'Híbrido', 'Eléctrico']
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automática']
    },
    condition: {
      type: String,
      enum: ['Nuevo', 'Usado', 'Usado con detalles', 'New', 'Used', 'Used with details']
    },
    doors: { type: String },
    seats: { type: String },
    engine: { type: String },
    power: { type: String },
    torque: { type: String },
    consumption: { type: String },
    emissions: { type: String },
    topSpeed: { type: String },
    acceleration: { type: String },

    // Nautical-specific fields
    boatType: {
      type: String,
      enum: [
        'Yacht', 'Sailboat', 'Speedboat', 'Fishing Boat', 
        'Catamaran', 'Houseboat', 'Cruiser', 'Jet Ski',
        'Pontoon Boat', 'Kayak', 'Canoe', 'Inflatable Boat',
        'Trawler', 'Dinghy', 'Row Boat', 'Motorboat', 'RIB'
      ]
    },
    length: { type: String }, // Length of the boat
    beam: { type: String }, // Width at the widest point of the boat
    draft: { type: String }, // Depth of the boat below the waterline
    displacement: { type: String }, // Weight of the water displaced by the boat
    hullMaterial: {
      type: String,
      enum: ['Fiberglass', 'Aluminum', 'Steel', 'Wood', 'Composite']
    },
    propulsionType: {
      type: String,
      enum: ['Inboard', 'Outboard', 'Sail', 'Electric', 'Hybrid']
    },
    numberOfCabins: { type: Number }, // Number of cabins on the boat
    numberOfBerths: { type: Number }, // Number of sleeping places
    heads: { type: Number }, // Number of bathrooms/toilets
    fuelCapacity: { type: String }, // Fuel capacity in liters or gallons
    waterCapacity: { type: String }, // Freshwater capacity
    maxSpeed: { type: String }, // Maximum speed of the boat
    cruisingSpeed: { type: String }, // Cruising speed of the boat
    range: { type: String }, // Maximum distance the boat can travel
    builder: { type: String }, // Name of the builder/manufacturer
    designer: { type: String }, // Name of the boat designer
    yearBuilt: { type: String }, // Year the boat was built
    registrationNumber: { type: String }, // Boat registration number
    flag: { type: String }, // Country of registration
    location: { type: String }, // Location where the boat is currently docked or stored

    // Real Estate fields
    propertyType: {
      type: String,
      enum: ['House', 'Apartment', 'Condo', 'Townhouse', 'Land']
    },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    bedrooms: { type: Number, required: false },
    bathrooms: { type: Number, required: false },
    squareFeet: { type: Number },
    lotSize: { type: String },
    yearBuilt: { type: Number },
    garage: { type: Number }, // Number of garage spaces
    parkingSpaces: { type: Number }, // Number of additional parking spaces
    heating: { type: String },
    cooling: { type: String },
    hoaFees: { type: Number }, // Homeowners Association fees if applicable
    propertyStatus: {
      type: String,
      enum: ['For Sale', 'For Rent', 'Sold', 'Rented']
    },
    rentalPrice: { type: Number }, // Rental price if the property is for rent
    salePrice: { type: Number }, // Sale price if the property is for sale

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
