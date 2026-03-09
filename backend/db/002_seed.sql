-- Cafes
INSERT INTO cafe (cafe_id, name, description, location) VALUES
  (uuid_generate_v4(), 'Kopi Tiam', 'A traditional Singapore coffee shop', 'Tampines'),
  (uuid_generate_v4(), 'Brew & Co', 'Specialty coffee and pastries', 'Orchard'),
  (uuid_generate_v4(), 'DailyGrind', 'Your everyday coffee fix', 'Bugis'),
  (uuid_generate_v4(), 'Botanica', 'Nature inspired cafe experience', 'Tampines'),
  (uuid_generate_v4(), 'UrbanRoast', 'Modern cafe with artisan coffee', 'CBD');

-- Employees
INSERT INTO employee (employee_id, name, email_address, phone_number, gender) VALUES
  ('UI1A2B3C4', 'John Tan', 'john.tan@email.com', '91234567', 'Male'),
  ('UI2B3C4D5', 'Sarah Lim', 'sarah.lim@email.com', '81234567', 'Female'),
  ('UI3C4D5E6', 'Michael Ng', 'michael.ng@email.com', '92345678', 'Male'),
  ('UI4D5E6F7', 'Emily Chua', 'emily.chua@email.com', '82345678', 'Female'),
  ('UI5E6F7G8', 'David Koh', 'david.koh@email.com', '93456789', 'Male'),
  ('UI6F7G8H9', 'Rachel Wong', 'rachel.wong@email.com', '83456789', 'Female'),
  ('UI7G8H9I0', 'Jason Lee', 'jason.lee@email.com', '94567890', 'Male'),
  ('UI8H9I0J1', 'Priya Raj', 'priya.raj@email.com', '84567890', 'Female');

-- Employee Cafe relationships
INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI1A2B3C4', cafe_id, '2024-01-15' FROM cafe WHERE name = 'Kopi Tiam';

INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI2B3C4D5', cafe_id, '2024-02-20' FROM cafe WHERE name = 'Kopi Tiam';

INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI3C4D5E6', cafe_id, '2024-03-10' FROM cafe WHERE name = 'Brew & Co';

INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI4D5E6F7', cafe_id, '2024-04-05' FROM cafe WHERE name = 'Brew & Co';

INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI5E6F7G8', cafe_id, '2024-05-01' FROM cafe WHERE name = 'DailyGrind';

INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI6F7G8H9', cafe_id, '2024-06-15' FROM cafe WHERE name = 'Botanica';

INSERT INTO employee_cafe (employee_id, cafe_id, start_date)
SELECT 'UI7G8H9I0', cafe_id, '2024-07-20' FROM cafe WHERE name = 'UrbanRoast';
-- UI8H9I0J1 intentionally unassigned