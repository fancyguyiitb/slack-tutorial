"use client";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
// import UserButton from "@/features/auth/components/user-button";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Loader } from "lucide-react";

const Home = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkSpaces();

  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workSpaceId) {
      // console.log("Redirect to workspace", workSpaceId);
      router.replace(`/workspace/${workSpaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workSpaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="animate-spin size-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default Home;
