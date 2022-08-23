const { Schema, model } = require('mongoose')

const products_basket = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  volume: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  unit: { type: String, required: true }
})

const schema = new Schema({
  consumer: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products_basket: { type: [products_basket], required: true },
  totalPriceBasket: { type: Number, required: true },
  time: { type: Date, default: Date.now },
  count: { type: Number, required: true },
})

module.exports = model('Orders', schema, 'Orders')
