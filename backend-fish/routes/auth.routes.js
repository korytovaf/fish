const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');
const isAuth = require("../middleware/auth.middleware");
const router = Router();

const createToken = (id, isAdmin) => {
  return jwt.sign(
    { userId: id, isAdmin },
    process.env.JWT_TOKEN_SECRET,
  )
};

// Создание пользователя - /api/v1/auth/signup
router.post(
  '/signup',
  [
    check('name', 'Поле имя не может быть пустым').exists(),
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }
      const { name, email, password } = request.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return response.status(400).json({ message: 'Email уже зарегистрирован'})
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, email, password: hashPassword, isAdmin: false });
      await user.save();

      const token = createToken(user.id, false);
      response.status(201).json({ token, user })

    } catch (e) {
      console.log(e)
      response.status(500).json({ message: 'Ошибка регистрации! Что-то пошло не так', error: e })
    }
  }
);



// Авторизация - /api/v1/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите email').exists(),
    check('password', 'Введите пароль').exists()
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе'
        })
      }

      const { email, password } = request.body
      const user = await User.findOne({ email })
      if (!user) {
        return response.status(400).json({ message: 'Не правильные имя пользователя или пароль'})
      }

      const isMath = await bcrypt.compare(password, user.password);
      if (!isMath) {
        return response.status(400).json({ message: 'Не правильные имя пользователя или пароль'})
      }

      const token = createToken(user.id, user.isAdmin);
      response.status(200).json({ token, name: user.name, email: user.email, isAdmin: user.isAdmin });

    } catch (e) {
      console.log(e)
      response.status(500).json({ message: 'Ошибка входа! Что-то пошло не так'})
    }
  })


// получить пользователя - /api/v1/auth/user
router.get('/user', isAuth, async (req, res) => {

  try {
    const token = req.headers.authorization.split(" ")[1]
    const { userId } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const user = await User.findOne({ _id: userId }, ['_id', 'name', 'isAdmin', 'email'])

    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так', error: e })
  }})


module.exports = router
