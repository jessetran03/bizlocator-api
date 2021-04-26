const express = require('express')
const RatingsService = require('./ratings-service')
const jsonParser = express.json()

const ratingsRouter = express.Router()

const serializeRating = rating => ({
  id: rating.id,
  business_id: rating.business_id,
  rating: rating.rating
})

const serializeRatingByBusiness = business => ({
  id: business.business_id,
  average_rating: business.average,
  rating_count: business.count,
})

ratingsRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const { business_id, rating } = req.body
    const newRating = { business_id, rating }

    for (const [key, value] of Object.entries(newRating))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    RatingsService.insertRating(
      req.app.get('db'),
      newRating
    )
      .then(rating => {
        res
          .status(201)
          .json(serializeRating(rating))
      })
      .catch(next)
  })

ratingsRouter
  .route('/:business_id')
  .get((req, res, next) => {
    const db = req.app.get('db')

    RatingsService.getByBusiness(db, req.params.business_id)
      .then(rating => {
        res.json(rating)
      })
      .catch(next)
  })

module.exports = ratingsRouter