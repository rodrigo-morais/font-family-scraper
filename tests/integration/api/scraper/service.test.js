const axios = require('axios')

const { getFonts } = require('../../../../src/api/scraper/service')

jest.mock("axios");

describe('when website has not style', () => {
  const html = '<html><head></head><body></body></html>'

  beforeEach(() => {
    axios.mockRestore()
    axios.get.mockImplementation(() => Promise.resolve({ data: html }))
  })

  it('returns the domain without fonts', async () => {
    const domains = ['http://domain.com']
    const expected = [{ domain: 'http://domain.com', fonts: [] }]

    const result = await getFonts(domains)

    expect(result).toEqual(expected)
  })
})

describe('when website has style', () => {
  const html = '<html><head></head><body><div style="font-family:Arial">Test</div></body></html>'

  beforeEach(() => {
    axios.mockRestore()
    axios.get.mockImplementation(() => Promise.resolve({ data: html }))
  })

  it('returns the domain without fonts', async () => {
    const domains = ['http://domain.com']
    const expected = [{ domain: 'http://domain.com', fonts: ['Arial'] }]

    const result = await getFonts(domains)

    expect(result).toEqual(expected)
  })
})
