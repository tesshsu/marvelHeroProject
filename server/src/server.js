const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const config = require('./config')
const mcache = require('memory-cache')

const app = express()

const CACHE_DURATION = 120; // in seconds


app.get('/api/characters', async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query
        const offset = (page - 1) * limit;
        const reqKey = `marvel_characters_offset_${offset}_limit_${limit}`;
        let marvelCharactersData = mcache.get(reqKey);

        // Fetch data if not in cache
        if(!marvelCharactersData){
            const ts = new Date().getTime().toString()
            const hash = md5(ts + config.marvel.privateKey + config.marvel.publicKey)
            const url = `${config.marvel.baseUrl}/characters?ts=${ts}&apikey=${config.marvel.publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`
            const response = await axios.get(url)
            marvelCharactersData = response.data.data;
            mcache.put(reqKey, marvelCharactersData, CACHE_DURATION * 1000);
        }

        const { total, count, results } = marvelCharactersData;
        const totalPages = Math.ceil(total / limit)
        const nextPage = page < totalPages ? +page + 1 : null
        const prevPage = page > 1 ? +page - 1 : null
        const pagination = { totalPages, nextPage, prevPage }
        //console.log('response result: ', marvelCharactersData)
        res.json({ total, count, pagination , results})
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
