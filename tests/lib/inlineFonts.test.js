const parse5 = require('parse5')
const getInlineFonts = require('../../src/lib/inlineFonts')

const parseHtml = html => {
  const document = parse5.parse(html)
  return document.childNodes.find(node => node.nodeName === 'html')
}

describe('when node does not have style', () => {
  const node = { nodeName: 'div' }

  it('returns empty fonts array', () => {
    expect(getInlineFonts(node)).toEqual([])
  })
})

describe('when node has inline style', () => {
  describe('when has one style with one font', () => {
    const html = '<div style="font-family:Arial;"></div>'

    it('returns an array with one font', () => {
      const node = parseHtml(html)
      const expected = ['Arial']

      expect(getInlineFonts(node)).toEqual(expected)
    })
  })

  describe('when has one style with more than one font', () => {
    const html = '<div style="font-family:Arial, Verdana">'

    it('returns an array with two font', () => {
      const node = parseHtml(html)
      const expected = ['Arial', 'Verdana']

      expect(getInlineFonts(node)).toEqual(expected)
    })
  })

  describe('when multiple elements with fonts', () => {
    const html = `<div style="font-family:Arial, Verdana">
      <div style="font-family: Helvetica">Test</div>
    </div>`

    it('returns an array with all existent fonts', () => {
      const node = parseHtml(html)
      const expected = ['Arial', 'Verdana', 'Helvetica']

      expect(getInlineFonts(node)).toEqual(expected)
    })
  })

  describe('when multiple elements with duplicated fonts', () => {
    const html = `<div style="font-family: Arial">
      <div style="font-family:Arial, Verdana">
        <div style="font-family: Helvetica">Test</div>
      </div>
    </div>`

    it('returns an array with duplicated font', () => {
      const node = parseHtml(html)
      const expected = ['Arial', 'Arial', 'Verdana', 'Helvetica']

      expect(getInlineFonts(node)).toEqual(expected)
    })
  })
})

describe('when html has a style element', () => {
  describe('when has font', () => {
    const html = '<style>.test{font-family: Arial;}</style>'

    it('returns an array with one font', () => {
      const node = parseHtml(html)
      const expected = ['Arial']

      expect(getInlineFonts(node)).toEqual(expected)
    })
  })

  describe('when has not ia font', () => {
    const html = '<style>.test{font-size: 10px;}</style>'

    it('returns an array with one font', () => {
      const node = parseHtml(html)
      const expected = []

      expect(getInlineFonts(node)).toEqual(expected)
    })
  })
})

describe('when html has a font element', () => {
  const html = '<font face="Arial">Test</font>'

  it('returns an array with one font', () => {
    const node = parseHtml(html)
    const expected = ['Arial']

    expect(getInlineFonts(node)).toEqual(expected)
  })
})

describe('when node has inline style, style element and font element', () => {
  const html = `<style>.test{font-family: Robot;}</style>
  <div style="font-family:Arial, Verdana">
    <div style="font-family: Helvetica">
      <font face="TimesNewRoman">Test</font>
    </div>
  </div>`

  it('returns an array with all existent fonts', () => {
    const node = parseHtml(html)
    const expected = ['Robot', 'Arial', 'Verdana', 'Helvetica', 'TimesNewRoman']

    expect(getInlineFonts(node)).toEqual(expected)
  })
})
