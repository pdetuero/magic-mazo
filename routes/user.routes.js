const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Set = require('../models/sets.model')
const Card = require('../models/card.model')

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')

router.get('/', checkAuthenticated, (req, res) => {
    Promise
        .all([User.findById(req.user.id), Set.find({user: req.user.id}), Card.find({user: req.user.id})])
        .then(data => res.render('user/profile', {user: data[0], sets: data[1], cards: data[2]}))
})

router.get('/createdeck', checkAuthenticated, (req, res) => res.render('user/createdeck'))

router.post('/createdeck', checkAuthenticated, (req, res) => {
    const newDeck = {
        name: req.body.name,
        img: 'https://d1rw89lz12ur5s.cloudfront.net/photo/coretcg/file/7a0ec880ffcb11e38049251d499677e1/large/UP%20Deck%20Box%20Blue.png',
        user: req.user.id
    }

    Set
        .create(newDeck)
        .then(res.redirect('/profile'))
        .catch(err => console.log(err))
})

router.get('/setedit/:id', checkAuthenticated, (req, res) => {
    Promise
        .all([Set.findById(req.params.id), Card.find({user: req.user.id})])
        .then(data => res.render('user/setedit', {set: data[0], card: data[1]}))
})

module.exports = router