-- Create database
CREATE DATABASE tree_watering_db;

-- Connect to database
\c tree_watering_db

-- Companies Table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  company_id INTEGER REFERENCES companies(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trees Table
CREATE TABLE trees (
  id SERIAL PRIMARY KEY,
  tree_id VARCHAR(50) UNIQUE NOT NULL,
  ward VARCHAR(100),
  ward_prefix VARCHAR(10),
  species VARCHAR(100),
  cultivar VARCHAR(100),
  road_site_name VARCHAR(255),
  planting_date DATE,
  required_visits INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Active',
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Watering Visits Table
CREATE TABLE watering_visits (
  id SERIAL PRIMARY KEY,
  visit_id UUID DEFAULT gen_random_uuid(),
  tree_id INTEGER REFERENCES trees(id),
  visit_datetime TIMESTAMP NOT NULL,
  user_id INTEGER REFERENCES users(id),
  company_id INTEGER REFERENCES companies(id),
  condition VARCHAR(50),
  recommendation TEXT,
  notes TEXT,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_trees_tree_id ON trees(tree_id);
CREATE INDEX idx_trees_ward ON trees(ward);
CREATE INDEX idx_visits_tree_id ON watering_visits(tree_id);
CREATE INDEX idx_visits_user_id ON watering_visits(user_id);
CREATE INDEX idx_visits_company_id ON watering_visits(company_id);
CREATE INDEX idx_visits_datetime ON watering_visits(visit_datetime);
CREATE INDEX idx_users_company_id ON users(company_id);

-- Insert sample data
INSERT INTO companies (name, contact_email, contact_phone) VALUES
('Green Care Ltd', 'info@greencare.co.uk', '020 1234 5678'),
('Eco Contractors', 'contact@ecocontractors.co.uk', '020 8765 4321');

INSERT INTO users (username, password_hash, name, email, company_id) VALUES
('contractor1', '$2a$10$YourHashedPasswordHere', 'John Smith', 'john@greencare.co.uk', 1),
('contractor2', '$2a$10$YourHashedPasswordHere', 'Jane Doe', 'jane@ecocontractors.co.uk', 2);

INSERT INTO trees (tree_id, ward, ward_prefix, species, cultivar, road_site_name, planting_date, required_visits, status, latitude, longitude) VALUES
('LF-T0001', 'Lime Grove Ward', 'LF', 'Quercus robur', 'English Oak', 'Rectory Lane', '2024-03-15', 4, 'Active', 51.4142, -0.1937),
('LF-T0002', 'Lime Grove Ward', 'LF', 'Tilia cordata', 'Small Leaved Lime', 'Rectory Lane', '2024-03-15', 4, 'Active', 51.4143, -0.1938),
('WM-T0001', 'Wimbledon Ward', 'WM', 'Acer campestre', 'Field Maple', 'High Street', '2024-04-01', 4, 'Active', 51.4202, -0.2063);