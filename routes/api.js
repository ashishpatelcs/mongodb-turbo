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

router.get('/profile/update', (req, res) => {
	
})

router.get('/profile/:id', (req, res) => {
	const id = req.params.id

	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(error=> {
		res.json({
			confirmation: 'error',
			data: 'error: profile with ' + id + ' not found!'
		})
	})
})

router.post('/profile', (req, res) => {

	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'error',
			data: 'error'
		})
	})
})


module.exports = router
