import jwt from 'jsonwebtoken'

export default function verifyJWT(req, res, next) {

  const exceptsPath = ['/api/users/register', '/api-docs/', '/api/auth/login'];
  if (exceptsPath.includes(req.path)) return next();

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  const token = authHeader.substring(7);
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });w
}