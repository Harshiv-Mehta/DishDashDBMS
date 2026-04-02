import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.loginUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserProfile(req.user!.user_id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUserProfile(req.user!.user_id, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorites = await userService.getFavorites(req.user!.user_id);
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorite = await userService.addFavorite(req.user!.user_id, Number(req.body.productId));
    res.status(201).json(favorite);
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.removeFavorite(req.user!.user_id, Number(req.params.productId));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const saveSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.saveSearch(req.user!.user_id, req.body.searchTerm);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSearchHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await userService.getSearchHistory(req.user!.user_id);
    res.json(history);
  } catch (error) {
    next(error);
  }
};
