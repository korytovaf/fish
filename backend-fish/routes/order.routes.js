require('dotenv').config()

const { Router } = require('express')
const Orders = require("../models/Orders")
const OrdersCount = require("../models/OrdersCount")
const router = Router()
const TelegramApi = require('node-telegram-bot-api')

const bot = new TelegramApi(process.env.TG_BOT_TOKEN)
bot.on('message', msg => {
  console.log(msg)
})


bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  console.log(msg);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);

});


// /api/v1/order
router.get('/', async (req, res) => {
  try {
    const orders = await Orders.find()
    res.status(200).json(orders)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// /api/v1/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Orders.findOne({ _id: req.params.id })
    res.status(200).json(order)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// /api/v1/orders
router.post('/', async (req, res) => {
  try {
    // Счетчик заказов
    const ordersCount = await OrdersCount.findOne()
    if (!ordersCount) {
      const count = new OrdersCount({count: 1})
      await count.save()
    } else {
      await OrdersCount.findOneAndUpdate(
        { _id: ordersCount._id },
        { count: ordersCount.count + 1 },
        { returnDocument: "after" })
    }

    //Создаем заказ в базе
    const newOrder = new Orders({ ...req.body, count: ordersCount ? ordersCount.count + 1 : 1 })
    const order = await newOrder.save()

    // Отправляем заказ в телеграм чат
    if (order) {
      const listProducts = []
      order.products_basket.map((item, index )=> {
        const text = `${index + 1}. ${item.name} (${item.price}) - ${item.volume}${item.unit}`
        listProducts.push(text)
      })
      const messages =
        'НОВЫЙ ЗАКАЗ - №' + order.count + '\n' +
        listProducts.join('\n') + '\n' +
        'Покупатель - ' + order.consumer + '\n' +
        'Телефон - ' + order.phone + '\n' +
        'Адрес доставки - ' + order.address + '\n\n'
      await bot.sendMessage(process.env.TG_CHAT_ID, messages)
    }

    res.status(200).json(order)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// /api/v1/orders/:id
router.patch('/:id', async (req, res) => {

  const _id = req.params.id
  const order = req.body

  try {
    const orderUpdated = await Orders.findOneAndUpdate(_id, order, { returnDocument: "after" })
    res.status(200).json(orderUpdated)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// /api/v1/orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const orderDeleted = await Orders.deleteOne({ _id: req.params.id })
    res.status(200).json(orderDeleted)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})


module.exports = router
