"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function ClarityAnalytics() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Clarity not initialized: NEXT_PUBLIC_CLARITY_PROJECT_ID is missing.",
        );
      }
      return;
    }
    try {
      Clarity.init(CLARITY_PROJECT_ID);
    } catch (error) {
      console.warn("Clarity failed to initialize:", error);
    }
  }, []);

  return null;
}
