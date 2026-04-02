ALTER TABLE users
  MODIFY user_id INT NOT NULL AUTO_INCREMENT,
  MODIFY name VARCHAR(100) NOT NULL,
  MODIFY email VARCHAR(150) NOT NULL,
  ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '$2a$10$OsMoIfz2bPdE.O7yHtSVTu/sPZxVQ2CwLDTccF51yymIqMSPJHgIi',
  ADD COLUMN address VARCHAR(255) NULL,
  ADD COLUMN last_login DATETIME NULL,
  ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD UNIQUE KEY unique_user_email (email);

UPDATE users
SET
  password_hash = COALESCE(password_hash, '$2a$10$OsMoIfz2bPdE.O7yHtSVTu/sPZxVQ2CwLDTccF51yymIqMSPJHgIi'),
  created_at = COALESCE(created_at, NOW())
WHERE password_hash IS NULL OR created_at IS NULL;

CREATE TABLE IF NOT EXISTS favorites (
  favorite_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_product_favorite (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS search_history (
  search_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  search_term VARCHAR(255) NOT NULL,
  searched_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
