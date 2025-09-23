-- Add type field to travel packages table
-- This script adds a new field to distinguish between excursions and travel packages

-- Create enum type for package types
CREATE TYPE package_type AS ENUM ('excursion', 'paquete_viaje');

-- Add the type column to the existing table
ALTER TABLE travel_packages 
ADD COLUMN type package_type NOT NULL DEFAULT 'paquete_viaje';

-- Create index for better performance when filtering by type
CREATE INDEX idx_travel_packages_type ON travel_packages(type);