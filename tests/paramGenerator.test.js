
const { getGenreParam } = require('../src/paramGenerator')

describe('getGenreParam', () => {
    it ('should return a map of genre parameters', async ()=> {
        const genreParams = await getGenreParam()

        expect(typeof genreParams).toBe('object')
        expect(Object.keys(genreParams).length).toBeGreaterThan(0)
        expect(genreParams).toMatchSnapshot()
    })
})


