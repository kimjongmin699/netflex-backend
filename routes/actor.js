const express = require('express')
const Actor = require('../model/actor')
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  getLatestActor,
  getSingleActor,
  getActor,
} = require('../controllers/actor')
const { uploadImage } = require('../middlewares/multer')
const { actorInfoValidator, validate } = require('../middlewares/validator')
const { isAuth, isAdmin } = require('../middlewares/auth')

const router = express.Router()

router.post(
  '/create',
  isAuth,
  uploadImage.single('avatar'),
  actorInfoValidator,
  validate,
  createActor
)

router.post(
  '/update/:actorId',
  isAuth,
  uploadImage.single('avatar'),
  actorInfoValidator,
  validate,
  updateActor
)

router.delete('/:actorId', isAuth, isAdmin, removeActor)
router.get('/search', searchActor)
router.get('/latest-uploads', isAuth, isAdmin, getLatestActor)
router.get('/actors', isAuth, isAdmin, getActor)
router.get('/single/:id', getSingleActor)

module.exports = router
