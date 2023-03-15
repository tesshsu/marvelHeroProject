const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const config = require('./config')

const app = express()

app.get('/api/characters', async (req, res) => {
    const { page = 1, limit = 20 } = req.query
    const ts = new Date().getTime().toString()
    const hash = md5(ts + config.marvel.privateKey + config.marvel.publicKey)
    const url = `${config.marvel.baseUrl}/characters?ts=${ts}&apikey=${config.marvel.publicKey}&hash=${hash}`

    try {
        const response = await axios.get(url)
        const { total, count, results } = response.data.data
        const totalPages = Math.ceil(total / limit)
        const nextPage = page < totalPages ? +page + 1 : null
        const prevPage = page > 1 ? +page - 1 : null
        const pagination = { totalPages, nextPage, prevPage }
        console.log('response result: ', response.data.data)
        res.json({ total, count, results, pagination })
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
