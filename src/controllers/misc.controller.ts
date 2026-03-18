import { Request, Response } from 'express';
import Product from '../models/product.model';
import User from '../models/user.model';
import Platform from '../models/platform.model';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Product.findAll({
            attributes: [[Product.sequelize!.fn('DISTINCT', Product.sequelize!.col('category')), 'category']],
        });
        res.json(categories.map((c: any) => c.category));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        const productCount = await Product.count();
        const userCount = await User.count();
        const platformCount = await Platform.count();

        res.json({
            totalProducts: productCount,
            activeUsers: userCount,
            platforms: platformCount,
            savings: '25%' // Mocked as it's a display stat
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};
