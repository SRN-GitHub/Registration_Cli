import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service';
import { sendResetPasswordEmail } from '../utils/sendMail';


//* Entry point of the API and Handles HTTP reqsts and invoke services.

//* CREATE A NEW USER >>>
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

//* LOGIN USER VALIDATE <<<

export const loginUser = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const user = await UserService.loginUserOne(Email, Password);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, Email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '5h' }
    );

    // Respond with user data and the token
    res.status(HttpStatus.OK).json({ 
      code: HttpStatus.OK, 
      data: { ...user, token },  // Only one token here
      message: 'User Logged in Successfully' 
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({ 
      code: HttpStatus.UNAUTHORIZED, 
      message: error.message 
    });
    console.error('Login error:', error.message);
  }
};

//* FORGOT PASSWORD >>> 
  // &   <<< SEND MAIL >>>
    //^ New
export const forgotPassword = async (req, res, next) => {
  try {
    const { Email } = req.body;
    const { resetToken } = await UserService.generateResetToken(Email);

    // Use the sendResetPasswordEmail function to send the token via email
    await sendResetPasswordEmail(Email, resetToken, 'User');

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Reset token generated and email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

//* RESET PASSWORD >>>
    //^ new
export const resetPassword = async (req, res, next) => {
  try {
    // Extract the resetToken from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Authorization header missing or invalid'
      });
    }

    const resetToken = authHeader.split(' ')[1];
    const { newPassword } = req.body;

    const data = await UserService.resetPassword(newPassword, resetToken);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};
