const { Router } = require('express')
const { createAd, removeAd, retrieveAds, retrieveAd, searchAds, modifyAd, saveImageAd, loadImageAd } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('skillpop-util')
const Busboy = require('busboy')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { title, description, price } } = req

        createAd(id, title, description, price)
            .then(id => res.status(201).json({ id }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.delete('/:adId' , tokenVerifier, (req, res) => {
    try {
        const { id, params: { adId } } = req

        removeAd(id, adId)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req
        retrieveAds(id)
            .then(ads => {
                res.json(ads)
            })
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/:adId', tokenVerifier, (req, res) => {
    try {
        const { id, params: { adId } } = req

        retrieveAd(id, adId)
            .then(ad => {
                res.json(ad)
            })
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/search/:query', (req, res) => {
    try {
        const {params: { query } } = req
        
        searchAds(query)
            .then(ads => {
                res.json(ads)
            })
            .catch(error => {
                const { message } = error

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.patch('/:adId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, params: { adId }, body: { title, description, price } } = req

        modifyAd(id, adId, title, description, price)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.post('/upload/:idAd', tokenVerifier, (req, res) => {
    
    const { id, params: { idAd } } = req
  
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        filename = 'adimage'

        await saveImageAd(id, idAd, file, filename)
        
    })

    busboy.on('finish', () => {
        res.end()
    })

    return req.pipe(busboy)

})

router.get('/load/:idAd', tokenVerifier,async (req, res) => {

    const { id, params: { idAd } } = req

    const stream = await loadImageAd(id, idAd) 

    res.setHeader('Content-Type', 'image/jpeg')

    return stream.pipe(res)
})

module.exports = router