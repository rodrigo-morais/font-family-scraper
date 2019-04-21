const axios = require("axios")

const { getInlineFonts, getStylesheetFonts, getStylesheetsUrls, getSubdomains } = require('../../lib/filterFonts')

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

const processedDomains = []
let numberOfPages = 0
const getFonts = async (currentDomain, deep, quantityOfPages, level = 0, mainDomain) => {
  try {
    if (processedDomains.includes(currentDomain) ||
      level > Math.min(deep, 2) ||
      numberOfPages >= Math.min(quantityOfPages, 100)) {
      return []
    }
    processedDomains.push(currentDomain)
    numberOfPages = numberOfPages + 1


    const response = await axios.get(currentDomain)
    const data = response.data

    const subdomains = [...new Set(getSubdomains(data, currentDomain, mainDomain || currentDomain))]

      return Promise.all(
        subdomains
          .flatMap(async domain => await getFonts(domain, deep, quantityOfPages, level + 1, mainDomain || currentDomain))
      )
        .then(async result =>
          [
            {
              domain: currentDomain,
              subdomains,
              fonts: [...new Set(getInlineFonts(data)), ...new Set(await filterStylesheetFiles(data, currentDomain))],
              state: 'Success'
            }, ...result.flatMap(domain => domain)
          ]
        )
  } catch(error) {
    processedDomains.push(currentDomain)
    return [{ domain: currentDomain, state: 'Error' }]
  }
}

const getDomainsFonts = (domains, deep = 0, quantityOfPages = 100) =>
  Promise.all(
    domains.map(async domain => ({
      domain,
      result: await getFonts(domain, deep, quantityOfPages)
    }))
  )
    .then(result => {
      processedDomains.length = 0
      numberOfPages = 0

      return result
    })


module.exports = {
  getDomainsFonts
}
