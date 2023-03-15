const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const config = require('./config')

const app = express()

app.get('/api/comics', async (req, res) => {
    const ts = new Date().getTime().toString()
    const hash = md5(ts + config.marvel.privateKey + config.marvel.publicKey)
    const url = `${config.marvel.baseUrl}/comics?ts=${ts}&apikey=${config.marvel.publicKey}&hash=${hash}`
    console.log('hash: ', hash)

    try {
        const response = await axios.get(url)
        console.log('response: ', response)
        res.json(response.data)
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
