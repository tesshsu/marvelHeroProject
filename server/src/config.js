require('dotenv').config()

const config = {
    marvel: {
        publicKey: process.env.MARVEL_PUBLIC_KEY,
        privateKey: process.env.MARVEL_PRIVATE_KEY,
        baseUrl: process.env.MARVEL_BASE_URL
    }
}

module.exports = config
