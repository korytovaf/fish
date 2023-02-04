const fs = require("fs");
const path = require("path");


module.exports = (images) => {
  const pathLocal = path.resolve(path.join(__dirname, '../../'))

  fs.copyFile(pathLocal + '/upload/' + images, pathLocal + '/images/' + images, err => {
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
}
