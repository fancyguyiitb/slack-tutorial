import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { ImageIcon, Smile } from "lucide-react";
import Hint from "./hint";

interface EditorProps {
  variant?: "create" | "update";
}

const Editor = ({ variant = "create" }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
    };

    const quill = new Quill(editorContainer, options);

    //react strict mode renders use effect twice so we need to handle the cleanup
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-l-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="Hide formatting">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="Emojis">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>

          {variant === "create" && (
            <Hint label="Add image">
              <Button
                disabled={false}
                size="iconSm"
                variant="ghost"
                onClick={() => {}}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}

          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {}}
                disabled={false}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}

          {variant === "create" && (
            <Hint label="Send">
              <Button
                disabled={false}
                onClick={() => {}}
                size="iconSm"
                className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                {" "}
                <MdSend className="size-4" />
              </Button>
            </Hint>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;
