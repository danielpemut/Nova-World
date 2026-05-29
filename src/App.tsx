/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PROPERTIES, EQUIPMENTS, MATERIALS, TESTIMONIALS } from './data';
import { Property, Equipment, Material } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectGallery } from './components/ProjectGallery';
import { LoanCalculator } from './components/LoanCalculator';
import { InquiryForm } from './components/InquiryForm';
import { AIAssistant } from './components/AIAssistant';
import novaHeroBanner from './assets/images/nova_hero_banner_1780016349217.png';
import { 
  Search, SlidersHorizontal, HardHat, Compass, ShieldCheck, Landmark, 
  MapPin, Clock, Award, Users, Warehouse, Activity, Star, FileText, 
  CornerDownRight, Percent, ArrowUpRight, Scale, Info, MessageSquareCode,
  Sparkles, Check, Phone, ArrowRight, Wrench, Package, ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Search and Filter states
  const [keyword, setKeyword] = useState<string>('');
  const [filterPriceRange, setFilterPriceRange] = useState<number>(50000000);
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [filterMaterialCategory, setFilterMaterialCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'For Sale' | 'For Rent'>('all');

  // Modals operations
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [currentInquiry, setCurrentInquiry] = useState<{
    id: string;
    name: string;
    type: 'property' | 'equipment' | 'material' | 'general';
  } | null>(null);

  const [chatOpen, setChatOpen] = useState<boolean>(false);

  // Clear all filters
  const handleResetFilters = () => {
    setKeyword('');
    setFilterPriceRange(50000000);
    setFilterCondition('all');
    setFilterMaterialCategory('all');
    setFilterStatus('all');
  };

  // Memoized Catalog Filtration
  const matchedRealEstates = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchKey = p.title.toLowerCase().includes(keyword.toLowerCase()) || 
                       p.location.toLowerCase().includes(keyword.toLowerCase()) ||
                       p.type.toLowerCase().includes(keyword.toLowerCase());
      const matchPrice = p.price <= filterPriceRange;
      const matchStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchKey && matchPrice && matchStatus;
    });
  }, [keyword, filterPriceRange, filterStatus]);

  const matchedEquipments = useMemo(() => {
    return EQUIPMENTS.filter(e => {
      const matchKey = e.name.toLowerCase().includes(keyword.toLowerCase()) || 
                       e.category.toLowerCase().includes(keyword.toLowerCase()) ||
                       e.description.toLowerCase().includes(keyword.toLowerCase());
      const matchPrice = e.price <= filterPriceRange;
      const matchStatus = filterStatus === 'all' || e.status === filterStatus;
      const matchCond = filterCondition === 'all' || e.condition === filterCondition;
      return matchKey && matchPrice && matchStatus && matchCond;
    });
  }, [keyword, filterPriceRange, filterStatus, filterCondition]);

  const matchedMaterials = useMemo(() => {
    return MATERIALS.filter(m => {
      const matchKey = m.name.toLowerCase().includes(keyword.toLowerCase()) || 
                       m.description.toLowerCase().includes(keyword.toLowerCase()) ||
                       m.category.toLowerCase().includes(keyword.toLowerCase());
      const matchPrice = m.price <= filterPriceRange;
      const matchCat = filterMaterialCategory === 'all' || m.category === filterMaterialCategory;
      return matchKey && matchPrice && matchCat;
    });
  }, [keyword, filterPriceRange, filterMaterialCategory]);

  // Featured lists
  const featuredProperties = PROPERTIES.filter(p => p.featured);
  const featuredEquipments = EQUIPMENTS.filter(e => e.featured);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Floating Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAssistant={() => setChatOpen(true)}
        onApplyLoan={() => setActiveTab('loans')}
      />

      {/* Main Content Areas */}
      {activeTab === 'loans' ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoanCalculator />
        </section>
      ) : activeTab === 'gallery' ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProjectGallery />
        </section>
      ) : (
        <>
          {/* Welcome Screen Hero Banner */}
          <div className="relative overflow-hidden border-b border-zinc-900 bg-zinc-950 pb-20 pt-16 sm:pb-28 lg:pb-36 lg:pt-24 text-left">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950" />
            
            {/* Ambient Background Grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Core Hero Branding Slogan */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-amber-500 bg-amber-500/15 border border-amber-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>PREMIUM CIVIL ENGINEERING & LOGISTICS</span>
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                  ENGINEERING THE <br />
                  <span className="text-amber-500 font-serif font-medium italic">FUTURE</span> ARCHITECTURE
                </h1>
                
                <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl leading-relaxed">
                  Nova Construction designs infrastructure, rents structural CAT heavy excavation machinery fleets, supplies ASTM aggregates, and structures secure mortgage pipelines for developers.
                </p>

                {/* Main CTA Links */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('gallery')}
                    id="btn-hero-portfolio"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-505 bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition duration-300 cursor-pointer"
                  >
                    <span>View Projects Gallery</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => setActiveTab('loans')}
                    id="btn-hero-loans"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-805 bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-amber-400 font-bold transition duration-300 cursor-pointer"
                  >
                    <span>Pre-Approve Construction Loan</span>
                    <Percent size={15} />
                  </button>
                </div>

                {/* Achievements stats ribbons */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-900">
                  <div className="text-left">
                    <p className="text-2xl font-black text-white">$1.2B+</p>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Properties Molded</p>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-black text-amber-500">140+</p>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Fleets Active</p>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-black text-white">OSHA</p>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">OSHA Gold Standard</p>
                  </div>
                </div>

              </div>

              {/* Graphic Column: Render our generated Hero Photo */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-zinc-805 opacity-20 blur-xl group-hover:opacity-35 transition duration-500" />
                <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl bg-zinc-900">
                  <img
                    src={novaHeroBanner}
                    alt="Sleek Modern Construction Site Scaffold"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Absolute widget overlay details */}
                  <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur p-4 rounded-xl border border-zinc-850 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[10px] text-zinc-500 font-mono">PRIMARY SITE CASE</p>
                      <h4 className="text-xs font-bold text-white">Nova Apex Flyovers</h4>
                    </div>
                    <span className="text-[10px] bg-amber-500 text-zinc-950 font-mono font-bold px-2 py-1 rounded">
                      ACTIVE - 2026
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Filter Search console */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 text-left">
            <div className="bg-zinc-950 border border-zinc-850 rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Text inquiry block */}
                <div className="relative w-full md:flex-1">
                  <Search size={18} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search heavy excavators, raw steel, residential lands, locations..."
                    className="w-full pl-11 pr-4 py-3 bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-xl text-sm outline-none focus:border-amber-500 transition text-white"
                  />
                </div>

                {/* Operation layout trigger buttons */}
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4.5 py-3 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      activeTab === 'all' 
                        ? 'bg-amber-500 border-amber-500 text-zinc-950 shadow-md' 
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    All Directories
                  </button>
                  <button
                    onClick={() => setActiveTab('realestate')}
                    className={`px-4.5 py-3 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      activeTab === 'realestate' 
                        ? 'bg-amber-500 border-amber-500 text-zinc-950 shadow-md' 
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    Real Estate
                  </button>
                  <button
                    onClick={() => setActiveTab('machinery')}
                    className={`px-4.5 py-3 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      activeTab === 'machinery' 
                        ? 'bg-amber-500 border-amber-500 text-zinc-950 shadow-md' 
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    Machinery Sale/Rent
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`px-4.5 py-3 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      activeTab === 'materials' 
                        ? 'bg-amber-500 border-amber-500 text-zinc-950 shadow-md' 
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    Raw Materials
                  </button>
                </div>

              </div>

              {/* Sub filters details toggles (Status purchase/rent & condition) */}
              <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-4 text-zinc-450 text-zinc-400">
                  
                  {/* status tag */}
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-650 text-zinc-500">Financing Structure:</span>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="bg-zinc-900 border border-zinc-800 py-1.5 px-3 rounded text-xs text-white uppercase"
                    >
                      <option value="all">Sale & Rental Both</option>
                      <option value="For Sale">Direct Sale Only</option>
                      <option value="For Rent">Lease/Rentals Only</option>
                    </select>
                  </div>

                  {/* Machinery Condition filter */}
                  {activeTab === 'machinery' && (
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">Condition:</span>
                      <select
                        value={filterCondition}
                        onChange={(e) => setFilterCondition(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 py-1.5 px-3 rounded text-xs text-white uppercase"
                      >
                        <option value="all">All Conditions</option>
                        <option value="Brand New">Brand New</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good/Used</option>
                      </select>
                    </div>
                  )}

                  {/* Material Category filter */}
                  {activeTab === 'materials' && (
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 font-mono">Materials Category:</span>
                      <select
                        value={filterMaterialCategory}
                        onChange={(e) => setFilterMaterialCategory(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 py-1.5 px-3 rounded text-xs text-white"
                      >
                        <option value="all">All Category Classes</option>
                        <option value="Aggregates">Aggregates (Stone/Basalt)</option>
                        <option value="Structural Steel">Reinforced Structures</option>
                        <option value="Cement & Concrete">Cast Portland Cement</option>
                        <option value="Timber & Lumber">Douglas Fir framing</option>
                        <option value="Asphalt">Hot-Mix binders</option>
                      </select>
                    </div>
                  )}

                  {/* Range Bar */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-zinc-500">Limit Price Index:</span>
                    <span className="text-amber-400 font-semibold">${filterPriceRange.toLocaleString()}</span>
                  </div>

                </div>

                <button 
                  onClick={handleResetFilters} 
                  className="text-zinc-500 hover:text-white transition underline underline-offset-4 decoration-zinc-800 hover:decoration-amber-500 p-1 rounded font-normal"
                >
                  Reset Parameters
                </button>
              </div>

            </div>
          </section>

          {/* Directory Listings grids */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
            
            {/* Real Estate Section */}
            {(activeTab === 'all' || activeTab === 'realestate') && (
              <div className="space-y-8 mb-16">
                <div className="flex justify-between items-end border-b border-zinc-900 pb-3">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                      <Compass className="text-amber-500" size={22} />
                      <span>Commercial Real Estate & Premium Lands</span>
                    </h2>
                    <p className="text-xs text-zinc-400 font-light mt-1">High-value skyscraper layouts, subdivisions, and industrial depots surveyed for build-out.</p>
                  </div>
                  {activeTab === 'all' && (
                    <button onClick={() => setActiveTab('realestate')} className="text-xs text-amber-500 font-mono hover:underline flex items-center gap-1">
                      <span>Expand Listings</span>
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>

                {matchedRealEstates.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-900/30 rounded-xl border border-zinc-900 text-zinc-500 text-xs">
                    No Real estate matching current search parameters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                    {matchedRealEstates.map((property) => (
                      <div
                        key={property.id}
                        className="group bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300"
                      >
                        <div className="relative h-52 bg-zinc-900 overflow-hidden">
                          <img
                            src={property.image}
                            alt={property.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          />
                          <span className="absolute top-3 left-3 bg-zinc-950/95 border border-zinc-805 text-amber-500 text-[10px] font-bold py-1 px-2.5 rounded uppercase tracking-wider">
                            {property.type}
                          </span>
                          <span className="absolute top-3 right-3 bg-amber-500 text-zinc-950 text-[10px] font-extrabold py-1 px-2.5 rounded uppercase tracking-wider">
                            {property.status}
                          </span>
                        </div>

                        <div className="p-5 space-y-3.5">
                          <div>
                            <p className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                              <MapPin size={10} className="text-amber-500" />
                              <span>{property.location}</span>
                            </p>
                            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mt-1.5 leading-tight">
                              {property.title}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                            <span className="text-zinc-500">Asset Dimensions:</span>
                            <span className="text-zinc-300 font-semibold">{property.size}</span>
                          </div>

                          <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
                            {property.description}
                          </p>

                          <hr className="border-zinc-900" />

                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-[9px] font-mono text-zinc-500">LIST PRICE INDEX</p>
                              <p className="text-lg font-black text-amber-500">
                                ${property.price.toLocaleString()}
                                {property.status === 'For Rent' && <span className="text-xs font-light text-zinc-400 ml-0.5">/ mo</span>}
                              </p>
                            </div>
                            
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setSelectedProduct(property)}
                                className="px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white cursor-pointer"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => setCurrentInquiry({
                                  id: property.id,
                                  name: property.title,
                                  type: 'property'
                                })}
                                className="px-3.5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer"
                              >
                                Quote
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Heavy Machinery rentals Section */}
            {(activeTab === 'all' || activeTab === 'machinery') && (
              <div className="space-y-8 mb-16">
                <div className="flex justify-between items-end border-b border-zinc-900 pb-3">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                      <HardHat className="text-amber-500" size={22} />
                      <span>Industrial Heavy Machinery Fleets</span>
                    </h2>
                    <p className="text-xs text-zinc-400 font-light mt-1">High-capacity crawler excavators, silent cranes, and concrete placing units on lease.</p>
                  </div>
                  {activeTab === 'all' && (
                    <button onClick={() => setActiveTab('machinery')} className="text-xs text-amber-500 font-mono hover:underline flex items-center gap-1">
                      <span>Expand Fleets</span>
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>

                {matchedEquipments.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-900/30 rounded-xl border border-zinc-900 text-zinc-500 text-xs">
                    No Fleet units matching search parameters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                    {matchedEquipments.map((machinery) => (
                      <div
                        key={machinery.id}
                        className="group bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300"
                      >
                        <div className="relative h-52 bg-zinc-900 overflow-hidden">
                          <img
                            src={machinery.image}
                            alt={machinery.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          />
                          <span className="absolute top-3 left-3 bg-zinc-950/95 border border-zinc-805 text-amber-500 text-[10px] font-bold py-1 px-2.5 rounded uppercase tracking-wider">
                            {machinery.category}
                          </span>
                          <span className="absolute top-3 right-3 bg-amber-500 text-zinc-950 text-[10px] font-extrabold py-1 px-2.5 rounded uppercase tracking-wider">
                            {machinery.status}
                          </span>
                        </div>

                        <div className="p-5 space-y-3.5">
                          <div>
                            <p className="text-[10px] font-mono text-amber-500">
                              OSHA CLASS CONDITION: <strong className="text-white ml-1 text-[11px] font-bold">{machinery.condition}</strong>
                            </p>
                            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mt-1.5 leading-tight">
                              {machinery.name}
                            </h3>
                          </div>

                          {/* technical bullet specs preview */}
                          <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-900 text-xs text-zinc-400 font-mono space-y-1">
                            {Object.entries(machinery.specs).slice(0, 2).map(([k, v]) => (
                              <div key={k} className="flex justify-between">
                                <span className="text-zinc-500">{k}:</span>
                                <span className="text-zinc-300 font-semibold">{v}</span>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-zinc-450 text-zinc-400 font-light leading-relaxed line-clamp-2">
                            {machinery.description}
                          </p>

                          <hr className="border-zinc-900" />

                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-[9px] font-mono text-zinc-500">DAILY LEASE RANGE</p>
                              <p className="text-lg font-black text-amber-500">
                                ${machinery.price.toLocaleString()}
                                {machinery.status === 'For Rent' && <span className="text-xs font-light text-zinc-400 ml-0.5">/ day</span>}
                              </p>
                            </div>
                            
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setSelectedProduct(machinery)}
                                className="px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white cursor-pointer"
                              >
                                Specs
                              </button>
                              <button
                                onClick={() => setCurrentInquiry({
                                  id: machinery.id,
                                  name: machinery.name,
                                  type: 'equipment'
                                })}
                                className="px-3.5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer"
                              >
                                Reserve
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Aggregates and Steel materials section */}
            {(activeTab === 'all' || activeTab === 'materials') && (
              <div className="space-y-8 mb-16">
                <div className="flex justify-between items-end border-b border-zinc-900 pb-3">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                      <ShieldCheck className="text-amber-500" size={22} />
                      <span>Civil Engineering Raw Materials</span>
                    </h2>
                    <p className="text-xs text-zinc-400 font-light mt-1">Sieve tested aggregates, Grade 60 carbon raw reinforcement steel, and solid Portland concrete.</p>
                  </div>
                  {activeTab === 'all' && (
                    <button onClick={() => setActiveTab('materials')} className="text-xs text-amber-500 font-mono hover:underline flex items-center gap-1">
                      <span>Expand Inventory</span>
                      <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>

                {matchedMaterials.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-900/30 rounded-xl border border-zinc-900 text-zinc-500 text-xs">
                    No Raw Materials match criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                    {matchedMaterials.map((material) => (
                      <div
                        key={material.id}
                        className="group bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300"
                      >
                        <div className="relative h-52 bg-zinc-900 overflow-hidden">
                          <img
                            src={material.image}
                            alt={material.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          />
                          <span className="absolute top-3 left-3 bg-zinc-950/95 border border-zinc-805 text-amber-500 text-[10px] font-bold py-1 px-2.5 rounded uppercase tracking-wider">
                            {material.category}
                          </span>
                          
                          {/* Stock color tagging */}
                          <span className={`absolute top-3 right-3 text-[10px] font-extrabold py-1 px-2.5 rounded uppercase tracking-wider ${
                            material.availability === 'In Stock' 
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/10 border border-amber-500/20 text-amber-500'
                          }`}>
                            {material.availability}
                          </span>
                        </div>

                        <div className="p-5 space-y-3.5">
                          <div>
                            <p className="text-[10px] font-mono text-zinc-500">ASTM CERTIFIED LOGISTICS</p>
                            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mt-1.5 leading-tight">
                              {material.name}
                            </h3>
                          </div>

                          <p className="text-xs text-zinc-440 text-zinc-400 font-light leading-relaxed line-clamp-2">
                            {material.description}
                          </p>

                          <hr className="border-zinc-900" />

                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-[9px] font-mono text-zinc-500">WHOLESALE INDEX PRICE</p>
                              <p className="text-lg font-black text-amber-500">
                                ${material.price.toLocaleString()}
                                <span className="text-xs font-light text-zinc-400 ml-1">/ {material.unit}</span>
                              </p>
                            </div>
                            
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setSelectedProduct(material)}
                                className="px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white cursor-pointer"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => setCurrentInquiry({
                                  id: material.id,
                                  name: material.name,
                                  type: 'material'
                                })}
                                className="px-3.5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer"
                              >
                                Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>

          {/* Featured items Showcase Highlights slider */}
          <section className="bg-zinc-900/30 border-y border-zinc-900 py-16 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Nova Exclusives
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                  Featured Industrial <span className="text-amber-500 font-serif font-semibold italic">Assets</span>
                </h2>
                <p className="text-sm text-zinc-400 font-light">
                  Hand-selected high performance land subdivisions and tower crane mechanics currently active.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Featured Properties */}
                <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 h-44 rounded-xl overflow-hidden bg-zinc-900 shadow-lg relative">
                    <img 
                      src={PROPERTIES[0].image} 
                      alt="Featured Commercial Plot" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-zinc-950 text-[9px] font-black px-2 py-0.5 rounded font-mono">
                      HOT PROPERTY
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-zinc-500">{PROPERTIES[0].location}</p>
                      <h4 className="text-base font-bold text-white">{PROPERTIES[0].title}</h4>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">{PROPERTIES[0].description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-amber-500">${PROPERTIES[0].price.toLocaleString()}</span>
                      <button 
                        onClick={() => setSelectedProduct(PROPERTIES[0])}
                        className="text-xs text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-2 rounded-lg cursor-pointer font-light"
                      >
                        Inspect Plot
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Featured Equipment */}
                <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 h-44 rounded-xl overflow-hidden bg-zinc-900 shadow-lg relative">
                    <img 
                      src={EQUIPMENTS[0].image} 
                      alt="Featured Backhoe" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-zinc-950 text-[9px] font-black px-2 py-0.5 rounded font-mono">
                      FLEET SPECIAL
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-zinc-500">EXCAVATION - RENTAL</p>
                      <h4 className="text-base font-bold text-white">{EQUIPMENTS[0].name}</h4>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">{EQUIPMENTS[0].description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-amber-500">${EQUIPMENTS[0].price.toLocaleString()}/day</span>
                      <button 
                        onClick={() => setSelectedProduct(EQUIPMENTS[0])}
                        className="text-xs text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-2 rounded-lg cursor-pointer font-light"
                      >
                        Inspect Specs
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Client Testimonials slider */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Corporate Endorsements
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Nova Construction <span className="text-amber-500 font-serif font-medium italic">Reviews</span>
              </h2>
              <p className="text-sm text-zinc-400 font-light">
                Listen to actual corporate developers and transit commission directors who trusted Nova for key flyovers and building works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6.5 hover:border-zinc-850 transition duration-300 flex flex-col justify-between relative shadow-xl shadow-black/80">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed italic">
                      "{t.review}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-zinc-900">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-zinc-800" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick FAQ / Loans Call out */}
          <section className="bg-zinc-950 border-t border-zinc-900 py-16 text-left">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-900/20 rounded-3xl border border-zinc-850 p-8 sm:p-12 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-40 ml-auto" />
              <div className="space-y-5">
                <span className="inline-block text-[10px] font-mono text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 rounded">Nova Financing</span>
                <h3 className="text-2xl font-black text-white tracking-tight">Need help financing land development or machinery fleets?</h3>
                <p className="text-xs text-zinc-450 text-zinc-400 font-light leading-relaxed">
                  Nova offers integrated commercial equipment leases, mortgage pipelines, and construction capital lines starting at 5.5% APR for low credit indices. Apply in under 5 minutes on our secure site portals.
                </p>
                <button
                  onClick={() => setActiveTab('loans')}
                  className="px-5 py-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Amortization Slider</span>
                  <Percent size={13} />
                </button>
              </div>
              <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-5 font-mono text-xs space-y-4">
                <p className="text-white text-xs font-bold flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                  <Activity size={14} className="text-amber-500" />
                  <span>Real-time Lending Rates Index</span>
                </p>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Commercial Mortgage:</span>
                    <span className="text-emerald-400 font-bold">4.20% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Heavy Equipment Lease:</span>
                    <span className="text-emerald-400 font-bold">5.00% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Land Acquisition:</span>
                    <span className="text-emerald-400 font-bold">5.50% APR</span>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-600 leading-normal pt-2 border-t border-zinc-900">
                  * Based on prime commercial index ratings of May 2026. Custom discounts available.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Floating Widget Toggle Trigger for Nova AI Chat */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        id="btn-chat-toggle"
        className="fixed bottom-6 right-6 z-40 bg-amber-500 hover:bg-amber-400 text-zinc-950 p-4 rounded-full shadow-[0_4px_24px_rgba(245,158,11,0.5)] transition duration-300 flex items-center justify-center cursor-pointer"
      >
        <MessageSquareCode size={24} className="stroke-[2.2]" />
      </button>

      {/* Embedded active modals logic */}
      {chatOpen && <AIAssistant onClose={() => setChatOpen(false)} />}

      <AnimatePresence>
        {currentInquiry && (
          <InquiryForm
            itemId={currentInquiry.id}
            itemName={currentInquiry.name}
            itemType={currentInquiry.type}
            onClose={() => setCurrentInquiry(null)}
          />
        )}
      </AnimatePresence>

      {/* Universal Detail Modal Drawer */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl relative block text-left">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/80 text-zinc-400 hover:text-white rounded-full transition cursor-pointer"
            >
              Close
            </button>

            <div className="relative h-60 bg-zinc-900">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name || selectedProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest bg-zinc-950 border border-zinc-805 px-2.5 py-1 rounded">
                  {selectedProduct.category || selectedProduct.type}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">
                  {selectedProduct.name || selectedProduct.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs text-zinc-450 text-zinc-450 leading-relaxed font-light">
                {selectedProduct.description}
              </p>

              {/* Technical features specs table */}
              {selectedProduct.features && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Site Provisions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features.map((feature: string, idx: number) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-850 text-zinc-300 text-[10px] py-1 px-2.5 rounded flex items-center gap-1.5 font-mono">
                        <Check size={10} className="text-amber-500 stroke-[3.0]" />
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.specs && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Specifications Parameters</h4>
                  <div className="grid grid-cols-2 gap-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900">
                    {Object.entries(selectedProduct.specs).map(([k, v]: [string, any], idx: number) => (
                      <div key={idx} className="text-xs font-mono">
                        <span className="text-zinc-550 text-zinc-500 uppercase text-[9px] tracking-wider block">{k}</span>
                        <span className="text-white font-semibold block mt-0.5">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-zinc-900 pt-5 mt-5">
                <div>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Catalog Price Rating</p>
                  <p className="text-lg font-black text-amber-500 font-mono">
                    ${selectedProduct.price.toLocaleString()}
                    {selectedProduct.status === 'For Rent' && <span className="text-xs text-zinc-500 font-light ml-0.5">/ {selectedProduct.ratePeriod || 'day'}</span>}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4.5 py-2.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white border border-transparent hover:border-zinc-850 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const name = selectedProduct.name || selectedProduct.title;
                      const type = selectedProduct.category ? 'equipment' : (selectedProduct.unit ? 'material' : 'property');
                      setCurrentInquiry({ id: selectedProduct.id, name, type });
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition cursor-pointer"
                  >
                    Inquire Quote
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Footer bar hooks */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
