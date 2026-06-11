import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.register(req.body);
      
      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        status: 'success',
        data: { user: userResponse, accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(req.body);

      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(200).json({
        status: 'success',
        data: { user: userResponse, accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const { accessToken, refreshToken } = await AuthService.refresh(token);

      res.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.user._id);
      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const resetToken = await AuthService.forgotPassword(req.body.email);
      // In a real app, send the resetToken via email here.
      // For now, we return it in the response for development purposes.
      res.status(200).json({
        status: 'success',
        message: 'Password reset token generated and (mock) sent to email.',
        data: { resetToken },
      });
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      await AuthService.resetPassword(token, password);
      
      res.status(200).json({
        status: 'success',
        message: 'Password reset successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      await AuthService.changePassword(req.user._id, currentPassword, newPassword);

      res.status(200).json({
        status: 'success',
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
