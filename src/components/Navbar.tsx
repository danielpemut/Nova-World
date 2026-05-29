/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HardHat, Compass, Percent, Layers, ShieldCheck, Mail, Menu, X, Landmark } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAssistant: () => void;
  onApplyLoan: () => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenAssistant, onApplyLoan }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'all', label: 'All Listings', icon: Layers },
    { id: 'realestate', label: 'Real Estate', icon: Compass },
    { id: 'machinery', label: 'Machinery Fleets', icon: HardHat },
    { id: 'materials', label: 'Concrete & Materials', icon: ShieldCheck },
    { id: 'gallery', label: 'Project Portfolio', icon: Landmark }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('all')}>
            <div className="bg-amber-500 text-zinc-950 p-2.5 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <HardHat size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                NOVA <span className="text-amber-500 font-medium text-lg tracking-wider">CONSTRUCTION</span>
              </span>
              <p className="text-[10px] text-zinc-500 tracking-widest uppercase font-mono">Precision Engineering</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  id={`nav-${item.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-900 border border-amber-500/30 text-amber-500'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-btn-loan"
              onClick={onApplyLoan}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-amber-400 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
            >
              <Percent size={15} />
              <span>Financing Loans</span>
            </button>
            <button
              id="nav-btn-ai"
              onClick={onOpenAssistant}
              className="px-4.5 py-2.5 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-[0_4px_14px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all duration-300 cursor-pointer"
            >
              Nova AI
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-amber-500 text-zinc-950"
            >
              AI
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800/80 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base ${
                  isActive
                    ? 'bg-zinc-900 text-amber-500 border-l-4 border-amber-500'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-2">
            <button
              onClick={() => {
                onApplyLoan();
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-zinc-800 text-sm font-medium text-amber-400 bg-zinc-900"
            >
              <Percent size={16} />
              <span>Apply for Construction Loan</span>
            </button>
            <button
              onClick={() => {
                onOpenAssistant();
                setIsOpen(false);
              }}
              className="w-full text-center py-3 rounded-lg text-sm font-semibold bg-amber-500 text-zinc-950 shadow-md"
            >
              Ask AI Constructor
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
