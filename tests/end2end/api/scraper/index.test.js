const request = require('supertest')

const app = require('../../../../src/api/app')

describe('parseFonts', () => {
  it('returns empty when domains are informed', (done) => {
    request(app)
      .post('/parseFonts')
      .send({domains: []})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([]) 
        done()
      })
  })

  it('returns the domain and fonts from the domains are informed', (done) => {
    request(app)
      .post('/parseFonts')
      .send({domains: ['https://webflow.com/']})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body[0].domain).toEqual('https://webflow.com/') 
        expect(res.body[0].result[0].state).toEqual('Success')
        expect(res.body[0].result).toBeInstanceOf(Array)
        done()
      })
  })

  it('returns an error if domain is invalid', (done) => {
    request(app)
      .post('/parseFonts')
      .send({domains: ['invalid']})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body[0].domain).toEqual('invalid')
        expect(res.body[0].result[0].state).toEqual('Error')
        done()
      })
  })
})
