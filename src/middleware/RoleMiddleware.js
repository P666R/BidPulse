import { ADMIN, USER } from '../constants/index.js';
import AppError from '../helpers/AppError.js';

const ROLES = { USER, ADMIN };

const checkRole =
  (...allowedRole) =>
  (req, res, next) => {
    console.log(allowedRole);
    console.log(req.user.role);
    const hasRole =
      (req.user && req.user.role && allowedRole.includes(req.user.role)) ??
      false;

    if (!hasRole) {
      next(new AppError('You are forbidden to perform this action', 403));
    }

    next();
  };

const role = { ROLES, checkRole };

export default role;
