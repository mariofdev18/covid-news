const NewsAPI = require('newsapi');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const newsapi = new NewsAPI(process.env.NewsAPI_Key);

const newsCtrl = {};

newsCtrl.getNews = async (req, res) => {

  let session = JSON.parse(localStorage.getItem('session'));
  let language = session.language ? session.language : 'es';

  const { fromDate, toDate } = req.body;

  await newsapi.v2.everything({
    q: 'covid-19',
    from: fromDate,
    to: toDate,
    language: language,
    sortBy: 'relevancy'
  }).then(response => {
    res.status(200).json({ response });
  });

}

module.exports = newsCtrl;
