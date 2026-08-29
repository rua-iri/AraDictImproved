import { type RefObject } from "react";
import Voices from "../Options/VoicesSelector.js";
import FontSize from "../Options/FontSizeSelector.js";

type OptionsMenuProps = {
  optionsRef: RefObject<HTMLDialogElement>;
};

export default function OptionsMenu({ optionsRef }: OptionsMenuProps) {
  return (
    <dialog ref={optionsRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg font-serif">Options</h3>
        <div className="divider"></div>
        <Voices />
        <div className="divider"></div>
        <FontSize />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
