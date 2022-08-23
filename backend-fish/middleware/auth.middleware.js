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

    req.user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Нет авторизации'})
  }
}
