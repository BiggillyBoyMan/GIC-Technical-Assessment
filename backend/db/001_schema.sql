CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cafe (
  cafe_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(10) NOT NULL,
  description VARCHAR(256) NOT NULL,
  logo VARCHAR,
  location VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employee (
  employee_id VARCHAR(9) PRIMARY KEY,
  name VARCHAR NOT NULL,
  email_address VARCHAR NOT NULL UNIQUE,
  phone_number VARCHAR(9) NOT NULL,
  gender VARCHAR(6) NOT NULL CHECK (gender IN ('Male', 'Female')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employee_cafe (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id VARCHAR(9) NOT NULL REFERENCES employee(employee_id) ON DELETE CASCADE,
  cafe_id UUID NOT NULL REFERENCES cafe(cafe_id) ON DELETE CASCADE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(employee_id)
);