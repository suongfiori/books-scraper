const request = require('supertest')
const app = require('../src/index')
const { getGenreParam } = require('../src/paramGenerator') 

describe('GET /books', () => {
  beforeAll(async () => {
    await getGenreParam()
  }) 

  it('responds with an array of genres', async () => {
    const response = await request(app).get('/books')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toMatchSnapshot()
  })
})

describe('GET /books/:genre', () => {
  it('responds with JSON containing scraped book data', async () => {
  
    const response = await request(app).get('/books/childrens').set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('status', 'success')
    expect(response.body).toHaveProperty('data')
    expect(response.body).toHaveProperty('metadata')
    expect(response.body.metadata).toHaveProperty('genre', 'childrens')
    expect(response.body.metadata).toHaveProperty('total_items')
  })

  it('responds with 400 for invalid genre parameter', async () => {
    const response = await request(app).get('/books/invalidGenre')

    expect(response.status).toBe(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('error', 'Invalid genre parameter.')
  })

})

