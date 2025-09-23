-- Create travel packages table
CREATE TABLE IF NOT EXISTS travel_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  destination TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  transportation TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for displaying packages to visitors)
CREATE POLICY "Anyone can view travel packages" ON travel_packages
  FOR SELECT USING (true);

-- Create policies for admin access (we'll implement admin auth later)
-- For now, we'll allow all authenticated users to manage packages
CREATE POLICY "Authenticated users can insert travel packages" ON travel_packages
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update travel packages" ON travel_packages
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete travel packages" ON travel_packages
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_travel_packages_updated_at 
    BEFORE UPDATE ON travel_packages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
