const { Router } = require('express')
const { createGame, listGames, listMyGames, retrieveGame, modifyGame, removeGame, saveImageGame, loadImageGame } = require('../../logic')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError } } = require('gamerex-util')
const Busboy = require('busboy')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { title, platform, sell, exchange, favourite } } = req

        createGame(id, title, platform, sell, exchange, favourite)
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

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        listMyGames(id)
            .then(games => res.json(games))
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

router.get(`/getgames`, tokenVerifier, (req, res) => {
    try {
        listGames()
            .then(games => res.json(games))
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

router.get('/:gameId', tokenVerifier, jsonBodyParser, (req, res) => {
    
    try {
        const { params: { gameId } } = req

        retrieveGame(gameId)
            .then(games => res.json(games))
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

router.patch('/:gameId', tokenVerifier, jsonBodyParser, (req, res) => {

    try {
        const { id, params: { gameId }, body: { title, platform, sell, exchange, favourite } } = req

        modifyGame(id, gameId, title, platform, sell, exchange, favourite)
        
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

router.delete('/:gameId', tokenVerifier, (req, res) => {
    try {
        const { id, params: { gameId } } = req

        removeGame(id, gameId)
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

router.post('/upload/:gameId', tokenVerifier, (req, res) => {
    const { id, params: { gameId } } = req
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        filename = 'gameimage'
        await saveImageGame(id, gameId, file, filename)
    })
    busboy.on('finish', () => {
        res.end()
    })
    return req.pipe(busboy)
})

router.get('/load/:gameId', async (req, res) => {

    const { params: { gameId } } = req

    const stream = await loadImageGame(gameId) 

    res.setHeader('Content-Type', 'image/jpeg')

    return stream.pipe(res)
})

module.exports = router