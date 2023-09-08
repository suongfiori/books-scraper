const express = require('express')
const app = express()
const { getGenreParam } = require('./paramGenerator')
const { scrapeBooks } = require('./scraper')
const { writeCsv } = require('./csvWriter')


const PORT = process.env.PORT || 5000

app.get("/books", async (req, res) => {
    try {
        const genre = req.query.genre

        const params = await getGenreParam()
        const param = params[genre]

        if (!param) {
            return res.status(400).json({ error: 'Invalid genre parameter.' })
        }

        const scrapedData = await scrapeBooks(param)
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