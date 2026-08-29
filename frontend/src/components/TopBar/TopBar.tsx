import { useState, useEffect } from "react";
import WordDataContainer from "./WordDataContainer.js";
import NavigationArrow from "./Arrow.js";
import { fetchWordMeanings } from "../../../utils/fetcher.js";
import type { WordMeaning } from "../../types/types.js";

interface ExamplesAnchorProps {
  selectedWordPhonetic: string;
}

interface TopBarProps {
  selectedWord: string;
}

function ExamplesAnchor({ selectedWordPhonetic }: ExamplesAnchorProps) {
  const examplesLink =
    "https://context.reverso.net/translation/arabic-english/" +
    selectedWordPhonetic;

  return (
    <a
      className="text-xs text-accent link link-hover"
      href={examplesLink}
      target="_blank"
      rel="noreferrer"
    >
      Reverso Examples
    </a>
  );
}

export default function TopBar({ selectedWord }: TopBarProps) {
  const [allMeanings, setAllMeanings] = useState<WordMeaning[]>([]);
  const [resultCounter, setResultCounter] = useState(0);

  const lookupWord = async () => {
    try {
      setAllMeanings(await fetchWordMeanings(selectedWord));
    } catch (e) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      // TODO: improve error handling
      console.error(e);
    }
  };

  useEffect(() => {
    setResultCounter(0);
    if (selectedWord && selectedWord !== "Selected Word") {
      void lookupWord();
    }
  }, [selectedWord]);

  function cycleResults(isNext: boolean) {
    if (isNext && resultCounter < allMeanings.length - 1) {
      setResultCounter(resultCounter + 1);
    } else if (!isNext && resultCounter > 0) {
      setResultCounter(resultCounter - 1);
    }
  }

  const selectedWordPhonetic =
    allMeanings[resultCounter]?.phoneticSpelling || selectedWord;

  return (
    <div className="flex rounded-t-2xl py-3 mb-1 flex-row-reverse w-full bg-base-200 text-base-content border-b border-base-300">
      <NavigationArrow
        isArrowRight={true}
        handleClick={() => {
          cycleResults(false);
        }}
        isDisabled={!resultCounter}
      />

      <div
        className="flex flex-col px-2 text-xl items-center justify-center"
        dir="rtl"
      >
        <div>{selectedWordPhonetic}</div>

        {selectedWordPhonetic !== "Selected Word" && (
          <ExamplesAnchor selectedWordPhonetic={selectedWordPhonetic} />
        )}
      </div>
      <div className="w-full">
        <WordDataContainer
          allMeanings={allMeanings}
          resultCounter={resultCounter}
          textContent={selectedWordPhonetic}
        />
      </div>

      <NavigationArrow
        isArrowRight={false}
        handleClick={() => {
          cycleResults(true);
        }}
        isDisabled={!(resultCounter < allMeanings.length - 1)}
      />
    </div>
  );
}
