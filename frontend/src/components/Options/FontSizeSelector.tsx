import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks.js";
import { setFontSize } from "../../features/font/font.js";
import type { ChangeEvent } from "react";

type FontSizeKey = "0" | "10" | "20" | "30" | "40" | "50";

export default function FontSize() {
  const fontSize = useAppSelector((state) => state.fontSlice.size);

  const dispatch = useDispatch();

  const sizesRange = {
    "0": "xs",
    "10": "sm",
    "20": "base",
    "30": "lg",
    "40": "xl",
    "50": "2xl",
  };

  function changeFontSize(event: ChangeEvent<HTMLInputElement>) {
    const fontSizeKey: FontSizeKey = event.currentTarget.value as FontSizeKey;
    console.log(fontSizeKey);
    dispatch(setFontSize(sizesRange[fontSizeKey as keyof typeof sizesRange]));
  }

  return (
    <div className="m-3 p-3 font-light">
      <h3 className="font-normal mb-2">Font Size</h3>
      <input
        type="range"
        min={0}
        max="50"
        value={Object.keys(sizesRange).find(
          (key) => sizesRange[key as keyof typeof sizesRange] === fontSize,
        )}
        className="range"
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
        <span>XS</span>
        <span>S</span>
        <span>Md</span>
        <span>L</span>
        <span>XL</span>
        <span>XXL</span>
      </div>
    </div>
  );
}
