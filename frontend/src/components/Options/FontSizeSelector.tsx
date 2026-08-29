import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks.js";
import { setFontSize } from "../../features/font/font.js";
import type { ChangeEvent } from "react";

type FontSizeKey = "0" | "10" | "20" | "30" | "40" | "50";

const sizesRange: Record<FontSizeKey, string> = {
  "0":  "1rem",
  "10": "1.125rem",
  "20": "1.25rem",
  "30": "1.5rem",
  "40": "1.875rem",
  "50": "2.25rem",
};

const labels = ["XS", "S", "Md", "L", "XL", "XXL"];

export default function FontSize() {
  const fontSize = useAppSelector((state) => state.fontSlice.size);
  const dispatch = useDispatch();

  function changeFontSize(event: ChangeEvent<HTMLInputElement>) {
    const key = event.currentTarget.value as FontSizeKey;
    dispatch(setFontSize(sizesRange[key]));
  }

  const currentKey =
    (Object.keys(sizesRange) as FontSizeKey[]).find(
      (key) => sizesRange[key] === fontSize,
    ) ?? "20";

  return (
    <div className="m-3 p-3 font-light">
      <h3 className="font-normal mb-2">Font Size</h3>
      <input
        type="range"
        min={0}
        max="50"
        value={currentKey}
        className="range w-full"
        step="10"
        onChange={changeFontSize}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <div className="flex w-full justify-between px-2 text-xs">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
