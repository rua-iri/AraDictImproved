import type { RefObject } from "react";
import { retriveHistoryList } from "../../../utils/utils.js";

interface WordHistoryProps {
  historyRef: RefObject<HTMLDialogElement>;
}

export default function WordHistory({ historyRef }: WordHistoryProps) {
  const historyList = retriveHistoryList();

  return (
    <dialog className="modal" ref={historyRef}>
      <div className="modal-box">

        <h3 className="font-bold text-lg font-serif">Word History</h3>

        <div className="divider"></div>

        {historyList.length === 0 ? (
          <p className="text-center text-base-content/50 py-6 text-sm">
            No words looked up yet
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {historyList.map((historyItem) => (
              <li
                key={historyItem.word}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-base-200 border border-base-300"
              >
                <span
                  dir="rtl"
                  className="text-lg font-semibold text-base-content"
                >
                  {historyItem.word}
                </span>
                <span className="text-xs text-base-content/50">
                  {new Date(historyItem.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
