# Font Family Scraper

This an API to scrape websites and collect the `fonts` that are being used on these websites.

The scraper will get `fonts` from inline style and stylesheets links.

The API can scrape in the maximum 100 websites. If the website has errors in the style it won't be scraped.

## Install dependencies

Run on console the command:

```
npm install
```

## Test

Run on console the command:

```
npm test
```

## Execute

To start the application run on console the command:

```
npm start
```

## How to use the API

The API will be available in `http://localhost:3000/parseFonts` as `POST`.

The endpoint accepts as data the domains in the request body:
 - `domains` has to be an array of strings
 - `domains` has to have a list of valid websites

```
{
  "domains": ["http://www.dolekemp96.org/main.htm", "http://www.fogcam.org/", "https://webflow.com/"]
}
```

The endpoint result will be an array with the domains and fonts that are being used.

```
[
    {
        "domain": "http://www.dolekemp96.org/main.htm",
        "fonts": [
            "TimesNewRoman"
        ]
    },
    {
        "domain": "http://www.fogcam.org/",
        "fonts": [
            "Arial,Helvetica,sans-serif",
            "TrebuchetMS,Trebuchet,sans-serif",
            "Verdana,Arial,Helvetica,sans-serif"
        ]
    },
    {
        "domain": "https://webflow.com/",
        "fonts": [
            "sans-serif",
            "monospace",
            "webflow-icons",
            "webflow-icons!important",
            "Arial",
            "inherit",
            "serif",
            "HelveticaNeue",
            "Helvetica",
            "Ubuntu",
            "SegoeUI",
            "Verdana",
            "Graphik",
            "RobotoMono",
            "Circular",
            "AvenirNext",
            "Graphikmediumweb",
            "Akkurat",
            "Syncopate"
        ]
    }
]
```

### Example

Request:

```
curl -X POST -H "Content-Type: application/json" -d '{"domains": ["http://www.dolekemp96.org/main.htm", "http://www.fogcam.org/", "https://webflow.com/", "https://github.com/"]}' http://localhost:3000/parseFonts
```

Response:

```
HTTP/1.1 200 OK

[
   {
      "domain" : "http://www.dolekemp96.org/main.htm",
      "fonts" : [
         "TimesNewRoman"
      ]
   },
   {
      "fonts" : [
         "Arial,Helvetica,sans-serif",
         "TrebuchetMS,Trebuchet,sans-serif",
         "Verdana,Arial,Helvetica,sans-serif"
      ],
      "domain" : "http://www.fogcam.org/"
   },
   {
      "fonts" : [
         "sans-serif",
         "monospace",
         "webflow-icons",
         "webflow-icons!important",
         "Arial",
         "inherit",
         "serif",
         "HelveticaNeue",
         "Helvetica",
         "Ubuntu",
         "SegoeUI",
         "Verdana",
         "Graphik",
         "RobotoMono",
         "Circular",
         "AvenirNext",
         "Graphikmediumweb",
         "Akkurat",
         "Syncopate"
      ],
      "domain" : "https://webflow.com/"
   },
   {
      "domain" : "https://github.com/",
      "fonts" : [
         "monospace",
         "inherit",
         "SFMono-Regular",
         "Consolas",
         "LiberationMono",
         "Menlo",
         "Courier",
         "sans-serif",
         "-apple-system",
         "BlinkMacSystemFont",
         "SegoeUI",
         "Helvetica",
         "Arial",
         "AppleColorEmoji",
         "SegoeUIEmoji",
         "SegoeUISymbol",
         "monospace!important",
         "Inter",
         "InterUI",
         "HelveticaNeue",
         "Oxygen",
         "Ubuntu",
         "Cantarell",
         "OpenSans",
         "oswald-medium",
         "ArialBlack",
         "ArialBold",
         "Gadget",
         "BrushScriptMT",
         "cursive"
      ]
   }
]
```
