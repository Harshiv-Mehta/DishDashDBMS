import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const registerUser = async (userData: any) => {
  const { name, email } = userData;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
  });

  if (user) {
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      token: generateToken(user.user_id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

export const loginUser = async (userData: any) => {
  const { email } = userData;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      token: generateToken(user.user_id),
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const getUserProfile = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserProfile = async (userId: number, userData: Partial<User>) => {
  const user = await User.findByPk(userId);

  if (user) {
    user.name = userData.name || user.name;
    user.email = userData.email || user.email;
    const updatedUser = await user.save();
    return {
      user_id: updatedUser.user_id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser.user_id),
    };
  } else {
    throw new Error('User not found');
  }
};

