"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  console.log(workspaceId);
  const { data } = useGetWorkspace({ id: workspaceId });

  console.log(data);

  return <div>Data: {JSON.stringify(data)}</div>;
};

export default WorkspaceIdPage;
