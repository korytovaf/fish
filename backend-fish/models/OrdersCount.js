const { Schema, model } = require('mongoose')

const schema = new Schema({
  count: { type: Number, required: true },
})

module.exports = model('OrdersCount', schema, 'OrdersCount')
