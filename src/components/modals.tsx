"use client";

import { useState, useEffect } from "react";

import { CreateWorkSpaceModal } from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //   to prevent hydration errors
  if (!mounted) return null;

  return (
    <>
      <CreateWorkSpaceModal />
    </>
  );
};
