const express = require('express')
const axios = require("axios")
const { API_KEY } = require('../config')

const yelpRouter = express.Router()

const serializeBusiness = business => ({
  id: business.id,
  name: business.name,
  image_url: business.image_url,
  url: business.url,
  review_count: business.review_count,
  categories: business.categories,
  rating: business.ratings,
  price: business.price,
  location: business.location,
  display_phone: business.display_phone,
  distance: business.distance,
})

const serializeBusinessDetails = business => ({
  id: business.id,
  name: business.name,
  image_url: business.image_url,
  url: business.url,
  review_count: business.review_count,
  categories: business.categories,
  ratings: business.ratings,
  price: business.price,
  location: business.location,
  display_phone: business.display_phone,
  distance: business.distance,
  hours: business.hours,
  photos: business.photos,
})

const YelpService = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})

yelpRouter
  .route('/search')
  .get((req, res, next) => {
    YelpService(`businesses/search${req._parsedUrl.search}`)
    .then(({ data }) => {
      res.json({
        businesses: data.businesses.map(serializeBusiness),
        total: data.total
      })
    })
    .catch(next)
  })

yelpRouter
  .route('/:id')
  .get((req, res, next) => {
    YelpService(`businesses/${req.params.id}`)
    .then(({ data }) => {
      console.log(data)
      res.json((serializeBusinessDetails(data)))
    })
    .catch(next)
  })

module.exports = yelpRouter