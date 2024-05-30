import { ADMIN, USER } from '../constants/index.js';

const ROLES = { USER, ADMIN };

const checkRole = (allowedRole) => (req, res, next) => {
  const hasRole = (req.user && req.user.role === allowedRole) ?? false;

  if (!hasRole) {
    res.status(403);
    throw new Error('You are forbidden to perform this action');
  }

  next();
};

const role = { ROLES, checkRole };

export default role;
