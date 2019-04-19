const axios = require("axios")

const { getInlineFonts, getStylesheetFonts, getStylesheetsUrls } = require('../../lib/filterFonts')

const filterStylesheetFiles = html =>
  Promise.all(getStylesheetsUrls(html).map(async url => {
    const response = await axios.get(url)
    const data = response.data

    return getStylesheetFonts(data)
  })).then(result => result.flatMap(fonts => fonts))

const getFonts = domains =>
  Promise.all(domains.map(async domain => {
    const response = await axios.get(domain)
    const data = response.data

    return {
      domain,
      fonts: [...new Set(getInlineFonts(data)), ...new Set(await filterStylesheetFiles(data))]
    }
  }))

module.exports = {
  getFonts
}
