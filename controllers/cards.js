const Card = require('../models/card');
const StatusCodes = require('../utils/constants');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(StatusCodes.CAST_ERROR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(StatusCodes.NOT_FOUND_ERROR).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.CAST_ERROR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(StatusCodes.NOT_FOUND_ERROR).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.CAST_ERROR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(StatusCodes.NOT_FOUND_ERROR).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(StatusCodes.CAST_ERROR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(StatusCodes.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
