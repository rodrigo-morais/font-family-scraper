const { getInlineFonts, getStylesheetFonts, getStylesheetsUrls, getPaths } = require('../../../src/lib/scraper')

describe('when filter inline style', () => {
  describe('when html does not have style', () => {
    const html = '<div>Test</div>'

    it('returns empty fonts array', () => {
      expect(getInlineFonts(html)).toEqual([])
    })
  })

  describe('when html has inline style', () => {
    describe('when has one style with one font', () => {
      const html = '<div style="font-family:Arial;"></div>'

      it('returns an array with one font', () => {
        const expected = ['Arial']

        expect(getInlineFonts(html)).toEqual(expected)
      })
    })

    describe('when has one style with more than one font', () => {
      const html = '<div style="font-family:Arial, Verdana">'

      it('returns an array with two font', () => {
        const expected = ['Arial', 'Verdana']

        expect(getInlineFonts(html)).toEqual(expected)
      })
    })

    describe('when multiple elements with fonts', () => {
      const html = `<div style="font-family:Arial, Verdana">
        <div style="font-family: Helvetica">Test</div>
      </div>`

      it('returns an array with all existent fonts', () => {
        const expected = ['Arial', 'Verdana', 'Helvetica']

        expect(getInlineFonts(html)).toEqual(expected)
      })
    })

    describe('when multiple elements with duplicated fonts', () => {
      const html = `<div style="font-family: Arial">
        <div style="font-family:Arial, Verdana">
          <div style="font-family: Helvetica">Test</div>
        </div>
      </div>`

      it('returns an array with duplicated fonts', () => {
        const expected = ['Arial', 'Arial', 'Verdana', 'Helvetica']

        expect(getInlineFonts(html)).toEqual(expected)
      })
    })
  })

  describe('when html has a style element', () => {
    describe('when has font', () => {
      const html = '<style>.test{font-family: Arial;}</style>'

      it('returns an array with one font', () => {
        const expected = ['Arial']

        expect(getInlineFonts(html)).toEqual(expected)
      })
    })

    describe('when has not ia font', () => {
      const html = '<style>.test{font-size: 10px;}</style>'

      it('returns an array without fonts', () => {
        const expected = []

        expect(getInlineFonts(html)).toEqual(expected)
      })
    })
  })

  describe('when html has a font element', () => {
    const html = '<font face="Arial">Test</font>'

    it('returns an array with one font', () => {
      const expected = ['Arial']

      expect(getInlineFonts(html)).toEqual(expected)
    })
  })

  describe('when html has inline style, style element and font element', () => {
    const html = `<style>.test{font-family: Robot;}</style>
    <div style="font-family:Arial, Verdana">
      <div style="font-family: Helvetica">
        <font face="TimesNewRoman">Test</font>
      </div>
    </div>`

    it('returns an array with all existent fonts', () => {
      const expected = ['Robot', 'Arial', 'Verdana', 'Helvetica', 'TimesNewRoman']

      expect(getInlineFonts(html)).toEqual(expected)
    })
  })
})

describe('when filter stylesheet', () => {
  describe('when style does not have font', () => {
    const style = `body {
      color: #000;
      font-size: 16px;
      line-height: 160%;
      font-weight: 400;
    }`

    it('returns empty fonts array', () => {
      expect(getStylesheetFonts(style)).toEqual([])
    })
  })

  describe('when style has font', () => {
    const style = `body {
      font-family: Graphik, sans-serif;
      color: #000;
      font-size: 16px;
      line-height: 160%;
      font-weight: 400;
    }`

    it('returns an array with all fonts', () => {
      const expected = ['Graphik', 'sans-serif']

      expect(getStylesheetFonts(style)).toEqual(expected)
    })
  })
})

describe('when get stylesheet urls', () => {
  describe('when html does not have stylesheet', () => {
    const html = '<html><head></head><body></body></html>'

    it('returns empty array of stylesheets url', () => {
      expect(getStylesheetsUrls(html)).toEqual([])
    })
  })

  describe('when html has stylesheets', () => {
    describe('when head has stylesheet', () => {
      const html = `<html>
        <head>
          <link href="http://domain/head.css" rel="stylesheet" type="text/css">
        </head>
        <body></body>
      </html>`

      it('returns an array with one stylesheets url', () => {
        const expected = ['http://domain/head.css']

        expect(getStylesheetsUrls(html)).toEqual(expected)
      })
    })

    describe('when head and body have stylesheet', () => {
      const html = `<html>
        <head>
          <link href="http://domain/head.css" rel="stylesheet" type="text/css">
        </head>
        <body>
          <link href="http://domain/body.css" rel="stylesheet" type="text/css">
        </body>
      </html>`

      it('returns an array with two stylesheets url', () => {
        const expected = ['http://domain/head.css', 'http://domain/body.css']

        expect(getStylesheetsUrls(html)).toEqual(expected)
      })
    })
  })
})

describe('when get paths', () => {
  describe('when does not exist paths', () => {
    const html = '<html><head></head><body></body></html>'

    it('returns empty array of paths', () => {
      expect(getPaths(html, '', '')).toEqual([])
    })
  })

  describe('when has path', () => {
    const html = `<html>
      <head>
        <link href="http://domain/head.css" rel="stylesheet" type="text/css">
      </head>
      <body><a href='/relative'>test</a></body>
    </html>`

    it('returns an array with paths', () => {
      const expected = ['http://domain/relative']

      expect(getPaths(html, 'http://domain/', 'http://domain/')).toEqual(expected)
    })
  })
})
