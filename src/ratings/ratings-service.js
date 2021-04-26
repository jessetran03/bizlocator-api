const RatingsService = {
  getByBusiness(knex, business_id) {
    return knex
      .select('business_id')
      .count('rating as count')
      .avg('rating as average')
      .from('ratings')
      .where('business_id', business_id)
      .groupBy('business_id')
  },
  insertRating(knex, newRating) {
    return knex
      .insert(newRating)
      .into('ratings')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}

module.exports = RatingsService