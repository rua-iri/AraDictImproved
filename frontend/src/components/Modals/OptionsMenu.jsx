import { useRef } from "react";
import Voices from "../Options/VoicesSelector";
import CustomButton from "../CustomButton";
import FontSize from "../Options/FontSizeSelector";

export default function OptionsMenu() {
  const optionsRef = useRef();

  return (
    <>
      <CustomButton
        textContent="Options"
        handleClick={() => optionsRef.current.showModal()}
      />

      <dialog ref={optionsRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Options</h3>

          <div className="divider"></div>
          <Voices />

          <div className="divider"></div>
          <FontSize />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
