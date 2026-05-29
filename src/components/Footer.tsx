/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HardHat, Phone, MapPin, Mail, Clock, ShieldCheck, Award } from 'lucide-react';

export function Footer({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Branding Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('all')}>
            <div className="bg-amber-500 text-zinc-950 p-2.5 rounded-lg flex items-center justify-center">
              <HardHat size={20} className="stroke-[2.5]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              NOVA <span className="text-amber-500 font-medium text-sm tracking-widest">CONSTRUCTION</span>
            </span>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Constructing urban centers, distributing state-of-the-art heavy excavation equipment, offering ASTM-certified structural materials, and modeling modern financial loan structures.
          </p>
          <div className="flex items-center gap-2 pt-2 text-xs text-zinc-600 font-mono">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>ISO 9001:2015 & OSHA Safety Certified</span>
          </div>
        </div>

        {/* Dynamic Pages Link */}
        <div>
          <h3 className="text-white font-medium text-sm tracking-widest uppercase mb-4 font-mono">Operations</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => setActiveTab('realestate')} className="hover:text-amber-500 transition-all font-light">
                Real Estate & Lands
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('machinery')} className="hover:text-amber-500 transition-all font-light">
                Heavy Machinery Fleet
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('materials')} className="hover:text-amber-500 transition-all font-light">
                Structural raw Materials
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('gallery')} className="hover:text-amber-500 transition-all font-light">
                In-Action Project Portfolio
              </button>
            </li>
          </ul>
        </div>

        {/* Corporate Support Links */}
        <div>
          <h3 className="text-white font-medium text-sm tracking-widest uppercase mb-4 font-mono">Certifications</h3>
          <div className="space-y-4 text-xs font-mono text-zinc-500">
            <div className="flex items-start gap-2.5">
              <Award className="text-amber-500 shrink-0" size={16} />
              <div>
                <p className="text-zinc-400 text-xs">AGC Excellence Award</p>
                <p className="text-[10px] text-zinc-600">Infrastructure - 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Award className="text-amber-500 shrink-0" size={16} />
              <div>
                <p className="text-zinc-400 text-xs">LEED Platinum Standard</p>
                <p className="text-[10px] text-zinc-600">Nova Apex Tower Project</p>
              </div>
            </div>
          </div>
        </div>

        {/* Office details */}
        <div className="space-y-4">
          <h3 className="text-white font-medium text-sm tracking-widest uppercase mb-4 font-mono">Headquarters</h3>
          <ul className="space-y-3.5 text-sm font-light">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <span>450 Skyline Boulevard, Nova Tower Level 24, Metro Center</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-amber-500 shrink-0" />
              <span>+1 (800) 555-NOVA</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-amber-500 shrink-0" />
              <span>operations@novaconstruction.com</span>
            </li>
            <li className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
              <Clock size={16} className="text-amber-500/80 shrink-0" />
              <span>Mon - Fri / 07:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-zinc-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
        <p>© 2026 Nova Construction Company. All rights reserved. Built with Antigravity Intelligence.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-amber-500">Legal Terms</a>
          <a href="#" className="hover:text-amber-500">Corporate Safety Compliance</a>
          <a href="#" className="hover:text-amber-500">Sitemap Index</a>
        </div>
      </div>
    </footer>
  );
}
