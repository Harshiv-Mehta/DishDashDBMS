import Product from './product.model';
import Price from './price.model';
import Restaurant from './restaurant.model';
import Location from './location.model';
import User from './user.model';
import { Order, OrderItem } from './order.model';
import MenuItem from './menuItem.model';
import Platform from './platform.model';
import PriceComparison from './priceComparison.model';
import Redirection from './redirection.model';
import Favorite from './favorite.model';
import SearchHistory from './searchHistory.model';

const setupAssociations = () => {
  // Product <-> Price
  Product.hasMany(Price, { foreignKey: 'product_id', as: 'prices' });
  Price.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Platform <-> PriceComparison
  Platform.hasMany(PriceComparison, { foreignKey: 'platform_id' });
  PriceComparison.belongsTo(Platform, { foreignKey: 'platform_id' });

  // Product <-> PriceComparison
  Product.hasMany(PriceComparison, { foreignKey: 'product_id' });
  PriceComparison.belongsTo(Product, { foreignKey: 'product_id' });


  // PriceComparison <-> Redirection
  PriceComparison.hasMany(Redirection, { foreignKey: 'comparison_id' });
  Redirection.belongsTo(PriceComparison, { foreignKey: 'comparison_id' });

  // User <-> Order
  User.hasMany(Order, { foreignKey: 'user_id' });
  Order.belongsTo(User, { foreignKey: 'user_id' });

  // User <-> Favorite
  User.hasMany(Favorite, { foreignKey: 'user_id' });
  Favorite.belongsTo(User, { foreignKey: 'user_id' });

  // Product <-> Favorite
  Product.hasMany(Favorite, { foreignKey: 'product_id' });
  Favorite.belongsTo(Product, { foreignKey: 'product_id' });

  // User <-> SearchHistory
  User.hasMany(SearchHistory, { foreignKey: 'user_id' });
  SearchHistory.belongsTo(User, { foreignKey: 'user_id' });


  // Restaurant <-> Order
  Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
  Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  // Order <-> OrderItem
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
};

export default setupAssociations;
