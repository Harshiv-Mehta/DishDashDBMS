import PriceComparison from '../models/priceComparison.model';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import Redirection from '../models/redirection.model';
import { Op } from 'sequelize';


export const createPriceComparison = async (priceComparisonData: any): Promise<PriceComparison> => {
  return await PriceComparison.create(priceComparisonData);
};

export const getPriceComparisons = async (filters: any = {}): Promise<any[]> => {
  const { category, search } = filters;
  const where: any = {};
  if (category && category !== 'All') where.category = category;
  if (search) {
    where[Op.or] = [
      { product_name: { [Op.like]: `%${search}%` } },
      { restaurant_name: { [Op.like]: `%${search}%` } },
      { category: { [Op.like]: `%${search}%` } }
    ];
  }

  const products = await Product.findAll({
    where,
    include: [
      {
        model: PriceComparison,
        include: [
          Platform,
          { model: Redirection }
        ]
      }
    ]
  });

  return products.map((item: any) => {
    const platforms = item.PriceComparisons
      .map((pc: any) => ({
        name: pc.Platform.platform_name,
        price: parseFloat(pc.price),
        discount: parseFloat(pc.discount),
        link: pc.Redirections && pc.Redirections.length > 0
          ? pc.Redirections[0].redirect_url
          : `https://${pc.Platform.platform_name.toLowerCase()}.com/search?q=${encodeURIComponent(item.product_name)}`,
      }));

    // Identify Best Deal
    if (platforms.length > 0) {
      const minPrice = Math.min(...platforms.map((p: any) => p.price));
      platforms.forEach((p: any) => {
        if (p.price === minPrice) p.isBest = true;
      });
    }

    return {
      id: item.product_id,
      name: item.product_name,
      restaurant_name: item.restaurant_name,
      category: item.category,
      description: `${item.product_name} from ${item.restaurant_name}`,
      image: item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      platforms: platforms
    };
  });
};

export const getPriceComparisonById = async (id: number): Promise<PriceComparison | null> => {
  return await PriceComparison.findByPk(id);
};

export const updatePriceComparison = async (id: number, priceComparisonData: Partial<PriceComparison>): Promise<PriceComparison | null> => {
  await PriceComparison.update(priceComparisonData, { where: { comparison_id: id } });
  return await PriceComparison.findByPk(id);
};

export const deletePriceComparison = async (id: number): Promise<number> => {
  return await PriceComparison.destroy({ where: { comparison_id: id } });
};

