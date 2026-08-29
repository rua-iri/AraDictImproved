import { useRef } from "react";
import { useAppSelector } from "../../app/hooks.js";
import type { WordMeaning } from "../../types/types.js";
import AudioPlayer from "../AudioPlayer.js";
import RootModal from "../Modals/RootModal.js";

interface WordDataContainerProps {
  allMeanings: WordMeaning[];
  resultCounter: number;
  textContent: string;
}

export default function WordDataContainer({
  allMeanings,
  resultCounter,
  textContent,
}: WordDataContainerProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const selectedVoice = useAppSelector((state) => state.voice.value);

  let rootElem;

  if (allMeanings[resultCounter]) {
    const rootArray = allMeanings[resultCounter].root.split("");
    rootElem =
      rootArray.length === 0 ? (
        <div></div>
      ) : (
        <button
          dir="rtl"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            if (modalRef.current) modalRef.current.showModal();
          }}
        >
          {rootArray.map((rootLetter: string, index: number) => (
            <div className="inline mx-0.5" key={index}>
              {rootLetter}
            </div>
          ))}
        </button>
      );
  } else {
    rootElem = null;
  }

  return (
    <div>
      <div className="h-16 flex flex-col">
        <div className="px-1 grow-1 text-md font-semibold">
          {allMeanings[resultCounter]?.meaning
            ? allMeanings[resultCounter].meaning.replaceAll(";", "/ ")
            : "meaning"}
        </div>
        <div className="grow-1">
          {allMeanings[resultCounter]?.tense ? (
            <span className="badge badge-outline text-xs">
              {allMeanings[resultCounter].tense}
            </span>
          ) : (
            <span className="text-sm text-base-content/50">tense</span>
          )}
        </div>
      </div>

      <div className="flex w-full h-8">
        <div className="w-full arab-text">{rootElem}</div>
        <div className="w-full">
          {allMeanings[resultCounter]?.verbForm ? (
            <span className="badge badge-outline text-xs">
              Form {allMeanings[resultCounter].verbForm}
            </span>
          ) : (
            <span className="text-sm text-base-content/50">verbForm</span>
          )}
        </div>
        <div className="w-full">
          <AudioPlayer textContent={textContent} speakerName={selectedVoice} />
        </div>
      </div>
      <RootModal root={allMeanings[resultCounter]?.root} modalRef={modalRef} />
    </div>
  );
}
