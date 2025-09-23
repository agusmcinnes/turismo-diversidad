-- Insert sample travel packages
INSERT INTO travel_packages (name, destination, description, duration_days, duration_nights, services, transportation, image_url, price) VALUES
(
  'Aventura en los Esteros del Iberá',
  'Esteros del Iberá, Corrientes',
  'Descubre la increíble biodiversidad de los Esteros del Iberá en esta aventura de 3 días. Observa carpinchos, yacarés, aves exóticas y disfruta de la naturaleza en su estado más puro.',
  3,
  2,
  ARRAY['Guía especializado', 'Transporte en lancha', 'Comidas incluidas', 'Alojamiento en lodge', 'Equipo de observación'],
  'Lancha y vehículo 4x4',
  '/placeholder.svg?height=400&width=600',
  85000.00
),
(
  'Safari Fotográfico Nocturno',
  'Laguna Iberá',
  'Una experiencia única para fotografiar la vida nocturna de los esteros. Ideal para amantes de la fotografía y la naturaleza.',
  2,
  1,
  ARRAY['Guía fotógrafo profesional', 'Equipo de iluminación', 'Transporte nocturno', 'Refrigerios', 'Seguro de actividad'],
  'Vehículo especializado',
  '/placeholder.svg?height=400&width=600',
  45000.00
),
(
  'Expedición Completa Iberá',
  'Múltiples puntos de los Esteros',
  'La experiencia más completa de 5 días recorriendo diferentes sectores de los Esteros del Iberá. Incluye todas las actividades principales.',
  5,
  4,
  ARRAY['Guía especializado', 'Todas las comidas', 'Alojamiento premium', 'Transporte completo', 'Actividades acuáticas', 'Trekking', 'Observación de fauna'],
  'Combinado: lancha, 4x4 y trekking',
  '/placeholder.svg?height=400&width=600',
  150000.00
);
