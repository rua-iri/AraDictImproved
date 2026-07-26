import { useAppSelector } from "../../app/hooks.js";
import type { JSX } from "react";

interface TextContainerProps {
  textContent: JSX.Element[] | undefined;
}

export default function TextContainer({ textContent }: TextContainerProps) {
  const fontSize = useAppSelector((state) => state.fontSlice.size);
  const fontSizeClass = fontSize ? `text-${fontSize}` : "";

  return (
    <div className="m-4 max-h-100 lg:max-h-160 overflow-scroll overflow-x-auto border">
      <div
        dir="rtl"
        className={`w-full p-5 text-right inline-flex flex-wrap ${fontSizeClass}`}
      >
        {textContent}
      </div>
    </div>
  );
}
