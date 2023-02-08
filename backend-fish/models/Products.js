const { Schema, model } = require('mongoose')

ObjectId = Schema.ObjectId;

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  unit: { type: String, required: true },
  images: { type: ObjectId },
  available: { type: String },
  fixedPrice: { type: String },
})

module.exports = model('Products', schema, 'Products')
