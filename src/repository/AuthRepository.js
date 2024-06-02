import prisma from '../config/index.js';

class AuthRepository {
  static async create(data) {
    return prisma.user.create({ data });
  }

  static async createVerificationToken(data) {
    return prisma.verifyResetToken.create({ data });
  }

  static async findToken(userId, token) {
    return prisma.verifyResetToken.findUnique({
      where: { userId_token: { userId, token } },
    });
  }

  static async findTokenByUserId(userId) {
    return prisma.verifyResetToken.findFirst({ where: { userId } });
  }

  static async deleteTokenById(id) {
    return prisma.verifyResetToken.delete({ where: { id } });
  }

  static async updateEmailVerified(id) {
    return prisma.user.update({
      where: { id },
      data: { isEmailVerified: true },
    });
  }

  static async findByUsername(username) {
    return prisma.user.findUnique({ where: { username } });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async updatePassword(id, password) {
    return prisma.user.update({ where: { id }, data: { password } });
  }
}

export default AuthRepository;
