/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Equipment, Material, Project, Testimonial } from './types';

// ESM Import local generated assets to ensure Vite builds and hashes them correctly in production
import heavyMachineImage from './assets/images/heavy_machine_action_1780016374634.png';
import landDevelopmentImage from './assets/images/land_development_1780016401229.png';
import modernSkyscraperImage from './assets/images/modern_skyscraper_1780016433483.png';
import novaHeroBannerImage from './assets/images/nova_hero_banner_1780016349217.png';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Nova Apex Commercial Tower',
    type: 'Commercial',
    status: 'For Sale',
    price: 18500000, // Reduced from 45,000,000
    location: '450 Skyline Boulevard, Downtown Metro',
    size: '120,400 sqft',
    description: 'A masterpiece of contemporary corporate architecture. This premium 24-story glass tower features smart zoning, climate automation, high-speed fiber trunking, and high-efficiency LEED Gold certificate infrastructure.',
    features: ['LEED Gold Certified', 'Double-Glazed Facade', '350 Parking Bays', 'High-Speed Elevators', 'Integrated Security Grid'],
    image: modernSkyscraperImage,
    featured: true
  },
  {
    id: 'prop-2',
    title: 'Vanguard Industrial Logistics Hub',
    type: 'Commercial',
    status: 'For Rent',
    price: 14500, // Reduced from 32,000
    location: 'Port Boulevard Industrial Sector, West Quay',
    size: '45,000 sqft',
    description: 'High-clearance logistics warehouse featuring heavy load-bearing slab foundations, 8 loading docks, separate offices, solar matrix power grids, and close access to marine shipping terminal grids.',
    features: ['32ft Clear Height', '8 Dock Levelers', 'ESFR Sprinkler System', '600A Three-Phase Power', 'Security Ring Fencing'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Multi-million dollar realistic warehouse
    featured: false
  },
  {
    id: 'prop-3',
    title: 'Genesis Horizon Development Acres',
    type: 'Land',
    status: 'For Sale',
    price: 1950000, // Reduced from 6,400,000
    location: 'Horizon Expansion Sector Alpha, North Ridge',
    size: '22.5 Acres',
    description: 'Prime, pre-graded land development plots certified for high-density multi-residential or light commercial development. Fully integrated water, wastewater, and power utility channels already laid by Nova Construction.',
    features: ['Zoned R-4 High Density', 'Grade-A Geotechnical Certificate', 'Direct Highway Access', 'Fully Utility-Serviced', 'Favorable Topography'],
    image: landDevelopmentImage,
    featured: true
  },
  {
    id: 'prop-4',
    title: 'The Obsidian Residential Compound Plot',
    type: 'Residential',
    status: 'For Sale',
    price: 680000, // Reduced from 1,850,000
    location: 'Placid Estates Scenic Drive, South Peak',
    size: '1.2 Acres',
    description: 'Luxury residential plot overlooking the South Cascade lakes. Features pre-excavated foundation site layouts, professional soil structural reports, and a ready-to-build bespoke modern villa structural design plan.',
    features: ['Panoramic Scenic Views', 'Architectural Blueprints Included', 'Bespoke Gate-Access', 'Preserved Old-Growth Trees', 'Gis-Surveyed Borders'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', // Gorgeous open land
    featured: false
  },
  {
    id: 'prop-5',
    title: 'Meridian Heights Commercial Parcel',
    type: 'Commercial',
    status: 'For Sale',
    price: 3200000, // Reduced from 9,200,000
    location: 'Intersection 5, Commercial High Corridor',
    size: '5.4 Acres',
    description: 'Premium commercial corner lot in a rapidly growing high-income zone. Perfect for mixed-use retail centers, enterprise clinical spaces, or premium franchise hubs.',
    features: ['Major Commercial Zoning', 'High Vehicle Traffic Index', 'Dual Road Frontage', 'Comprehensive Soil Clearances', 'Tax Incentive Zone'],
    image: 'https://images.unsplash.com/photo-1590674899484-d564fa7f12e1?q=80&w=800&auto=format&fit=crop', // Land site
    featured: true
  }
];

export const EQUIPMENTS: Equipment[] = [
  {
    id: 'eq-1',
    name: 'CAT 336 Heavy Excavator',
    status: 'For Rent',
    price: 420, // Reduced from 950 per day
    category: 'Excavation',
    condition: 'Excellent',
    ratePeriod: 'Day',
    specs: {
      'Operating Weight': '81,200 lbs',
      'Net Power': '302 HP',
      'Bucket Capacity': '2.88 cubic yards',
      'Max Dig Depth': '24.6 ft'
    },
    description: 'Industry standard for power and speed in bulk earthmoving, deep excavation trench pipeline construction, and large scale structural foundations.',
    image: heavyMachineImage,
    featured: true
  },
  {
    id: 'eq-2',
    name: 'Nova Titan 120t Tower Crane',
    status: 'For Sale',
    price: 165000, // Reduced from 480,000
    category: 'Lifting',
    condition: 'Brand New',
    specs: {
      'Max Lifting Capacity': '12.0 Tons',
      'Jib Length': '196.8 ft',
      'Tip Load': '2.5 Tons',
      'Line Speed': '262 ft/min'
    },
    description: 'High-performance tower crane utilizing cutting-edge silent servo machinery. Extremely stable in high wind environments, certified for skyscrapers and dense urban infills.',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=800&auto=format&fit=crop', // Tower crane at twilight
    featured: true
  },
  {
    id: 'eq-3',
    name: 'Cummins QSK60 2000kW Genset',
    status: 'For Rent',
    price: 550, // Reduced from 1,200 per day
    category: 'Power',
    condition: 'Excellent',
    ratePeriod: 'Day',
    specs: {
      'Continuous Rating': '2000 kW',
      'Engine Model': 'QSK60-G14',
      'Fuel Type': 'Diesel / Bio-Diesel',
      'Acoustic Enclosure': '85 dBA @ 7m'
    },
    description: 'Ultra-reliable containerized silent generator designed to provide critical main base grid power for massive construction layouts or remote mining infrastructure.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop', // Premium heavy hardware genset
    featured: false
  },
  {
    id: 'eq-4',
    name: 'Volvo FMX 460 Tipper Dump Truck',
    status: 'For Sale',
    price: 62000, // Reduced from 135,000
    category: 'Hauling',
    condition: 'Excellent',
    specs: {
      'Gross Weight': '33,000 kg',
      'Engine Power': '460 HP',
      'Payload Volume': '24 cubic meters',
      'Drive Configuration': '8x4 Heavy-axle'
    },
    description: 'Brawny construction tipper built to haul massive quarry aggregate and heavy excavation rubble across unstable, unforgiving terrain with low emission output.',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop', // Gorgeous yellow heavy truck
    featured: false
  },
  {
    id: 'eq-5',
    name: 'Schwing S58 Concrete Boom Pump',
    status: 'For Rent',
    price: 850, // Reduced from 1,850 per day
    category: 'Concrete',
    condition: 'Good',
    ratePeriod: 'Day',
    specs: {
      'Vertical Reach': '187.3 ft',
      'Horizontal Reach': '173.2 ft',
      'Pipeline Diameter': '5 inches',
      'Pump Output': '213 cubic yards/hr'
    },
    description: 'Long-reach truck-mounted boom pumps ideal for delivering high-volume transit mixes to tall high-rises or complicated highway bridge deck forms.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', // Pro concrete mixer / site
    featured: true
  }
];

export const MATERIALS: Material[] = [
  {
    id: 'mat-1',
    name: 'Portland Cement Grade 52.5N',
    price: 5.90, // Reduced from 12.50
    unit: 'Bag (94 lbs)',
    category: 'Cement & Concrete',
    description: 'High-early-strength classic cement formulation recommended for structural concrete mixes, structural columns, prestressed members, and robust load bearings.',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop', // Cement site pallets
    featured: true
  },
  {
    id: 'mat-2',
    name: 'ASTM A615 Grade 60 Carbon Steel Rebar',
    price: 580, // Reduced from 1,150 per ton
    unit: 'Ton',
    category: 'Structural Steel',
    description: 'High tensile reinforcement steel bars. Deformed pattern guarantees supreme bounding with cast-in-place concrete under major stress curves.',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', // High-quality iron scaffolding grid
    featured: true
  },
  {
    id: 'mat-3',
    name: 'Structural Douglas Fir Timber lumber',
    price: 390, // Reduced from 840 per MBF
    unit: 'MBF (Thousand Board Feet)',
    category: 'Timber & Lumber',
    description: 'Select structural grade, kiln-dried timber lumber. Superb fiber integrity, low warping indices, ideal for structural wood framing and modular architectural walls.',
    availability: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=800&auto=format&fit=crop', // Beautiful lumber wood framing planks
    featured: false
  },
  {
    id: 'mat-4',
    name: 'Crushed Basalt Road Base Aggregate',
    price: 22, // Reduced from 45 per ton
    unit: 'Ton',
    category: 'Aggregates',
    description: 'Sieve-certified 3/4-inch crushed basalt stones with premium fines ratio, producing supreme compaction ratings for heavy-loading road bases and parking pavements.',
    availability: 'In Stock',
    image: 'https://images.unsplash.com/photo-1574621100236-d25b64cfd6af?q=80&w=800&auto=format&fit=crop', // Gorgeous gray aggregates
    featured: false
  },
  {
    id: 'mat-5',
    name: 'Nova High-Performance Liquid Asphalt Binder',
    price: 320, // Reduced from 720 per ton
    unit: 'Ton',
    category: 'Asphalt',
    description: 'Polymer-modified hot-mix asphalt binder engineered to resist high thermal cracking, moisture damage, and heavy logistics traffic channelization.',
    availability: 'On Order',
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800&auto=format&fit=crop', // Paving road engineering machinery
    featured: true
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nova Apex Highway Interchange',
    category: 'Infrastructure',
    location: 'Metro Beltways (Route 4 & Route 12)',
    year: '2025',
    description: 'Construction of a critical 4-level elevated flyover highway network to decongest eastern metro traffic. Required casting over 320 prestressed steel girder piers, massive site grading, and advanced polymer asphalt overlaying.',
    image: novaHeroBannerImage,
    stats: [
      { label: 'Structural Span', value: '4.8 Miles' },
      { label: 'Steel Utilized', value: '18,500 Tons' },
      { label: 'Completion Duration', value: '18 Months' },
      { label: 'Safety Record', value: 'Zero Incidents' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Deep Foundations - CAT 336 Excavator Fleet',
    category: 'Heavy Machinery in Action',
    location: 'Waterfront Dock Expansion District',
    year: '2026',
    description: 'Major bulk earthmoving operation implementing a coordinated fleet of heavy hydraulic excavators and automated tippers. Handled over 120,000 cubic yards of sub-sea silt removal to construct reinforced dry docks.',
    image: heavyMachineImage,
    stats: [
      { label: 'Fleet Implemented', value: '14 Heavy Units' },
      { label: 'Slab Excavation Volume', value: '120,000 cu yd' },
      { label: 'Working Depth Below Sea', value: '38 ft' },
      { label: 'Diesel Efficiency', value: 'Optimized via GPS' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Horizon Alpha Pre-Grading Subdivision',
    category: 'Land Development',
    location: 'Horizon Expansion Sector Alpha',
    year: '2025',
    description: 'Transforming 150 acres of rocky arid slopes into structured, graded R-4 development lots. Nova teams implemented laser-guided bulldozer grading, stormwater retirement channel networks, and buried deep drainage utilities.',
    image: landDevelopmentImage,
    stats: [
      { label: 'Acreage Graded', value: '150 Acres' },
      { label: 'Storm Sewers Laid', value: '12,500 linear ft' },
      { label: 'Ground Consolidation Rating', value: '98% Compaction' },
      { label: 'BIM Designed Layout', value: '100% CAD Compliant' }
    ]
  },
  {
    id: 'proj-4',
    title: 'The Meridian Corporate Skyscraper',
    category: 'Buildings & Skyscraper',
    location: 'Corporate Boulevard, Financial Center',
    year: '2024',
    description: 'Erection of a stunning 42-story commercial skyscraper utilizing a central core matrix of high-strength concrete and structural steel frame systems, featuring glass micro-mirrors that deflect 82% of incoming sun heat.',
    image: modernSkyscraperImage,
    stats: [
      { label: 'Vertical Floors', value: '42 Floors' },
      { label: 'Concrete Matrix Pour', value: '54,000 cu yd' },
      { label: 'Solar Deflection', value: '82% Rated' },
      { label: 'LEED Certified Rating', value: 'Platinum Grade' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Henderson',
    role: 'Principal Developer',
    company: 'Apex Horizon Real Estates',
    review: 'Nova Construction completed our Skyline office layout on time and strictly inside budget constraints. Their ability to deliver raw ASTM steel columns and lease reliable 120-ton crane operators simultaneously streamlined our timeline by months. Incredible professionalism.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
  },
  {
    id: 't-2',
    name: 'Seraphina Vance',
    role: 'Senior Civil Director',
    company: 'Municipal Transit Systems',
    review: 'Our elevated highway bridge expansion project required massive material logistics. Nova asphalt binders and high-grade aggregates satisfied every laboratory compaction test with zero failures. Highly recommend their logistical capabilities.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop'
  },
  {
    id: 't-3',
    name: 'Gregory Sterling',
    role: 'Managing Partner',
    company: 'Sterling Capital Holdings',
    review: 'Using Nova Construction to purchase 22.5 pre-graded acres was the smartest real estate move we made this decade. Nova had already designed the storm sewers and completed geotechnical tests. Their website also helped us structure a highly favorable construction equipment line loan.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop'
  }
];
