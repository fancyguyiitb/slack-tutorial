import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import useConfirm from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useNewJoinCode();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code."
  );

  const handleCopy = () => {
    //to make it work even when app hosted some place else
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    //copying the joincode to clipboard
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite Link Copied!"));
  };

  const handleNewCode = async () => {
    const okay = await confirm();
    if (!okay) {
      return;
    }
    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("New Invite Code Generated");
        },
        onError() {
          toast.error("Failed to Update Invite Code");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite People to {name}</DialogTitle>
            <DialogDescription>
              Use code below to invite people to workspace
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-3xl font-bold tracking-widest uppercase">
              {joinCode}
            </p>

            <Button variant="ghost" size="sm" onClick={handleCopy}>
              Copy Link <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isPending}
              variant="outline"
              onClick={handleNewCode}
            >
              New Code
              <RefreshCcw />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
