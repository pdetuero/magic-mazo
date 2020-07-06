const express = require('express')
const router = express.Router()

const Set = require('../models/sets.model')
const Card = require('../models/card.model')
const { findByIdAndUpdate } = require('../models/sets.model')

router.post('/add/:id', (req, res) => {
    let cardsSelected = []

    if(typeof(req.body.cardname) === 'string') {
        cardsSelected.push(req.body.cardname)
    } else {
        cardsSelected = req.body.cardname
    }

    cardsSelected.forEach(card => 
        Set
            .findByIdAndUpdate(req.params.id, {$push: {cards: card}}, {new: true})
            .catch(err => console.log(err))
        )
    res.redirect(`/profile/setedit/${req.params.id}`)
})

router.post('/deletecard/:id', (req, res) => {
    let cardsSelected = []

    if(typeof(req.body.cardname) === 'string') {
        cardsSelected.push(req.body.cardname)
    } else {
        cardsSelected = req.body.cardname
    }

    cardsSelected.forEach(card => {
        Set
            .findByIdAndUpdate(req.params.id, {$pullAll: {cards: [card]}}, {new: true})
            .catch(err => console.log(err))
    })
    res.redirect(`/profile/setedit/${req.params.id}`)
})

module.exports = router