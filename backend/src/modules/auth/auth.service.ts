import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../../models/User';
import { AppError } from '../../utils/AppError';
import { signAccessToken, signRefreshToken, verifyToken } from '../../utils/jwt.util';

export class AuthService {
  static async register(userData: any) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    const accessToken = signAccessToken(user._id, user.role);
    const refreshToken = signRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  }

  static async login({ email, password }: any) {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = signAccessToken(user._id, user.role);
    const refreshToken = signRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  }

  static async refresh(token: string) {
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== token) {
        throw new AppError('Invalid refresh token', 401);
      }

      const accessToken = signAccessToken(user._id, user.role);
      const refreshToken = signRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      return { accessToken, refreshToken };
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }

  static async logout(userId: string) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  static async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('There is no user with this email address', 404);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save({ validateBeforeSave: false });

    return resetToken;
  }

  static async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new AppError('Token is invalid or has expired', 400);
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await User.findById(userId);
    if (!user || !user.password) {
      throw new AppError('User not found', 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError('Incorrect current password', 401);
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
  }
}
