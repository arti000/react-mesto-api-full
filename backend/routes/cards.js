const cardsRoutes = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCardId,
  validateCard,
} = require('../middlewares/validation');

cardsRoutes.get('/cards', getCards);

cardsRoutes.delete('/cards/:cardId', validateCardId, deleteCard);

cardsRoutes.post('/cards', validateCard, createCard);

cardsRoutes.put('/cards/:cardId/likes', validateCardId, likeCard);

cardsRoutes.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRoutes;
