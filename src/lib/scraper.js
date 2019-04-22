const css = require('css')
const parse5 = require('parse5')

const getFontNameFromStyleAttrs = (node) => 
  node.attrs && node.attrs.length > 0 ?
    node.attrs
      .filter(attr => attr.name === 'style')
      .flatMap(style => style.value.split(/[};]+/))
      .filter(style => style.includes('font-family'))
      .flatMap(font => font.split(':')[1].replace(/\s+|['"]+/g,'').split(',')) : []

const getFontNameFromStyleElement = node =>
  node.childNodes[0].value.split(/[};]+/)
    .filter(style => style.includes('font-family'))
    .flatMap(font => font.split(':')[1].replace(/\s+|['"]+/g,''))


const getFontNameFromFontElement = (node) => 
  node.attrs && node.attrs.length > 0 ?
    [node.attrs
      .find(attr => attr.name === 'face').value.replace(/\s+|['"]+/g,'')] : []

const getFontName = node => {
  switch (node.nodeName) {
    case 'style':
      return getFontNameFromStyleElement(node)
    case 'font':
      return getFontNameFromFontElement(node)
    default:
      return getFontNameFromStyleAttrs(node)
  }
}

const getFonts = node =>
  node.childNodes ?
    [...getFontName(node), ...node.childNodes.flatMap(getFonts)] :
    getFontName(node)

const getInlineFonts = html =>
  getFonts(parse5.parse(html).childNodes.find(node => node.nodeName === 'html'))

const getStylesheetFonts = style =>
  css.parse(style).stylesheet.rules
  .flatMap(rule => rule.declarations)
  .filter(declaration => !!declaration && declaration.property === 'font-family')
  .flatMap(font => font.value.replace(/\s+|['"]+/g,'').split(','))

const filterStylesheets = html =>
  parse5.parse(html).childNodes.find(node => node.nodeName === 'html').childNodes
    .filter(childNode => childNode.childNodes)
    .flatMap(childNode => childNode.childNodes)
    .filter(n => n.nodeName === 'link' &&
      n.attrs.some(attr => attr.name === 'rel' && attr.value === 'stylesheet') &&
      n.attrs.some(attr => attr.name === 'href')
    )

const getStylesheetsUrls = html =>
  filterStylesheets(html)
    .map(link => link.attrs.find(attr => attr.name === 'href').value)

const getPath = (node, currentDomain, mainDomain) => {
    const link = node.attrs
      .find(attr => attr.name ==='href' &&
        attr.value !== currentDomain &&
        attr.value !== mainDomain &&
        attr.value !== '/' &&
        (attr.value.slice(0, currentDomain.length) === currentDomain ||
        attr.value.slice(0, mainDomain.length) === mainDomain ||
        (attr.value.slice(0, 1) === '/' && attr.value.slice(1,1) !== '/'))
      )

    if (link) {
      return link.value.slice(0,1) === '/' ?
        [`${mainDomain.slice(-1) === '/' ? mainDomain.slice(0, mainDomain.length - 1) : mainDomain}${link.value}`] :
        [link.value]
    } else {
      return []
    }
}

const filterLinks = (currentDomain, mainDomain) => (node) => {
  if (node.nodeName === 'a') {
    return getPath(node, currentDomain, mainDomain)
  } else if (node.childNodes) {
    return node.childNodes.flatMap(filterLinks(currentDomain, mainDomain))
  } else {
    return []
  }
}

const getPaths = (html, currentDomain, mainDomain) =>
  filterLinks(currentDomain, mainDomain)(
    parse5.parse(html).childNodes
      .find(node => node.nodeName === 'html').childNodes
      .find(node => node.nodeName === 'body'))

module.exports = {
  getInlineFonts,
  getStylesheetFonts,
  getStylesheetsUrls,
  getPaths
}
