# Font Family Scraper

This an API to scrape websites and collect the `fonts` that are being used on these websites.

The scraper will get `fonts` from inline style and stylesheets links.

The API can scrape a of maximum 100 websites. If the website has errors in the style it won't be scraped.

## Install dependencies

Run the command on the console:

```
npm install
```

## Test

Run the command on the console::

```
npm test
```

## Execute

To start the application run the command on the console:

```
npm start
```

## How to use the API

The API will be available in `http://localhost:3000/parseFonts` as `POST`.

The endpoint accepts the following data:
 - the domains in the request body:
    - `domains` has to be an array of strings
    - `domains` has to have a list of valid websites
 - the deepest that the domain can be scraped:
    - `deep` is an optional parameter
    - `deep` has to be an integer between 0 to 3
    - `deep` has 0 as default value
 - the quantity of pages that have to be scraped:
    - `quantityOfPages` is an optional parameter
    - `quantityOfPages` has to be an integer between 1 to 100
    - `quantityOfPages` has 10 as default value

```
{
	"domains": [
		"http://www.dolekemp96.org/main.htm",
		"http://www.fogcam.org/"
	],
	"deep": 2,
	"quantityOfPages": 3
}
```

The endpoint result will in an array with the domains and fonts that are being used.

```
[
    {
        "domain": "http://www.dolekemp96.org/main.htm",
        "result": [
            {
                "domain": "http://www.dolekemp96.org/main.htm",
                "paths": [],
                "fonts": [
                    "TimesNewRoman"
                ],
                "state": "Success"
            }
        ]
    },
    {
        "domain": "http://www.fogcam.org/",
        "result": [
            {
                "domain": "http://www.fogcam.org/",
                "paths": [],
                "fonts": [
                    "Arial,Helvetica,sans-serif",
                    "TrebuchetMS,Trebuchet,sans-serif",
                    "Verdana,Arial,Helvetica,sans-serif"
                ],
                "state": "Success"
            }
        ]
    }
]
```

### Example

Request:

```
curl -X POST -H "Content-Type: application/json" -d '{"domains": ["http://www.dolekemp96.org/main.htm", "http://www.fogcam.org/", "https://webflow.com/", "https://babbel.com/", "https://ebay.com/"], "deep": 2, "quantityOfPages": 3}' http://localhost:3000/parseFonts
```

Response:

```
HTTP/1.1 200 OK

[
    {
        "domain": "http://www.dolekemp96.org/main.htm",
        "result": [
            {
                "domain": "http://www.dolekemp96.org/main.htm",
                "paths": [],
                "fonts": [
                    "TimesNewRoman"
                ],
                "state": "Success"
            }
        ]
    },
    {
        "domain": "http://www.fogcam.org/",
        "result": [
            {
                "domain": "http://www.fogcam.org/",
                "paths": [],
                "fonts": [
                    "Arial,Helvetica,sans-serif",
                    "TrebuchetMS,Trebuchet,sans-serif",
                    "Verdana,Arial,Helvetica,sans-serif"
                ],
                "state": "Success"
            }
        ]
    },
    {
        "domain": "https://webflow.com/",
        "result": [
            {
                "domain": "https://webflow.com/",
                "paths": [
                    "https://webflow.com/designer",
                    "https://webflow.com/interactions-animations",
                    "https://webflow.com/cms",
                    "https://webflow.com/ecommerce",
                    "https://webflow.com/editor",
                    "https://webflow.com/hosting",
                    "https://webflow.com/solutions/freelancers-agencies",
                    "https://webflow.com/solutions/marketing-teams",
                    "https://webflow.com/solutions/business-websites",
                    "https://webflow.com/solutions/prototyping",
                    "https://webflow.com/customers/heco",
                    "https://webflow.com/customers/dell",
                    "https://webflow.com/customers/hellosign",
                    "https://webflow.com/discover/popular#recent",
                    "https://webflow.com/events",
                    "https://webflow.com/workshops",
                    "https://webflow.com/templates",
                    "https://webflow.com/pricing",
                    "https://webflow.com/blog",
                    "https://webflow.com/dashboard/",
                    "https://webflow.com/dashboard/signup",
                    "https://webflow.com/dashboard",
                    "https://webflow.com/customers",
                    "https://webflow.com/pricing-old",
                    "https://webflow.com/enterprise",
                    "https://webflow.com/features",
                    "https://webflow.com/vs/wordpress",
                    "https://webflow.com/about",
                    "https://webflow.com/about#jobs",
                    "https://webflow.com/legal/terms",
                    "https://webflow.com/legal/privacy",
                    "https://webflow.com/legal/cookie-policy",
                    "https://webflow.com/sitemap",
                    "https://webflow.com/affiliates"
                ],
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
                ],
                "state": "Success"
            },
            {
                "domain": "https://webflow.com/designer",
                "paths": [
                    "https://webflow.com/interactions-animations",
                    "https://webflow.com/cms",
                    "https://webflow.com/ecommerce",
                    "https://webflow.com/editor",
                    "https://webflow.com/hosting",
                    "https://webflow.com/solutions/freelancers-agencies",
                    "https://webflow.com/solutions/marketing-teams",
                    "https://webflow.com/solutions/business-websites",
                    "https://webflow.com/solutions/prototyping",
                    "https://webflow.com/customers/heco",
                    "https://webflow.com/customers/dell",
                    "https://webflow.com/customers/hellosign",
                    "https://webflow.com/discover/popular#recent",
                    "https://webflow.com/events",
                    "https://webflow.com/workshops",
                    "https://webflow.com/templates",
                    "https://webflow.com/pricing",
                    "https://webflow.com/blog",
                    "https://webflow.com/dashboard/",
                    "https://webflow.com/dashboard/signup",
                    "https://webflow.com/designer",
                    "https://webflow.com/features",
                    "https://webflow.com/terms",
                    "https://webflow.com/blog/ecommerce-website-design-examples",
                    "https://webflow.com/category/inspiration",
                    "https://webflow.com/blog/explore-the-graphic-design-archive",
                    "https://webflow.com/blog/20-web-design-trends-for-2019",
                    "https://webflow.com/customers",
                    "https://webflow.com/pricing-old",
                    "https://webflow.com/enterprise",
                    "https://webflow.com/vs/wordpress",
                    "https://webflow.com/about",
                    "https://webflow.com/about#jobs",
                    "https://webflow.com/legal/terms",
                    "https://webflow.com/legal/privacy",
                    "https://webflow.com/legal/cookie-policy",
                    "https://webflow.com/sitemap",
                    "https://webflow.com/affiliates"
                ],
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
                ],
                "state": "Success"
            },
            {
                "domain": "https://webflow.com/interactions-animations",
                "paths": [
                    "https://webflow.com/designer",
                    "https://webflow.com/cms",
                    "https://webflow.com/ecommerce",
                    "https://webflow.com/editor",
                    "https://webflow.com/hosting",
                    "https://webflow.com/solutions/freelancers-agencies",
                    "https://webflow.com/solutions/marketing-teams",
                    "https://webflow.com/solutions/business-websites",
                    "https://webflow.com/solutions/prototyping",
                    "https://webflow.com/customers/heco",
                    "https://webflow.com/customers/dell",
                    "https://webflow.com/customers/hellosign",
                    "https://webflow.com/discover/popular#recent",
                    "https://webflow.com/events",
                    "https://webflow.com/workshops",
                    "https://webflow.com/templates",
                    "https://webflow.com/pricing",
                    "https://webflow.com/blog",
                    "https://webflow.com/dashboard/",
                    "https://webflow.com/dashboard/signup",
                    "https://webflow.com/interactions-animations",
                    "https://webflow.com/ix2",
                    "https://webflow.com/terms",
                    "https://webflow.com/customers",
                    "https://webflow.com/pricing-old",
                    "https://webflow.com/enterprise",
                    "https://webflow.com/features",
                    "https://webflow.com/vs/wordpress",
                    "https://webflow.com/about",
                    "https://webflow.com/about#jobs",
                    "https://webflow.com/legal/terms",
                    "https://webflow.com/legal/privacy",
                    "https://webflow.com/legal/cookie-policy",
                    "https://webflow.com/sitemap",
                    "https://webflow.com/affiliates"
                ],
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
                ],
                "state": "Success"
            }
        ]
    },
    {
        "domain": "https://babbel.com/",
        "result": [
            {
                "domain": "https://babbel.com/",
                "paths": [
                    "https://babbel.com//www.babbel.com",
                    "https://babbel.com//accounts.babbel.com/en/accounts/sign_in",
                    "https://babbel.com//www.babbel.com/registration/new",
                    "https://babbel.com/learn-german-online",
                    "https://babbel.com/learn-french-online",
                    "https://babbel.com/learn-italian-online",
                    "https://babbel.com/learn-spanish-online",
                    "https://babbel.com/learn-portuguese-online",
                    "https://babbel.com/learn-turkish-online",
                    "https://babbel.com/learn-polish-online",
                    "https://babbel.com/learn-dutch-online",
                    "https://babbel.com/learn-indonesian-online",
                    "https://babbel.com/learn-swedish-online",
                    "https://babbel.com/learn-norwegian-online",
                    "https://babbel.com/learn-danish-online",
                    "https://babbel.com/learn-russian-online",
                    "https://babbel.com/learn-german",
                    "https://babbel.com/learn-french",
                    "https://babbel.com/learn-spanish",
                    "https://babbel.com/learn-italian",
                    "https://babbel.com/learn-portuguese",
                    "https://babbel.com/learn-swedish",
                    "https://babbel.com/learn-dutch",
                    "https://babbel.com/learn-polish",
                    "https://babbel.com/learn-turkish",
                    "https://babbel.com/learn-indonesian",
                    "https://babbel.com/learn-norwegian",
                    "https://babbel.com/learn-danish",
                    "https://babbel.com/learn-russian",
                    "https://babbel.com/mobile",
                    "https://babbel.com/prices",
                    "https://babbel.com/faq"
                ],
                "fonts": [
                    "HelveticaNeue",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                    "inherit",
                    "Monaco",
                    "Menlo",
                    "Consolas",
                    "CourierNew",
                    "monospace",
                    "FontAwesome",
                    "Georgia",
                    "TimesNewRoman",
                    "Times",
                    "serif",
                    "Milliard-SemiBold",
                    "Milliard-Bold",
                    "Milliard-Book",
                    "BabbelMilliardBook",
                    "BabbelMilliardMedium",
                    "BabbelMilliardSemiBold",
                    "BabbelMilliardBold",
                    "LeituraNews"
                ],
                "state": "Success"
            },
            {
                "domain": "https://babbel.com//www.babbel.com",
                "state": "Error"
            },
            {
                "domain": "https://babbel.com//accounts.babbel.com/en/accounts/sign_in",
                "state": "Error"
            }
        ]
    },
    {
        "domain": "https://ebay.com/",
        "result": [
            {
                "domain": "https://ebay.com/",
                "paths": [],
                "fonts": [
                    "MarketSans,Arial,sans-serif",
                    "HelveticaNeue",
                    "Helvetica",
                    "Arial",
                    "Verdana",
                    "Sans-serif!important",
                    "MarketSans",
                    "sans-serif",
                    "Helveticaneue",
                    "Sans-serif",
                    "inherit"
                ],
                "state": "Success"
            }
        ]
    }
]
```
