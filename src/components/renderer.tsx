import Quill from "quill";
import { useEffect, useRef, useState } from "react";

interface RendererProps {
  value: string;
}

const Renderer = ({ value }: RendererProps) => {
  const [isEmpty, setisEmpty] = useState(false);
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererRef.current) return;

    const container = rendererRef.current;

    const quill = new Quill(document.createElement("div"));

    //we just wan tto render, so we need the read only mode
    quill.enable(false);

    const contents = JSON.parse(value);
    quill.setContents(contents);

    const isEmpty =
      quill
        .getText()
        .replace(/<(.|\n)*?>/g, "")
        .trim().length === 0;
    setisEmpty(isEmpty);

    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [value]);
  //in case someone just sends an image
  if (isEmpty) return null;
  return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};

export default Renderer;
