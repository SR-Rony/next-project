"use client";

import { Suspense } from "react";
import VerifyPageContent from "./VerifyPageContent"; // main component

export default function VerifyPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
