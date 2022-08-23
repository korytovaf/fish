const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      res.status(401).json({ message: 'Нет token'})
    }

    const { isAdmin } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (isAdmin) {
      next()
    } else {
      res.status(401).json({ message: 'Доступ запрещен'})
    }


  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Нет авторизации'})
  }
}
