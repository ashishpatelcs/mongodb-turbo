// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Profile = require('../models/Profile');

router.get('/profile', (req, res) => {
	let filters = req.query
	if (req.query.age != null) {
		filters = {
			age: { $gt: req.query.age }
		}
	}
	Profile.find(filters)
		.then(profiles => {
			res.json({
				confirmation: 'success',
				data: profiles
			})
		})
		.catch(err => {
			res.json({
				confirmation: 'error',
				data: 'some error occured!'
			})
		})
})



module.exports = router
