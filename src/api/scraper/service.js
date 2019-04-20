const axios = require("axios")

const { getInlineFonts, getStylesheetFonts, getStylesheetsUrls } = require('../../lib/filterFonts')

const getValidUrl = (url, domain) => {
  if (url.slice(0,4) === 'http') {
    return url
  } else if (url.slice(0,2) === '//') {
    return `http:${url}`
  } else if (url.slice(0,1) === '/') {
    return `${domain}${url}`
  } else {
    return `${domain}/${url}`
  }
}

const filterStylesheetFiles = (html, domain) =>
  Promise.all(getStylesheetsUrls(html).map(async url => {
    const response = await axios.get(getValidUrl(url, domain))
    const data = response.data

    return getStylesheetFonts(data)
  }))
    .then(result => result.flatMap(fonts => fonts))
    .catch(_ => [])

const getFonts = domains =>
  Promise.all(domains.map(async domain => {
    const response = await axios.get(domain)
    const data = response.data

    return {
      domain,
      fonts: [...new Set(getInlineFonts(data)), ...new Set(await filterStylesheetFiles(data, domain))]
    }
  }))

module.exports = {
  getFonts
}
