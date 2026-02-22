"use client";

import { useState, useCallback } from "react";
import { AAR_SECTIONS, EMAIL_RECIPIENTS, type FormData } from "@/lib/constants";
import { SectionCard } from "./SectionCard";

const TOTAL_STEPS = 10; // mission details + 7 sections + review + confirmation

function getDefaultDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const initialFormData: FormData = {
  date: getDefaultDate(),
  pilotName: "",
  hoistOperator: "",
  crewMembers: "",
  sections: {},
};

export function AARForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback(
    (newStep: number) => {
      setAnimKey((k) => k + 1);
      setStep(newStep);
    },
    []
  );

  const next = useCallback(() => goTo(step + 1), [step, goTo]);
  const prev = useCallback(() => goTo(step - 1), [step, goTo]);

  const updateField = useCallback(
    (field: keyof Omit<FormData, "sections">, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateSection = useCallback((sectionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: { ...prev.sections, [sectionId]: value },
    }));
  }, []);

  const canProceedFromMissionDetails =
    formData.date && formData.pilotName.trim() && formData.hoistOperator.trim();

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/submit-aar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      goTo(9); // confirmation step
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...initialFormData, date: getDefaultDate() });
    goTo(0);
    setError(null);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${m}/${d}/${y}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <header className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700 rounded-lg px-4 py-2 mb-2">
          <span className="text-2xl" role="img" aria-label="helicopter">
            🚁
          </span>
          <span className="font-mono font-bold text-rescue-red text-lg tracking-wider">
            RESCUE 10
          </span>
        </div>
        <p className="text-sm text-slate-400 font-mono">
          Maui County Fire Department — Helicopter Operations
        </p>
      </header>

      {/* Progress bar */}
      {step < 9 && (
        <div className="flex gap-1 mb-6">
          {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-rescue-red" : "bg-navy-700"
              }`}
            />
          ))}
        </div>
      )}

      {/* Step content */}
      <div key={animKey} className="animate-fade-in">
        {/* Step 0: Mission Details */}
        {step === 0 && (
          <SectionCard title="Mission Details">
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                  Date of Mission <span className="text-rescue-red">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rescue-red transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                  Pilot Name <span className="text-rescue-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pilotName}
                  onChange={(e) => updateField("pilotName", e.target.value)}
                  placeholder="Enter pilot name"
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rescue-red transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                  Hoist Operator <span className="text-rescue-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.hoistOperator}
                  onChange={(e) => updateField("hoistOperator", e.target.value)}
                  placeholder="Enter hoist operator name"
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rescue-red transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                  Rescue Techs / Crew Members
                </label>
                <input
                  type="text"
                  value={formData.crewMembers}
                  onChange={(e) => updateField("crewMembers", e.target.value)}
                  placeholder="Enter rescue tech names"
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rescue-red transition-colors"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={next}
                disabled={!canProceedFromMissionDetails}
                className="w-full bg-rescue-red hover:bg-rescue-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
              >
                Continue
              </button>
            </div>
          </SectionCard>
        )}

        {/* Steps 1–7: AAR Sections */}
        {step >= 1 && step <= 7 && (
          <SectionCard
            title={`${AAR_SECTIONS[step - 1].icon} ${AAR_SECTIONS[step - 1].title}`}
            badge={`Section ${step} of 7`}
          >
            <p className="text-slate-400 text-sm mb-4">
              {AAR_SECTIONS[step - 1].description}
            </p>
            <textarea
              value={formData.sections[AAR_SECTIONS[step - 1].id] || ""}
              onChange={(e) =>
                updateSection(AAR_SECTIONS[step - 1].id, e.target.value)
              }
              placeholder="Enter your notes here..."
              rows={8}
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rescue-red transition-colors resize-y min-h-[200px]"
            />
            <div className="mt-6 flex gap-3">
              <button
                onClick={prev}
                className="flex-1 bg-navy-700 hover:bg-navy-600 text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
              >
                Back
              </button>
              <button
                onClick={next}
                className="flex-1 bg-rescue-red hover:bg-rescue-red-dark text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
              >
                {step === 7 ? "Review" : "Continue"}
              </button>
            </div>
          </SectionCard>
        )}

        {/* Step 8: Review & Submit */}
        {step === 8 && (
          <SectionCard title="Review & Submit">
            <div className="space-y-4">
              {/* Mission Details Summary */}
              <div className="bg-navy-900 border border-navy-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    Mission Details
                  </h3>
                  <button
                    onClick={() => goTo(0)}
                    className="text-rescue-red text-sm font-medium hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-slate-400">Date:</span>{" "}
                    {formatDate(formData.date)}
                  </p>
                  <p>
                    <span className="text-slate-400">Pilot:</span>{" "}
                    {formData.pilotName}
                  </p>
                  <p>
                    <span className="text-slate-400">Hoist Operator:</span>{" "}
                    {formData.hoistOperator}
                  </p>
                  {formData.crewMembers && (
                    <p>
                      <span className="text-slate-400">Crew:</span>{" "}
                      {formData.crewMembers}
                    </p>
                  )}
                </div>
              </div>

              {/* Section Summaries */}
              {AAR_SECTIONS.map((section, i) => (
                <div
                  key={section.id}
                  className="bg-navy-900 border border-navy-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      {section.icon} {i + 1}. {section.title}
                    </h3>
                    <button
                      onClick={() => goTo(i + 1)}
                      className="text-rescue-red text-sm font-medium hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {formData.sections[section.id] || (
                      <span className="text-slate-500 italic">
                        No notes entered
                      </span>
                    )}
                  </p>
                </div>
              ))}

              {/* Recipients */}
              <div className="bg-navy-900 border border-navy-700 rounded-lg p-4">
                <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Email Recipients
                </h3>
                <ul className="text-sm space-y-1">
                  {EMAIL_RECIPIENTS.map((email) => (
                    <li key={email} className="text-slate-300">
                      {email}
                    </li>
                  ))}
                </ul>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={prev}
                className="flex-1 bg-navy-700 hover:bg-navy-600 text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-rescue-red hover:bg-rescue-red-dark disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
              >
                {submitting ? "Submitting..." : "Submit AAR"}
              </button>
            </div>
          </SectionCard>
        )}

        {/* Step 9: Confirmation */}
        {step === 9 && (
          <SectionCard title="AAR Submitted">
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-lg text-slate-300 mb-2">
                Your After Action Review has been submitted successfully.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                A PDF report has been emailed to all recipients.
              </p>
              <button
                onClick={resetForm}
                className="bg-rescue-red hover:bg-rescue-red-dark text-white font-semibold py-3.5 px-8 rounded-lg transition-colors text-base"
              >
                Start New AAR
              </button>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
