import request from 'supertest'
import appFactory from '../../src/app/App'
import container from '../../container'
import { IDatabase } from '../../src/interfaces/IDatabase'
import { TYPES } from '../../src/interfaces/types'

const database = container.get<IDatabase>(TYPES.Database)
const app = appFactory(container)
  .listen(0)

beforeAll(async () => {
  await database.connect()
})

afterAll(async () => {
  await database.close()
})

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
    it('should return correct results for "wa"', async () => {
      expect.assertions(1)
      return await request(app)
        .get('/suggest?q=wa')
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toEqual([
              {
                fips: '53001',
                state: 'WA',
                name: 'Adams'
              },
              {
                fips: '53003',
                state: 'WA',
                name: 'Asotin'
              },
              {
                fips: '53005',
                state: 'WA',
                name: 'Benton'
              },
              {
                fips: '53007',
                state: 'WA',
                name: 'Chelan'
              },
              {
                fips: '53009',
                state: 'WA',
                name: 'Clallam'
              }
            ])
        })
    })
  })
})
