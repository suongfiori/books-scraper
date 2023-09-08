const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = "https://books.toscrape.com/catalogue/category/books_1/index.html"

async function getGenreParam() {
    
    const genreParams = {}

    try {
        const { data } = await axios.get(BASE_URL)
        const $ = cheerio.load(data)

        const genreItems = $('.side_categories > ul > li > ul > li > a')
            genreItems.each(function () {
            const genre = $(this).text().trim().toLowerCase()
            const param = $(this).attr('href')
            const match = param.match(/\/([^/]+)\/index\.html$/)
            if (match) {
                genreParams[genre] = match[1]
            }
        })

    } catch (error) {
        console.error(error)
    }
    return genreParams
}

module.exports = { getGenreParam }