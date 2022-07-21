const allowedCors = [
  'mesto.rt.front.nomoredomains.sbs',
  'localhost:3000',
  'http://localhost:3000',
  'http://mesto.rt.front.nomoredomains.sbs',
  'https://mesto.rt.front.nomoredomains.sbs',
  'https://localhost:3000',
  'https://images.unsplash.com/',
  'https://images.freeimages.com/',
  'https://pictures.s3.yandex.net/',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.status(200).send();
    return;
  }
  next();
});
