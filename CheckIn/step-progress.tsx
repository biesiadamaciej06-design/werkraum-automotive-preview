"use client";

import { motion } from "framer-motion";

type Step = {
  id: string;
  number: number;
  title: string;
};

type StepProgressProps = {
  currentStep: number;
  steps: Step[];
};

export function StepProgress({ currentStep, steps }: StepProgressProps) {
  return (
    <div className="glass-panel rounded-[30px] p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isComplete = step.number < currentStep;

          return (
            <div key={step.id} className="flex flex-1 items-center gap-4">
              <div className="relative flex items-center gap-4">
                <motion.div
                  animate={{
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(210,184,148,0.3), 0 0 24px rgba(210,184,148,0.18)"
                      : "0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium transition ${
                    isActive
                      ? "border-champagne/50 bg-champagne/14 text-champagne"
                      : isComplete
                        ? "border-champagne/35 bg-champagne/10 text-white"
                        : "border-white/10 bg-white/[0.04] text-white/55"
                  }`}
                >
                  {step.number}
                </motion.div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Schritt</p>
                  <p className={`text-sm ${isActive ? "text-white" : "text-white/62"}`}>{step.title}</p>
                </div>
              </div>

              {index < steps.length - 1 ? (
                <div className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(210,184,148,0.3),rgba(255,255,255,0.05))] md:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
