import prisma from '../config/index.js';

class AuthRepository {
  static async createUser(data) {
    return await prisma.user.create({ data });
  }

  static async findUserByUsername(username) {
    return prisma.user.findUnique({ where: { username } });
  }

  static async findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async findUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }
}

export default AuthRepository;
