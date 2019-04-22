const axios = require('axios')

const { getDomainsFonts } = require('../../../../src/api/scraper/service')

jest.mock("axios");

describe('when website has not style', () => {
  const html = '<html><head></head><body></body></html>'

  beforeEach(() => {
    axios.mockRestore()
    axios.get.mockImplementation(() => Promise.resolve({ data: html }))
  })

  it('returns the domain without fonts', async () => {
    const domains = ['http://domain.com']
    const expected = [{
      domain: 'http://domain.com',
      result: [{
        domain: 'http://domain.com',
        fonts: [],
        paths: [],
        state: 'Success'
      }]
    }]

    const result = await getDomainsFonts(domains)

    expect(result).toEqual(expected)
  })
})

describe('when website has style', () => {
  describe('when website has relative paths', () => {
    const html = '<html><head></head><body><div style="font-family:Arial">Test</div></body></html>'

    beforeEach(() => {
      axios.mockRestore()
      axios.get.mockImplementation(() => Promise.resolve({ data: html }))
    })

    it('returns the domain without fonts', async () => {
      const domains = ['http://domain.com']
      const expected = [{
        domain: 'http://domain.com',
        result: [{
          domain: 'http://domain.com',
          fonts: ['Arial'],
          paths: [],
          state: 'Success'
        }]
      }]

      const result = await getDomainsFonts(domains)

      expect(result).toEqual(expected)
    })
  })

  describe('when website has relative paths', () => {
    const html = '<html><head></head><body><div style="font-family:Arial"><a href="http://domain.com/relative">Test</a></div></body></html>'

  beforeEach(() => {
    axios.mockRestore()
    axios.get.mockImplementation(() => Promise.resolve({ data: html }))
  })

  it('returns the domain without fonts', async () => {
    const domains = ['http://domain.com']
    const expected = [{
      domain: 'http://domain.com',
      result: [{
        domain: 'http://domain.com',
        fonts: ['Arial'],
        paths: ['http://domain.com/relative'],
        state: 'Success'
      },
      {
        domain: 'http://domain.com/relative',
        fonts: ['Arial'],
        paths: [],
        state: 'Success'
      }]
    }]

    const result = await getDomainsFonts(domains, 2)

    expect(result).toEqual(expected)
  })
})
})
