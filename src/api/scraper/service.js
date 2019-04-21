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
const getFonts = async (currentDomain, mainDomain, level = 0) => {
  try {
    if (processedDomains.includes(currentDomain) || level >= 2) { return [] }
    processedDomains.push(currentDomain)

    const response = await axios.get(currentDomain)
    const data = response.data

    const subdomains = [...new Set(getSubdomains(data, currentDomain, mainDomain || currentDomain))]

      return Promise.all(
        subdomains
          .flatMap(async domain => await getFonts(domain, mainDomain || currentDomain, level + 1))
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

const getDomainsFonts = domains =>
  Promise.all(
    domains.map(async domain => ({
      domain,
      result: await getFonts(domain)
    }))
  )
    .then(result => result)


module.exports = {
  getDomainsFonts
}
