import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Favorite from '../models/favorite.model';
import SearchHistory from '../models/searchHistory.model';
import Product from '../models/product.model';

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

const sanitizeUser = (user: User) => ({
  user_id: user.user_id,
  name: user.name,
  email: user.email,
  address: user.address,
  token: generateToken(user.user_id),
});

export const registerUser = async (userData: any) => {
  const { name, email, password, address } = userData;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new Error('User already exists');
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password_hash,
    address,
  });

  if (user) {
    return sanitizeUser(user);
  } else {
    throw new Error('Invalid user data');
  }
};

export const loginUser = async (userData: any) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash || '');
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  user.last_login = new Date();
  await user.save();

  return sanitizeUser(user);
};

export const getUserProfile = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    address: user.address,
    last_login: user.last_login,
    created_at: user.created_at,
  };
};

export const updateUserProfile = async (userId: number, userData: Partial<User>) => {
  const user = await User.findByPk(userId);

  if (user) {
    user.name = userData.name || user.name;
    user.email = userData.email || user.email;
    user.address = userData.address ?? user.address;

    if ((userData as any).password) {
      user.password_hash = await bcrypt.hash((userData as any).password, 10);
    }

    const updatedUser = await user.save();
    return sanitizeUser(updatedUser);
  } else {
    throw new Error('User not found');
  }
};

export const getFavorites = async (userId: number) => {
  const favorites = await Favorite.findAll({
    where: { user_id: userId },
    include: [{ model: Product, attributes: ['product_id', 'product_name', 'category', 'restaurant_name', 'image_url'] }],
    order: [['created_at', 'DESC']],
  });

  return favorites.map((favorite: any) => ({
    favorite_id: favorite.favorite_id,
    product_id: favorite.product_id,
    created_at: favorite.created_at,
    product: favorite.Product,
  }));
};

export const addFavorite = async (userId: number, productId: number) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const [favorite] = await Favorite.findOrCreate({
    where: { user_id: userId, product_id: productId },
    defaults: { user_id: userId, product_id: productId },
  });

  return favorite;
};

export const removeFavorite = async (userId: number, productId: number) => {
  await Favorite.destroy({ where: { user_id: userId, product_id: productId } });
  return { product_id: productId };
};

export const saveSearch = async (userId: number, searchTerm: string) => {
  const normalized = searchTerm.trim();
  if (!normalized) {
    throw new Error('searchTerm is required');
  }

  await SearchHistory.create({
    user_id: userId,
    search_term: normalized,
  });

  return { search_term: normalized };
};

export const getSearchHistory = async (userId: number) => {
  const history = await SearchHistory.findAll({
    where: { user_id: userId },
    order: [['searched_at', 'DESC']],
    limit: 8,
  });

  const uniqueTerms = Array.from(new Map(history.map((item: any) => [item.search_term.toLowerCase(), item])).values());

  return uniqueTerms.map((item: any) => ({
    search_id: item.search_id,
    search_term: item.search_term,
    searched_at: item.searched_at,
  }));
};

