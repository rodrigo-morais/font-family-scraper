const scraper = require('./scraper')

const router = app => {
  app.post('/parseFonts', scraper.parseFonts);
}

module.exports = router;
