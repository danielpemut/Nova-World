/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { Calendar, MapPin, Grid, Shield, HardHat, LandPlot, Building2, Eye } from 'lucide-react';

export function ProjectGallery() {
  const [filter, setFilter] = useState<'all' | 'Heavy Machinery in Action' | 'Land Development' | 'Infrastructure' | 'Buildings & Skyscraper'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { id: typeof filter; label: string; icon: any }[] = [
    { id: 'all', label: 'All Portfolio', icon: Grid },
    { id: 'Heavy Machinery in Action', label: 'Machinery in Action', icon: HardHat },
    { id: 'Infrastructure', label: 'Infrastructure', icon: Shield },
    { id: 'Land Development', label: 'Land Grading', icon: LandPlot },
    { id: 'Buildings & Skyscraper', label: 'Skyscrapers & Towers', icon: Building2 }
  ];

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="space-y-10 py-4 animate-in fade-in duration-500">
      {/* Intro section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono font-semibold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Proven Engineering Feats
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Our Architectural <span className="text-amber-500 font-medium font-serif italic">Gallery</span>
        </h2>
        <p className="text-sm text-zinc-400 font-light leading-relaxed">
          From precise massive excavation earthworks to structural soaring steel skeletons, explore actual photographic case studies defining the Nova civil imprint.
        </p>
      </div>

      {/* Filter Tabs list */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                isActive
                  ? 'bg-amber-500 border-amber-500 text-zinc-950 shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                  : 'bg-zinc-900 border-zinc-805 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="group relative bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image Overlay banner */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-900">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
              
              {/* Category tag */}
              <span className="absolute top-4 left-4 text-[10px] font-semibold text-amber-500 uppercase tracking-widest bg-zinc-950/90 border border-zinc-800 px-3 py-1 rounded-md backdrop-blur">
                {project.category}
              </span>

              {/* View Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-amber-500 text-zinc-950 p-3 rounded-full shadow-lg">
                  <Eye size={20} className="stroke-[2.5]" />
                </div>
              </div>

              {/* Floating Bottom info */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-amber-500" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-amber-500" />
                    {project.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Description Text */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-zinc-950">
              <p className="text-xs text-zinc-404 font-light leading-relaxed text-zinc-400 line-clamp-2">
                {project.description}
              </p>

              {/* Stats parameters */}
              <div className="grid grid-cols-2 gap-3.5 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-900">
                {project.stats.map((stat, i) => (
                  <div key={i} className="text-left">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-xs font-bold text-white mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-300">
          <div className="w-full max-w-4xl bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-15 p-2 bg-black/60 rounded-full text-zinc-400 hover:text-white hover:bg-black/90 border border-zinc-800 transition"
            >
              Close (X)
            </button>

            <div className="overflow-y-auto flex flex-col md:flex-row h-full">
              {/* Image Column */}
              <div className="relative md:w-3/5 min-h-[250px] md:min-h-[450px] bg-zinc-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>

              {/* Details Column */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-semibold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                    {selectedProject.category}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                    {selectedProject.title}
                  </h3>

                  <div className="space-y-2 text-sm text-zinc-400 font-mono">
                    <p className="flex items-center gap-2">
                      <MapPin size={14} className="text-amber-500" />
                      <span>{selectedProject.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={14} className="text-amber-500" />
                      <span>Project Completed: {selectedProject.year}</span>
                    </p>
                  </div>

                  <hr className="border-zinc-900" />

                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technical specification indicators */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Engineering Parameters</h4>
                  <div className="grid grid-cols-2 gap-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-900">
                    {selectedProject.stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-xs font-bold text-white mt-0.5">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
