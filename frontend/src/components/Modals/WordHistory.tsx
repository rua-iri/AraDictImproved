import { type RefObject, useState } from "react";
import { retriveHistoryList } from "../../../utils/utils.js";
import { fetchWordMeanings } from "../../../utils/fetcher.js";
import type { HistoryWord, WordMeaning } from "../../types/types.js";
import { localStorageKeys } from "../../constants.js";

interface WordHistoryProps {
  historyRef: RefObject<HTMLDialogElement>;
}

interface DetailPanelProps {
  word: HistoryWord;
  meanings: WordMeaning[];
  isLoading: boolean;
}

function DetailPanel({ word, meanings, isLoading }: DetailPanelProps) {
  return (
    <div className="mt-4 border-t border-base-300 pt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-serif font-bold text-base">Details</h4>
        <span dir="rtl" className="text-xl font-semibold text-primary">
          {word.word}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-6">
          <span className="loading loading-spinner loading-md text-primary" />
        </div>
      ) : meanings.length === 0 ? (
        <p className="text-center text-base-content/50 text-sm py-4">
          No meanings found
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {meanings.map((meaning, index) => (
            <div
              key={index}
              className="bg-base-200 border border-base-300 rounded-lg px-4 py-3"
            >
              {meaning.phoneticSpelling && (
                <p
                  dir="rtl"
                  className="text-base font-semibold text-base-content mb-1"
                >
                  {meaning.phoneticSpelling}
                </p>
              )}
              <p className="text-sm text-base-content/80">
                {meaning.meaning.replaceAll(";", " / ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WordHistory({ historyRef }: WordHistoryProps) {
  const historyList = retriveHistoryList().reverse();
  const [selectedWord, setSelectedWord] = useState<HistoryWord | null>(null);
  const [meanings, setMeanings] = useState<WordMeaning[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSelectWord(historyItem: HistoryWord) {
    if (selectedWord?.word === historyItem.word) return;

    setSelectedWord(historyItem);
    setIsLoading(true);
    setMeanings([]);

    try {
      const results = await fetchWordMeanings(historyItem.word);
      setMeanings(results);
    } catch {
      setMeanings([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <dialog className="modal" ref={historyRef}>
      <div className="modal-box max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg font-serif">Word History</h3>
          <button
            className="btn btn-error btn-xs btn-outline"
            onClick={() => {
              localStorage.removeItem(localStorageKeys.WORD_HISTORY);
              setSelectedWord(null);
              setMeanings([]);
            }}
          >
            Clear
          </button>
        </div>

        <div className="divider my-2"></div>

        {historyList.length === 0 ? (
          <p className="text-center text-base-content/50 py-6 text-sm">
            No words looked up yet
          </p>
        ) : (
          <ul className="flex flex-col gap-2 overflow-y-auto">
            {historyList.map((historyItem) => {
              const isSelected = selectedWord?.word === historyItem.word;
              return (
                <li
                  key={historyItem.word}
                  onClick={() => void handleSelectWord(historyItem)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-colors
                    ${
                      isSelected
                        ? "bg-primary/10 border-primary text-base-content border-l-4 border-l-secondary"
                        : "bg-base-200 border-base-300 hover:bg-base-300"
                    }`}
                >
                  <span dir="rtl" className="text-lg font-semibold">
                    {historyItem.word}
                  </span>
                  <span className="text-xs text-base-content/50">
                    {new Date(historyItem.timestamp).toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {selectedWord && (
          <DetailPanel
            word={selectedWord}
            meanings={meanings}
            isLoading={isLoading}
          />
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
