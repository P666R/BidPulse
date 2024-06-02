import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import AuthRepository from '../repository/AuthRepository.js';
import sendEmail from '../utils/SendEmail.js';
import AppError from '../helpers/AppError.js';

const domainURL = process.env.DOMAIN;

class AuthService {
  static async register(data) {
    const { username, email, password } = data;
    const existingUser = await AuthRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(
        'Email address already associated with an existing account',
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new AppError('User registration failed', 500);
    }

    const verificationToken = randomBytes(32).toString('hex');
    const emailVerificationToken = await AuthRepository.createVerificationToken(
      { userId: user.id, token: verificationToken },
    );
    const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerificationToken.token}/${user.id}`;
    const payload = { name: user.username, link: emailLink };

    await sendEmail(
      user.email,
      'Account Verification',
      payload,
      './emails/template/accountVerification.handlebars',
    );

    return {
      message: `A new user ${user.username} has been registered! Please check your email to verify your account within the next 15 minutes`,
    };
  }

  static async verify(token, userId) {
    const user = await AuthRepository.findById(userId);

    if (!user || user.isEmailVerified) {
      throw new AppError('Invalid token or email already verified', 400);
    }

    const userToken = await AuthRepository.findToken(userId, token);

    if (!userToken) {
      throw new AppError('Token invalid or expired', 400);
    }

    await AuthRepository.updateEmailVerified(userId);
    const emailLink = `${domainURL}/api/v1/auth/login`;
    const payload = { name: user.username, link: emailLink };

    await sendEmail(
      user.email,
      'Welcome - Account Verified',
      payload,
      './emails/template/welcome.handlebars',
    );
  }

  static async resendVerificationEmail(email) {
    const user = await AuthRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doesn't exist", 400);
    }

    if (user.isEmailVerified) {
      throw new AppError('Email already verified', 400);
    }

    const existingToken = await AuthRepository.findTokenByUserId(user.id);
    if (existingToken) {
      await AuthRepository.deleteTokenById(existingToken.id);
    }

    const resentToken = randomBytes(32).toString('hex');
    const emailToken = await AuthRepository.createVerificationToken({
      userId: user.id,
      token: resentToken,
    });
    const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user.id}`;
    const payload = { name: user.username, link: emailLink };

    await sendEmail(
      user.email,
      'Account Verification',
      payload,
      './emails/template/accountVerification.handlebars',
    );
    return {
      message: `${user.username}, an email has been sent to your account. Please verify within 15 minutes.`,
    };
  }

  static async requestPasswordReset(email) {
    const user = await AuthRepository.findByEmail(email);

    if (!user) {
      throw new AppError('The email is not associated with any account', 400);
    }

    const existingToken = await AuthRepository.findTokenByUserId(user.id);
    if (existingToken) {
      await AuthRepository.deleteTokenById(existingToken.id);
    }

    const resetToken = randomBytes(32).toString('hex');
    const newToken = await AuthRepository.createVerificationToken({
      userId: user.id,
      token: resetToken,
    });

    if (user.isEmailVerified) {
      const emailLink = `${domainURL}/api/v1/auth/reset-password?emailToken=${newToken.token}&userId=${user.id}`;
      const payload = { name: user.username, link: emailLink };

      await sendEmail(
        user.email,
        'Password Reset Request',
        payload,
        './emails/template/requestResetPassword.handlebars',
      );
      return {
        message: `${user.username}, an email has been sent to your account with the password reset link.`,
      };
    }
  }

  static async resetPassword(password, userId, emailToken) {
    const token = await AuthRepository.findTokenByUserId(userId);

    if (!(token?.token === emailToken)) {
      throw new AppError(
        'Your token is either invalid or expired. Try resetting your password again',
        400,
      );
    }

    const user = await AuthRepository.findById(token.userId);
    const newPassword = await bcrypt.hash(password, 10);
    await AuthRepository.updatePassword(user.id, newPassword);

    const payload = { name: user.username };
    await sendEmail(
      user.email,
      'Password Reset Successful',
      payload,
      './emails/template/resetPassword.handlebars',
    );

    return {
      message: `${user.username}, your password has been reset successfully and an email has been sent to confirm the same.`,
    };
  }

  static async login(data) {
    const { email, password } = data;
    const user = await AuthRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid credentials', 400);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: '1d',
    });
    return { token, user };
  }

  static async profile(userId) {
    const user = await AuthRepository.findById(userId);
    return user;
  }
}

export default AuthService;
