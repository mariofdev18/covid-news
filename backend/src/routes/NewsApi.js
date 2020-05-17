const { Router } = require('express');
const router =  Router();
const NewsController = require('../controllers/NewsApi');

router.route('/get-news').post(NewsController.getNews);

module.exports = router;
