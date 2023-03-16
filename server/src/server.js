const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const config = require('./config')
const mcache = require('memory-cache')
const cors = require('cors')
const app = express()
const CACHE_DURATION = 120; // in seconds

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());
app.use(cors());

app.get('/api/characters', async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query
        const offset = (page - 1) * limit;
        const reqKey = `marvel_characters_offset_${offset}_limit_${limit}`;
        let marvelCharactersData = mcache.get(reqKey);

        // Used Marvel api
        const ts = new Date().getTime().toString()
        const hash = md5(ts + config.marvel.privateKey + config.marvel.publicKey)
        const url = `${config.marvel.baseUrl}/characters?ts=${ts}&apikey=${config.marvel.publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`
        const response = await axios.get(url)

        // Fetch data if not in cache
        if(!marvelCharactersData){
            marvelCharactersData = response.data.data;
            mcache.put(reqKey, marvelCharactersData, CACHE_DURATION * 1000);
        }

        const { total, count, results } = marvelCharactersData;
        const totalPages = Math.ceil(count / limit)
        const nextPage = page < totalPages ? +page + 1 : null
        const prevPage = page > 1 ? +page - 1 : null
        const pagination = { totalPages, nextPage, prevPage }
        //console.log('response result: ', marvelCharactersData)
        res.json({ total, count, pagination , results})
    } catch (error) {
        //console.error(error)
        await res.json(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
