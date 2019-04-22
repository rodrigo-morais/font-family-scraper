const axios = require("axios")
const uuidv4 = require('uuid/v4')

const { getInlineFonts, getStylesheetFonts, getStylesheetsUrls, getPaths } = require('../../lib/filterFonts')

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

const controllers = []

const getControllers = uuid =>
  controllers.find(controller => controller.uuid === uuid) || ({ processedDomains: [], numberOfPages: 0 })

const setControllers = (uuid, domain) => {
  const controller = getControllers(uuid)
  controller.processedDomains.push(domain)
  controller.numberOfPages = controller.numberOfPages + 1

  if(!controller.uuid) {
    controller.uuid = uuid
    controllers.push(controller)
  }
}


const getFonts = async (uuid, currentDomain, deep, quantityOfPages, level = 0, mainDomain) => {
  try {
    const { processedDomains, numberOfPages } = getControllers(uuid)
    if (processedDomains.includes(currentDomain) ||
      level > Math.min(deep, 2) ||
      numberOfPages >= Math.min(quantityOfPages, 100)) {
      return []
    }
    setControllers(uuid, currentDomain)


    const response = await axios.get(currentDomain)
    const data = response.data

    const paths = [...new Set(getPaths(data, currentDomain, mainDomain || currentDomain))]

      return Promise.all(
        paths
          .flatMap(async domain => await getFonts(uuid, domain, deep, quantityOfPages, level + 1, mainDomain || currentDomain))
      )
        .then(async result =>
          [
            {
              domain: currentDomain,
              paths,
              fonts: [...new Set(getInlineFonts(data)), ...new Set(await filterStylesheetFiles(data, currentDomain))],
              state: 'Success'
            }, ...result.flatMap(domain => domain)
          ]
        )
  } catch(error) {
    return [{ domain: currentDomain, state: 'Error' }]
  }
}

const getDomainsFonts = (domains, deep = 0, quantityOfPages = 100) =>
  Promise.all(
    domains.map(async domain => {
      const uuid = uuidv4()
      return {
        uuid,
        domain,
        result: await getFonts(uuid, domain, deep, quantityOfPages)
      }
    })
  )
    .then(result => {
      const uuids = result.map(r => r.uuid)
      controllers.splice(controllers.findIndex(controller => uuids.includes(controller.uuid)), 1)

      return result.map(r => ({ domain: r.domain, result: r.result }))
    })


module.exports = {
  getDomainsFonts
}
