/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  type: 'Residential' | 'Commercial' | 'Land';
  status: 'For Sale' | 'For Rent';
  price: number;
  location: string;
  size: string; // e.g. "4,200 sqft" or "2.5 Acres"
  description: string;
  features: string[];
  image: string;
  featured: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  status: 'For Sale' | 'For Rent';
  price: number; // Sale price or daily rental rate
  category: string; // "Excavation", "Lifting", "Concrete", "Power", "Hauling"
  condition: 'Brand New' | 'Excellent' | 'Good';
  ratePeriod?: string; // Optional: "Day", "Week", "Month"
  specs: { [key: string]: string };
  description: string;
  image: string;
  featured: boolean;
}

export interface Material {
  id: string;
  name: string;
  price: number;
  unit: string; // e.g. "Ton", "Bag", "Pallet", "cu yd"
  category: 'Aggregates' | 'Structural Steel' | 'Cement & Concrete' | 'Timber & Lumber' | 'Asphalt';
  description: string;
  availability: 'In Stock' | 'Low Stock' | 'On Order';
  image: string;
  featured: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Heavy Machinery in Action' | 'Land Development' | 'Infrastructure' | 'Buildings & Skyscraper';
  location: string;
  year: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  image: string;
}

export interface LoanApplication {
  fullName: string;
  email: string;
  phone: string;
  loanType: 'Development' | 'Equipment purchase' | 'Land Acquisition' | 'Mortgage';
  projectCost: number;
  downPayment: number;
  loanAmount: number;
  termYears: number;
  annualIncome: number;
  employmentStatus: string;
  creditScore: 'Excellent' | 'Good' | 'Fair';
}

export interface InquiryMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  itemId?: string;
  itemType?: 'property' | 'equipment' | 'material' | 'general';
  itemName?: string;
  message: string;
  submittedAt: string;
}
