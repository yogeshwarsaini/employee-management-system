USE employeedb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'manager', 'employee')
);

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  department VARCHAR(100),
  salary DECIMAL(10,2),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (name, email, password, role) VALUES (
  'Admin',
  'admin@company.com',
  '$2b$10$SqAlfXDhwNCrdnnZ/U55TOUdxk1XMl.NTBeoonizv0OQ9zw87gxjK',
  'admin'
);
