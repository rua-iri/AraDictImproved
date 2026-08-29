import type { RefObject } from "react";
import { retriveHistoryList } from "../../../utils/utils.js";

interface WordHistoryProps {
  historyRef: RefObject<HTMLDialogElement>;
}

export default function WordHistory({ historyRef }: WordHistoryProps) {
  const historyList = retriveHistoryList();

  return (
    <dialog id="my_modal_2" className="modal" ref={historyRef}>
      <div className="modal-box">
        <div>Word History</div>
        {historyList.map((historyItem) => (
          <div key={historyItem.word}>
            <span>{historyItem.word}</span>
            <span>At: {new Date(historyItem.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
