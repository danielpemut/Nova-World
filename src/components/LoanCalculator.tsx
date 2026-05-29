/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Percent, Wallet, Calendar, Calculator, Check, ShieldCheck, Mail, User, Phone, Briefcase, ChevronRight } from 'lucide-react';
import { LoanApplication } from '../types';

export function LoanCalculator() {
  const [loanType, setLoanType] = useState<'Development' | 'Equipment purchase' | 'Land Acquisition' | 'Mortgage'>('Development');
  const [projectCost, setProjectCost] = useState<number>(1500000);
  const [downPayment, setDownPayment] = useState<number>(300000);
  const [termYears, setTermYears] = useState<number>(15);
  const [creditScore, setCreditScore] = useState<'Excellent' | 'Good' | 'Fair'>('Excellent');

  // Real-time calculated states
  const [apr, setApr] = useState<number>(6.2);
  const [loanAmount, setLoanAmount] = useState<number>(1200000);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Application form states
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    annualIncome: 145000,
    employmentStatus: 'Full-Time Contract',
  });

  // Automatically recalculate APR based on Credit Score and Loan Type
  useEffect(() => {
    let baseApr = 5.5;
    
    // Adjust by loan type
    if (loanType === 'Equipment purchase') baseApr = 6.0;
    if (loanType === 'Land Acquisition') baseApr = 6.8;
    if (loanType === 'Mortgage') baseApr = 5.2;

    // Adjust by credit score
    if (creditScore === 'Good') baseApr += 0.8;
    if (creditScore === 'Fair') baseApr += 1.8;

    setApr(parseFloat(baseApr.toFixed(2)));
  }, [loanType, creditScore]);

  // Handle Amortization Calculation formulas
  useEffect(() => {
    const principal = projectCost - downPayment;
    if (principal <= 0) {
      setLoanAmount(0);
      setMonthlyPayment(0);
      setTotalInterest(0);
      return;
    }

    setLoanAmount(principal);

    const monthlyRate = (apr / 100) / 12;
    const totalMonths = termYears * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / totalMonths);
      setTotalInterest(0);
      return;
    }

    // Standard mortgage amortization formula
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                    (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPaid = payment * totalMonths;
    const interest = totalPaid - principal;

    setMonthlyPayment(Math.round(payment));
    setTotalInterest(Math.round(interest));
  }, [projectCost, downPayment, termYears, apr]);

  // Handle Form Submission
  const handleLoanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantData.fullName || !applicantData.email || !applicantData.phone) {
      setErrorText('Please complete all applicant contact fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorText('');

    const payload: LoanApplication = {
      ...applicantData,
      loanType,
      projectCost,
      downPayment,
      loanAmount,
      termYears,
      creditScore
    };

    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to transmit your application. Please check network fields.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorText(err.message || 'An unexpected connection issue occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 animate-in fade-in duration-500 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Parameters Slider and Real-time Amortization Panel */}
        <div className="lg:col-span-8 bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl shadow-black/90">
          <div>
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Low-Rate Commercial Portfolios
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
              Bespoke Project <span className="text-amber-500 font-medium font-serif italic">Financing & Loans</span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1 font-light">
              Enter your parameters to model credit limits, estimated APR indexes, and dynamic monthly payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Slider Controls */}
            <div className="space-y-6">
              {/* Loan type */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Loan Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Development', 'Equipment purchase', 'Land Acquisition', 'Mortgage'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setLoanType(type);
                        if (type === 'Equipment purchase') {
                          setProjectCost(250000);
                          setDownPayment(50000);
                          setTermYears(5);
                        } else {
                          setProjectCost(1500000);
                          setDownPayment(300000);
                          setTermYears(15);
                        }
                      }}
                      className={`py-2.5 px-3 rounded-lg text-xs font-mono transition text-center border ${
                        loanType === type
                          ? 'bg-amber-500 border-amber-500 text-zinc-950 font-semibold'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Project Cost */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>TOTAL ESTIMATED COST</span>
                  <span className="text-white font-bold">${projectCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={loanType === 'Equipment purchase' ? 20000 : 100000}
                  max={loanType === 'Equipment purchase' ? 1000000 : 20000000}
                  step={loanType === 'Equipment purchase' ? 10000 : 50000}
                  value={projectCost}
                  onChange={(e) => {
                    const cost = parseInt(e.target.value);
                    setProjectCost(cost);
                    if (downPayment > cost) setDownPayment(Math.round(cost * 0.2));
                  }}
                  className="w-full accent-amber-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider Down Payment */}
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>DOWN PAYMENT</span>
                  <span className="text-white font-bold">${downPayment.toLocaleString()} ({Math.round((downPayment / projectCost) * 100)}%)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.round(projectCost * 0.7)}
                  step={loanType === 'Equipment purchase' ? 5000 : 25000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Term Years & Credit Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Term Duration</label>
                  <select
                    value={termYears}
                    onChange={(e) => setTermYears(parseInt(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white py-2.5 px-3.5 text-xs font-mono outline-none focus:border-amber-500"
                  >
                    {[5, 10, 15, 20, 30].map(yr => (
                      <option key={yr} value={yr}>{yr} Years</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Credit Score</label>
                  <select
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white py-2.5 px-3.5 text-xs font-mono outline-none focus:border-amber-500"
                  >
                    <option value="Excellent">Excellent (750+)</option>
                    <option value="Good">Good (680 - 749)</option>
                    <option value="Fair">Fair (600 - 679)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Live Formula Display Amortization Column */}
            <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-900 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <Calculator size={14} className="text-amber-500" />
                  <span>Financing Estimation</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-500">ESTIMATED MONTHLY DUES</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-tight">
                    ${monthlyPayment.toLocaleString()}
                    <span className="text-xs font-light text-zinc-400 uppercase ml-1.5">/ mo</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 border-t border-zinc-900/60 pt-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Loan Amount:</span>
                  <span className="text-white font-semibold">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Calculated APR:</span>
                  <span className="text-amber-400 font-bold">{apr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Interest payable:</span>
                  <span className="text-white font-semibold">${totalInterest.toLocaleString()}</span>
                </div>
                <hr className="border-zinc-900" />
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 font-bold">Total Amortization:</span>
                  <span className="text-white font-extrabold">${(loanAmount + totalInterest).toLocaleString()}</span>
                </div>
              </div>

              {!showApplyForm && (
                <button
                  onClick={() => setShowApplyForm(true)}
                  id="btn-model-apply"
                  className="w-full cursor-pointer bg-zinc-950 text-white border border-zinc-800 text-sm font-semibold hover:border-amber-500 hover:text-amber-500 py-3.5 rounded-lg transition-all text-center flex items-center justify-center gap-2 shadow-inner"
                >
                  <span>Lock Rates & Apply Now</span>
                  <ChevronRight size={15} />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Side: Embedded Form (Conditional Drawer) */}
        <div className="lg:col-span-4 space-y-6">
          {showApplyForm ? (
            <div className="bg-zinc-950 border border-amber-500/20 rounded-2xl p-6 shadow-2xl space-y-5 relative animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Pre-Approve Loan</h3>
                  <p className="text-xs font-mono text-amber-400 mt-0.5">Application: {loanType}</p>
                </div>
                <button
                  onClick={() => setShowApplyForm(false)}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline"
                >
                  Close Form
                </button>
              </div>

              {isSuccess ? (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/30 rounded-xl text-center space-y-4 py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Application Recorded</h4>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      Your loan query ID has been pre-validated under code <strong>NV-L-{Math.floor(Math.random()*8999)+1000}</strong>. Our commercial lending desk will call you dynamically.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setShowApplyForm(false);
                    }}
                    className="text-xs text-amber-500 underline font-mono cursor-pointer"
                  >
                    Adjust parameters
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoanSubmit} className="space-y-4">
                  {errorText && (
                    <div className="p-2.5 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                      {errorText}
                    </div>
                  )}

                  {/* Applicant Name */}
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">Applicant Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-3 text-zinc-500" />
                      <input
                        type="text"
                        required
                        placeholder="Markus Henderson"
                        value={applicantData.fullName}
                        onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 pl-9 pr-3 py-2.5 rounded-lg text-xs text-white outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Applicant Contact */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">Business Mail *</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-3 text-zinc-500" />
                        <input
                          type="email"
                          required
                          placeholder="m.henderson@company.com"
                          value={applicantData.email}
                          onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 pl-9 pr-3 py-2.5 rounded-lg text-xs text-white outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">Phone *</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-3 text-zinc-500" />
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 722-1090"
                          value={applicantData.phone}
                          onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 pl-9 pr-3 py-2.5 rounded-lg text-xs text-white outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">Annual Income ($)</label>
                      <input
                        type="number"
                        value={applicantData.annualIncome}
                        onChange={(e) => setApplicantData({ ...applicantData, annualIncome: parseInt(e.target.value) || 0 })}
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 rounded-lg text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">Entity Type</label>
                      <select
                        value={applicantData.employmentStatus}
                        onChange={(e) => setApplicantData({ ...applicantData, employmentStatus: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-white py-2.5 px-3 text-xs outline-none focus:border-amber-500"
                      >
                        <option value="LLC / Corporate">LLC / Corporate</option>
                        <option value="Sole Proprietor">Sole Proprietor</option>
                        <option value="Developer Consortium">Consortium</option>
                        <option value="Individual Builder">Individual</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-500 leading-relaxed leading-normal">
                    By submitting, you certify these records are legitimate and authorize Nova Amortization Desk to execute sub-soil, financial, and title checks matching your loan target.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer py-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={14} />
                        <span>Pre-Approve Loan Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 text-zinc-400 space-y-4">
              <h3 className="text-white font-semibold text-sm tracking-wide">Amortization Guidelines</h3>
              <ul className="space-y-3.5 text-xs text-zinc-400 font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span><strong>Development Rates</strong>: Formulated for greenfield subdivisions and multi-family construction models. Requires 20% down.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span><strong>Equipment Financing</strong>: Leases machinery with shorter durations (5-10 yrs) with CAT or Volvo titles serving as primary collateral.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span><strong>Credit Index</strong>: Borrowers maintaining credit indices over 750 achieve 1.8% average deductions on core financing rates.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
