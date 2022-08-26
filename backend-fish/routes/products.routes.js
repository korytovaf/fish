const { Router } = require('express');
const Products = require('../models/Products');
const Images = require('../models/Images')
const path = require("path");
const router = Router();
const isAdmin = require('../middleware/isAdmin.middleware')


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
    const pathLocal = path.resolve(path.join(__dirname, '../../'))
    let fs = require('fs');

    //копируем изображение в папку images
    fs.copyFile(pathLocal + '/upload/' + req.body.images, pathLocal + '/images/' + req.body.images, err => {
      if(err) throw err; // не удалось скопировать файл
      console.log('Файл успешно скопирован');

      // удаляем все файлы из временной директории
      fs.readdir(pathLocal + '/upload', (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(pathLocal + '/upload', file), err => {
            if (err) throw err;
          });
        }
      });
    });

    // сохраняем название файла изображения в базе данных
    const newImages = new Images({ name: req.body.images })
    await newImages.save()

    // сохраняем в базе новый продукт
    req.body.images = newImages._id
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
    const productUpdated = await Products.findOneAndUpdate(_id, product, { returnDocument: "after" })
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
