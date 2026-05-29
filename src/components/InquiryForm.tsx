/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, User, Send, CheckCircle2, X } from 'lucide-react';

interface InquiryFormProps {
  itemId?: string;
  itemName?: string;
  itemType?: 'property' | 'equipment' | 'material' | 'general';
  onClose: () => void;
}

export function InquiryForm({ itemId, itemName, itemType = 'general', onClose }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: itemName 
      ? `Hello Nova Construction team, I would like to receive an official quote, technical specifications, and availability details for "${itemName}" (${itemType}). Thank you.`
      : 'Hello Nova Construction team, I am planning a project and would like to schedule a civil engineering consultation regarding your design-build services.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          itemId,
          itemType,
          itemName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit your inquiry. Please try again.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div 
        id="inquiry-modal-card" 
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black overflow-hidden animate-in fade-in duration-300"
      >
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800 bg-zinc-900/40">
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight">
              {itemName ? 'Request Technical Details' : 'Engineering Consultation'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">
              {itemName ? `${itemType}: ${itemName}` : 'General Inquiry'}
            </p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/30">
                <CheckCircle2 size={44} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">Inquiry Transmitted Successfully</h4>
                <p className="text-sm text-zinc-400 mt-2 max-w-sm leading-relaxed">
                  Your request has been logged on the Nova Operational Dashboard. Our civil logistical coordinators will reach out to you within 4 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition"
              >
                Return to Directory
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg">
                  {errorMessage}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Logistics Officer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg text-white text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Grid Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    Email Address <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg text-white text-sm outline-none transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg text-white text-sm outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  Message Description <span className="text-amber-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your request, project site location, preferred rental periods, or raw volume of aggregates needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-zinc-900/50 border border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg text-white text-sm outline-none transition resize-none leading-relaxed"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-850 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
