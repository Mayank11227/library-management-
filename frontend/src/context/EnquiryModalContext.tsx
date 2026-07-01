"use client";

import React, { createContext, useContext, useState } from "react";

interface EnquiryModalContextType {
  isOpen: boolean;
  openModal: (preselectedPlan?: string) => void;
  closeModal: () => void;
  preselectedPlan: string;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedPlan, setPreselectedPlan] = useState("");

  const openModal = (plan?: string) => {
    setPreselectedPlan(plan || "");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreselectedPlan("");
  };

  return (
    <EnquiryModalContext.Provider value={{ isOpen, openModal, closeModal, preselectedPlan }}>
      {children}
    </EnquiryModalContext.Provider>
  );
}

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (!context) throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
  return context;
};
