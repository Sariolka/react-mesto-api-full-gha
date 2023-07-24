const allowedCors = [
  'https://sariolka.student.nomoredomains.xyz',
  'https://api.sariolka.students.nomoredomains.xyz',
  'http://sariolka.student.nomoredomains.xyz',
  'http://api.sariolka.students.nomoredomains.xyz',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000'];

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.end();
  }

  next();
};
