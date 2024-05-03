import jwt from 'jsonwebtoken'

export default function verifyJWT(req, res, next) {

  const exceptsPath = ['/api/auth/register', '/api-docs/', '/api/auth/login'];
  if (exceptsPath.includes(req.path)) return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader.substring(7);

  if (!token || !authHeader.startsWith('Bearer ')) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}