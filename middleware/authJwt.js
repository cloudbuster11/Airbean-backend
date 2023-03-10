const jwt = require('jsonwebtoken');
// const config = require('../config/authConfig.js');
const models = require('../models');
const User = models.user;
const Role = models.role;

verifyToken = (req, res, next) => {
  bearer = req.headers.authorization;

  // let token = req.headers.authorization;
  if (!bearer) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  // if (!token) {
  //   return res.status(403).send({ message: 'No token provided!' });
  // }

  const token = bearer.replace('Bearer', '').replace(' ', '');

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'admin') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Require Admin Role!' });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
