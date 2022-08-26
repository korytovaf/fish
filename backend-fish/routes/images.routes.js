const { Router } = require('express')
const Images = require("../models/Images");
const fs = require("fs");
const path = require("path");
const router = Router()



// /api/v1/images
router.get('/:id', async (req, res) => {
  try {
    const { name } = await Images.findOne({ _id: req.params.id })
    const filePath = path.resolve(path.join(__dirname, '../../') + '/images/' + name)

    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        res.status(404).json({ message: 'Файл не найден' })
      } else {
        fs.createReadStream(filePath).pipe(res)
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }
})


module.exports = router
