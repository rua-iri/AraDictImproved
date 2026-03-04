import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { fetchRootMeanings } from "../../../utils/fetcher.js";
import type { RootMeaning } from "../../types/types.js";

type RootModalProps = {
  root: string | undefined;
  modalRef: RefObject<HTMLDialogElement>;
};
type RootDescriptionProps = {
  rootMeanings: RootMeaning[];
  dictionaryChoice: string;
};

export default function RootModal({ root, modalRef }: RootModalProps) {
  const [rootData, setRootData] = useState<RootMeaning[]>([]);
  const [dictionaryChoice, setDictionaryChoice] = useState("lane");

  async function getRootMeaning() {
    if (root) {
      setRootData(await fetchRootMeanings(root, dictionaryChoice));
    } else {
      setRootData([]);
    }
  }

  function changeDictionary(event: MouseEvent<HTMLInputElement>) {
    const dataDictionaryName = event.currentTarget.getAttribute(
      "data-dictionary-name",
    );
    console.log(dataDictionaryName);
    if (dataDictionaryName) setDictionaryChoice(dataDictionaryName);
  }

  useEffect(() => {
    getRootMeaning();
  }, [root, dictionaryChoice]);

  return (
    <dialog id="root_modal" className="modal text-black" ref={modalRef}>
      <div className="modal-box h-[75%]">
        <h3 className="font-bold text-lg">
          Root:
          <span className="badge badge-lg badge-neutral mx-2 p-3">{root}</span>
        </h3>
        <div className="divider"></div>
        <div className="flex justify-center gap-3">
          <div>
            <label className="block" htmlFor="laneSelector">
              Lane's Lexicon
            </label>
            <input
              id="laneSelector"
              type="radio"
              name="dictionary-radio"
              className="radio"
              data-dictionary-name="lane"
              onClick={(e) => changeDictionary(e)}
              defaultChecked
            />
          </div>
          <div>
            <label className="block" htmlFor="hansSelector">
              Hans Wehr
            </label>
            <input
              id="hansSelector"
              type="radio"
              name="dictionary-radio"
              className="radio"
              data-dictionary-name="hans"
              onClick={(e) => changeDictionary(e)}
            />
          </div>
        </div>
        <div className="divider"></div>
        <RootDescription
          rootMeanings={rootData}
          dictionaryChoice={dictionaryChoice}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function RootDescription({
  rootMeanings,
  dictionaryChoice,
}: RootDescriptionProps) {
  if (!rootMeanings || Object.keys(rootMeanings).length === 0) {
    return <div>No Description Found</div>;
  }

  const rootMeaningElements = rootMeanings.map(
    (rootMeaning: RootMeaning, index: number) => (
      <div
        className="collapse collapse-plus bg-base-100 border border-base-300"
        dir="ltr"
        key={`${dictionaryChoice}-${index}`}
      >
        <input
          type="checkbox"
          name="root-accordion"
          defaultChecked={index === 0}
        />
        <div className="collapse-title font-semibold" dir="ltr">
          {rootMeaning.word}
        </div>
        <span
          className="collapse-content"
          dir="ltr"
          dangerouslySetInnerHTML={{ __html: rootMeaning.meaning }}
        />
      </div>
    ),
  );

  return <div className="my-4">{rootMeaningElements}</div>;
}
