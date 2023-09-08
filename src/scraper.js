const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = "https://books.toscrape.com/catalogue/category/books/"

async function scrapeBooks(param, page = 1) {

    const scrapedData = []

    try {
        const url = page === 1 ? `${BASE_URL}${param}/index.html` : `${BASE_URL}${param}/page-${page}.html`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const books = $('article')
        books.each(function () {
            title = $(this).find("h3 a").text()
            price = $(this).find(".price_color").text()
            stock = $(this).find(".availability").text().trim()
            imageUrl = $(this).find("img").attr("src").replace("../../../../", "https://books.toscrape.com/");

            scrapedData.push({ title, price, stock, imageUrl })

        })

        const nextLink = $("li.next a")
        if (nextLink.length > 0) {
            const nextPage = page + 1
            console.log("Next page URL:", url)
            const nextPageData = await scrapeBooks(param, nextPage) 
            scrapedData.push(...nextPageData) 
        }
    } catch (err) {
        console.error('Error in scrapeBooks:', err);
    }

    return scrapedData 
}

module.exports = { scrapeBooks }

