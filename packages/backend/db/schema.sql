-- Table: registries
CREATE TABLE registries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  api_endpoint TEXT,
  contact_email TEXT
);

-- Table: owners
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT
);

-- Table: dogs
CREATE TABLE dogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  microchip_id VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(100),
  breed VARCHAR(100),
  age INTEGER,
  color VARCHAR(50),
  gender VARCHAR(10),
  registry_id UUID REFERENCES registries(id),
  owner_id UUID REFERENCES owners(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
