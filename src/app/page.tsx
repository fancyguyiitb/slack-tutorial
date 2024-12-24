"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const Home = () => {
  const { signOut } = useAuthActions();
  return (
    <div>
      <Button onClick={() => signOut()}>Sign OUT</Button>
    </div>
  );
};

export default Home;
