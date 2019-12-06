const { Router } = require('express')
const { searchAds } = require('../../logic')

const router = Router()

router.get('/', (req, res) => {
    try {
        let { query: { q: query } } = req

        if (!query) query = " "
        
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


module.exports = router