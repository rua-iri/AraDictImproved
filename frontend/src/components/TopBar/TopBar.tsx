import { useState, useEffect } from "react";
import WordDataContainer from "./WordDataContainer.js";
import NavigationArrow from "./Arrow.js";
import { fetchWordMeanings } from "../../../utils/fetcher.js";
import type { WordMeaning } from "../../types/types.js";

type ExamplesAnchorProps = {
  selectedWordPhonetic: string;
};

type TopBarProps = {
  selectedWord: string;
};

function ExamplesAnchor({ selectedWordPhonetic }: ExamplesAnchorProps) {
  const examplesLink =
    "https://context.reverso.net/translation/arabic-english/" +
    selectedWordPhonetic;

  return (
    <a
      className="text-xs text-stone-300 link link-hover"
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
      console.log("selectedWord: ", selectedWord);
      setAllMeanings(await fetchWordMeanings(selectedWord));
    } catch (e) {
      console.log(e);
      alert("Error: API Call Failed");
    }
  };

  useEffect(() => {
    setResultCounter(0);
    if (selectedWord && selectedWord !== "Selected Word") {
      lookupWord();
    }
  }, [selectedWord]);

  function cycleResults(isNext: boolean) {
    if (isNext && resultCounter < allMeanings.length - 1) {
      setResultCounter(resultCounter + 1);
    } else if (!isNext && resultCounter > 0) {
      setResultCounter(resultCounter - 1);
    }
  }

  const selectedWordPhonetic = allMeanings[resultCounter]
    ? allMeanings[resultCounter].phoneticSpelling
    : selectedWord;

  return (
    <div className="flex rounded-t-lg py-3 mb-1 flex-row-reverse w-full bg-slate-600 text-slate-50">
      <NavigationArrow
        isArrowRight={true}
        handleClick={() => cycleResults(false)}
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
          allTranslations={allMeanings}
          resCounter={resultCounter}
          textContent={selectedWordPhonetic}
        />
      </div>

      <NavigationArrow
        isArrowRight={false}
        handleClick={() => cycleResults(true)}
        isDisabled={!(resultCounter < allMeanings.length - 1)}
      />
    </div>
  );
}
