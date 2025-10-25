-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  title VARCHAR(200),
  bio TEXT,
  profile_image_url TEXT,
  date_of_birth DATE,
  nationality VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  languages TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  site_title VARCHAR(255),
  site_description TEXT,
  admin_email VARCHAR(255),
  copyright_text VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default profile data
INSERT INTO profile (id, first_name, last_name, title, bio, profile_image_url, date_of_birth, nationality, phone, email, address, languages, resume_url) 
VALUES (
  1,
  'Alex',
  'Doe',
  'UI/UX Designer',
  'I am a passionate and creative UI/UX Designer with a knack for building elegant and functional user experiences. I specialize in user-centered design and have a strong command of modern design tools.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  '1995-10-26',
  'CreativeLand',
  '+123 456 7890',
  'author.name@example.com',
  '123 Design St, Anytown, USA',
  'English, Designish',
  'https://example.com/resume.pdf'
) ON CONFLICT (id) DO NOTHING;

-- Insert default settings
INSERT INTO settings (id, site_title, site_description, admin_email, copyright_text)
VALUES (
  1,
  'Alex Doe - UI/UX Designer',
  'Professional UI/UX Designer Portfolio',
  'admin@example.com',
  '© 2024 Alex Doe. All Rights Reserved.'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample news
INSERT INTO news (title, content, image_url, published) VALUES
('Welcome to My Portfolio', 'This is my new portfolio website where I showcase my latest work and projects.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', true),
('New Design Project Completed', 'Just finished working on a exciting new mobile app design project. Check out the case study!', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop', true);

-- Enable Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access for news" ON news FOR SELECT USING (published = true);
CREATE POLICY "Public read access for settings" ON settings FOR SELECT USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin full access for profile" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for news" ON news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
