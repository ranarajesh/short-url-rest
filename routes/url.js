const express = require('express');
//const mongoose = require('mongoose');
const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');

const URL = require('../models/URL');

const router = express.Router();

/* 
  Route:    /v1/api/shortener 
  Method:   POST
  @params   longUrl
 */

router.route('/shortener').post(async (req, res) => {
  const { longUrl } = req.body;
  const domainUrl = config.get('domainUrl');

  // check for valid base url
  if (!validUrl.isUri(domainUrl)) {
    return res.status(400).json({
      success: false,
      message: 'bad input parameter(s)',
    });
  }

  // check of valid long url
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({
      success: false,
      message: 'bad input parameter(s)',
    });
  } else {
    try {
      // check for short url is already exist in db
      let url = await URL.findOne({ longUrl });
      if (url) {
        return res.status(200).json(url);
      } else {
        // create new shortid and add in db
        const shortUrlId = shortid.generate();
        url = new URL({
          longUrl,
          shortUrl: `${domainUrl}/${shortUrlId}`,
          urlId: shortUrlId,
          createdAt: new Date(),
        });
        await url.save();
        return res.status(200).json(url);
      }
    } catch (error) {
      return res.status(500).json({ message: 'server error' });
    }
  }
});
module.exports = router;
