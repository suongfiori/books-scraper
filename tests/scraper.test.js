const { scrapeBooks } = require('../src/scraper')

describe('scrapeBooks', () => {
   it('should scrape books data', async () => {
    const genreParam = 'childrens_11'

    const scrapedData = await scrapeBooks(genreParam)

    expect(Array.isArray(scrapedData)).toBe(true)
    expect(scrapedData.length).toBeGreaterThan(0)

    const sampleBook = scrapedData[0]
    expect(sampleBook).toHaveProperty('title')
    expect(sampleBook).toHaveProperty('price')
    expect(sampleBook).toHaveProperty('stock');
    expect(sampleBook).toHaveProperty('imageUrl')
   })
})