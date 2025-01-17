// import { useParams } from "next/navigation";

// import { Id } from "../../convex/_generated/dataModel";

// export const useWorkspaceId = () => {
//   const params = useParams();
//   return params.workspaceId as Id<"workspaces">;
// };

import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useWorkspaceId = (): Id<"workspaces"> => {
  const params = useParams();
  const workspaceId = params.workspaceId;

  // if (!workspaceId) {
  //   throw new Error("Workspace ID is missing from the URL.");
  // }

  // Cast the string to Id<"workspaces">
  return workspaceId as Id<"workspaces">;
};



