import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repository/AuthRepository.js';

class AuthService {
  static async register(data) {
    const { username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return AuthRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });
  }

  static async login(data) {
    const { email, password } = data;
    const user = await AuthRepository.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: '2h',
    });
    return { token, user };
  }

  static async getProfile(userId) {
    const user = await AuthRepository.findUserById(userId);
    return user;
  }
}

export default AuthService;
