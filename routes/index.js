const express = require('express');
const router = express.Router();

const URL = require('../models/URL');

router.get('/:code', async (req, res) => {
  const { code } = req.params;

  let url = await URL.findOne({ urlId: code });

  if (!url) {
    res.status(404).json({
      message: 'URL is not valid',
    });
  } else {
    const { longUrl } = url;

    res.redirect(longUrl);
  }
});

module.exports = router;
