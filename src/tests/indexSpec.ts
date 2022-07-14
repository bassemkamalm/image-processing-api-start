import supertest from 'supertest'

// import convertToNumber function from index page
import { convertToNumber, app } from '../index'

it('Test Converting Function - index page', () => {
  expect(convertToNumber('200')).toEqual(200)
})

const request = supertest(app)
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/resizeImage?name=fjord.jpg&width=200&height=200'
    )
    expect(response.status).toBe(200)
  })
})
