const getFontNameFromStyleAttrs = (node) => 
  node.attrs && node.attrs.length > 0 ?
    node.attrs
      .filter(attr => attr.name === 'style')
      .flatMap(style => style.value.split(';'))
      .filter(style => style.includes('font-family'))
      .flatMap(font => font.split(':')[1].replace(/\s/g, '').replace(/['"]+/g,'').split(',')) : []

const getFontNameFromStyleElement = node =>
  node.childNodes[0].value.split(';')
    .filter(style => style.includes('font-family'))
    .flatMap(font => font.split(':')[1].replace(/\s/g, '').replace(/['"]+/g,'').split(','))


const getFontNameFromFontElement = (node) => 
  node.attrs && node.attrs.length > 0 ?
    [node.attrs
      .find(attr => attr.name === 'face').value.replace(/\s/g, '').replace(/['"]+/g,'')] : []

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

const getInlineFonts = node => {
  if (node.childNodes) {
    return [...getFontName(node), ...node.childNodes.flatMap(getInlineFonts)]
  } else {
    return getFontName(node)
  }
}

module.exports = getInlineFonts
