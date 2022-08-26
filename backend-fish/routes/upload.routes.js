const { Router } = require('express')
const router = Router()
const path = require('path')
const fs = require('fs')
const isAdmin = require('../middleware/isAdmin.middleware')




// /api/v1/upload
router.post('/', isAdmin, async (req, res) => {

  if (!req.files) {
    return res.status(404).json({messages: 'Файл отсутствует'})
  }

  const file = req.files.img
  if (!file) return res.json({error: 'Не корректное имя ввода'})
  const newFileName = encodeURI(Date.now() + '-' + file.name)

  const pathLocal = path.resolve(path.join(__dirname, '../../'))

  file.mv(`${pathLocal}/upload/${newFileName}`, err => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    console.log('Файл загрузился')
    res.json({
      fileName: newFileName,
    })
  })
})


// /api/v1/upload
router.get('/:fileName', async (req, res) => {
  try {
    const filePath = path.resolve(path.join(__dirname, '../') + '/images/' + req.params.fileName)

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
