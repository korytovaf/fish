const { Router } = require('express');
const Products = require('../models/Products');
const Images = require('../models/Images')
const router = Router();
const isAdmin = require('../middleware/isAdmin.middleware')
const copyFile = require('../utils/copyFile')

// Получить все продукты - /api/v1/products
router.get('/', async (req, res) => {
  try {
    const prod = await Products.find()
    res.status(200).json(prod)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// Получить продукт по его id - /api/v1/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.id })
    res.status(200).json(product)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// Создать новый продукт - /api/v1/products
router.post('/', isAdmin, async (req, res) => {
  try {
    //копируем изображение в папку images
    if (req.body.images) {
      copyFile(req.body.images)
      // сохраняем название файла изображения в базе данных
      const newImages = new Images({ name: req.body.images })
      await newImages.save()
      req.body.images = newImages._id
    }

    if (!req.body.name) {
      res.status(401).json({ message: 'Не задано название продукта' });
      return;
    }

    if (!req.body.description) {
      res.status(401).json({ message: 'Не задано описание продукта' });
      return;
    }

    if (!req.body.price) {
      res.status(401).json({ message: 'Не задана цена продукта' });
      return;
    }

    // сохраняем в базе новый продукт
    const newProduct = new Products(req.body)
    const product = await newProduct.save()

    res.status(200).json(product)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})


// Изменить продукт - /api/v1/products/:id
router.patch('/:id', async (req, res) => {
  const _id = req.params.id
  const product = req.body

  try {
    // проверяем если обновляем image
    const old = await Products.findOne({ _id })

    if (req.body.images && old.images?.toString() !== product.images) {
      //копируем изображение в папку images
      copyFile(req.body.images)

      // сохраняем название файла изображения в базе данных
      const newImages = new Images({ name: req.body.images })
      await newImages.save()
      req.body.images = newImages._id

      // удаляем старое изображение из базы данных
      // await Images.deleteOne({ name: old.images.toString() })
    }

    const productUpdated = await Products.findOneAndUpdate({ _id }, product, { returnDocument: "after" })
    res.status(200).json(productUpdated)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})



// Удалить продукт - /api/v1/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const productDeleted = await Products.deleteOne({ _id: req.params.id })
    res.status(200).json(productDeleted)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})


module.exports = router
