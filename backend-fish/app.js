require('dotenv').config()
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')


const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

mongoose.connect(process.env.MONGO_DB, function (err) {
  if (err) throw err; // ошибка подключения
  console.log('Подключился к MongoDB');
});


const app = express()
app.use(express.json())
app.use(fileUpload({}))
app.use(cors(corsOptions))
app.use('/api/v1/products', require('./routes/products.routes'))
app.use('/api/v1/orders', require('./routes/order.routes'))
app.use('/api/v1/upload', require('./routes/upload.routes'))
app.use('/api/v1/images', require('./routes/images.routes'))
app.use('/api/v1/auth', require('./routes/auth.routes'))


if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, 'frontend-fish', 'build')))

  app.get('*', (request, response) => {
    console.log(request)
    response.sendFile(path.resolve(__dirname, 'frontend-fish', 'build', 'index.html'))
  })
}


const PORT = config.get('port') || 8000


async function start() {
  try {
    app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}...`))
  } catch (e) {
    console.log('Server Error =>', e.message);
    process.exit(1)
  }
}

start();
