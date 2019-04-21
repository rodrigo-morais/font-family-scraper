const { getDomainsFonts } = require('./service')

const parseFonts = async (req, res) => {
  const domains = (req.body.domains || []).slice(0,100)

  try {
    const result = await getDomainsFonts(req.body.domains)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).send('Error when scrapping the websites.')
  }
}

module.exports = {
  parseFonts
}
