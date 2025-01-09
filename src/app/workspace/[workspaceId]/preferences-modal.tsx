import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PreferenceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferenceModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success(`Workspace updated to ${value}`);
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleRemove = () => {
    removeWorkspace(
      {
        id: workspaceId,
      },
      {
        onSuccess: () => {
          toast.success(`Workspace ${value} removed`);
          router.replace("/");
        },
        onError: () => {
          toast.error("Failed to remove workspace");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace Name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename this workspace</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleEdit}>
                <Input
                  value={value}
                  disabled={isUpdatingWorkspace}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={80}
                  placeholder="Workspace name. E.g. 'Work', 'Personal', 'Home'"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isUpdatingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={isUpdatingWorkspace}>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            disabled={isRemovingWorkspace}
            onClick={handleRemove}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <p className="text-sm font-semibold">Delete Workspace</p>

            <TrashIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;