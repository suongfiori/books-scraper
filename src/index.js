const express = require('express')
const app = express()
const { getGenreParam, genres } = require('./paramGenerator')
const { scrapeBooks } = require('./scraper')
const { writeCsv } = require('./csvWriter')

// PORT = 0
const PORT = process.env.PORT || 8000

getGenreParam()

app.get('/', (req, res) => {
    res.json('Welcome to Books Scraper API')
})  

app.get("/books", async (req, res) => {
    res.json(genres)
})

app.get("/books/:genre", async (req, res) => {
    try {
        const genre = req.params.genre

        const specificParams = await getGenreParam()
        const specificParam = specificParams[genre]

        if (!specificParam) {
            return res.status(400).json({ error: 'Invalid genre parameter.' })
        }

        const scrapedData = await scrapeBooks(specificParam)
        await writeCsv(genre, scrapedData)

        const totalItems = scrapedData.length
        const itemsPerPage = 20
        const totalPages = Math.ceil(totalItems / itemsPerPage)

        res.status(200).json({
            status: "success",
            data: scrapedData,
            metadata: {
                genre: genre,
                total_items: totalItems,
                total_pages: totalPages
            }
        })
          
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred.' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

module.exports =  app 