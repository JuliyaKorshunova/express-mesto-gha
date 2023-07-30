const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: [true, 'Поле должно быть заполнено'], // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: [2, 'Минимальная длина поля 2 символа'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Максимальная длина поля 30 символов'], // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля 2 символа'],
    maxlength: [30, 'Максимальная длина поля 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(v);
      },
      message: 'Не верный URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
