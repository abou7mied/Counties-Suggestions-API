import request from 'supertest'
import appFactory from '../../src/app/App'
import container from '../../container'

const app = appFactory(container)
  .listen(0)

describe('App API', () => {
  describe('Find counties by name/state', () => {
    it('should return empty array', async () => {
      expect.assertions(1)
      return await request(app)
        .get('/suggest')
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toEqual([])
        })
    })
    it('should return only 5 items', async () => {
      expect.assertions(1)
      return await request(app)
        .get('/suggest?q=A')
        .expect(200)
        .then(({ body }) => {
          expect(body.length)
            .toEqual(5)
        })
    })
    it('should return correct results for "cowl"', async () => {
      expect.assertions(1)
      return await request(app)
        .get('/suggest?q=cowl')
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toEqual([
              {
                fips: '20035',
                state: 'KS',
                name: 'Cowley'
              },
              {
                fips: '53015',
                state: 'WA',
                name: 'Cowlitz'
              }
            ])
        })
    })
    it('should return correct results for "cowlitz, wa"', async () => {
      expect.assertions(1)
      return await request(app)
        .get('/suggest?q=cowlitz, wa')
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toEqual([
              {
                fips: '53015',
                state: 'WA',
                name: 'Cowlitz'
              }
            ])
        })
    })
  })
})
