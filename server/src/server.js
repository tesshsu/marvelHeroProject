const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const config = require('./config')

const app = express()

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());

app.get('/api/characters', async (req, res) => {
    const { page = 1, limit = 5 } = req.query
    const ts = new Date().getTime().toString()
    const hash = md5(ts + config.marvel.privateKey + config.marvel.publicKey)
    const url = `${config.marvel.baseUrl}/characters?ts=${ts}&apikey=${config.marvel.publicKey}&hash=${hash}`

    try {
        const response = await axios.get(url)
        const count = response.data.data.count;
        const results = response.data.data.results;
        const totalPages = Math.ceil(count / limit)
        const nextPage = page < totalPages ? +page + 1 : null
        const prevPage = page > 1 ? +page - 1 : null
        const pagination = { totalPages, nextPage, prevPage }
        res.json({ count ,pagination, results })
    } catch (error) {
        console.error(error)
        await res.json(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
