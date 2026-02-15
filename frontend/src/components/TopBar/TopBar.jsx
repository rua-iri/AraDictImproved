import { useState, useEffect } from "react";
import WordDataContainer from "./WordDataContainer";
import Arrow from "./Arrow";
import { fetchWordMeanings } from "/utils/fetcher";

function ExamplesAnchor({ wordSelected }) {
  const examplesLink =
    "https://context.reverso.net/translation/arabic-english/" + wordSelected;

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

export default function TopBar({ selectedWord }) {
  const [allMeanings, setAllMeanings] = useState([]);
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

  function cycleResults(isNext) {
    if (isNext && resultCounter < allMeanings.length - 1) {
      setResultCounter(resultCounter + 1);
    } else if (!isNext && resultCounter > 0) {
      setResultCounter(resultCounter - 1);
    }
  }

  const wordSelected = allMeanings[resultCounter]
    ? allMeanings[resultCounter].phoneticSpelling
    : selectedWord;

  return (
    <div className="flex rounded-t-lg py-3 mb-1 flex-row-reverse w-full bg-slate-600 text-slate-50">
      <Arrow
        isArrowRight={true}
        onClick={() => cycleResults(false)}
        isDisabled={!resultCounter}
      />

      <div
        className="flex flex-col px-2 text-xl items-center justify-center"
        dir="rtl"
      >
        <div>{wordSelected}</div>

        {wordSelected !== "Selected Word" && (
          <ExamplesAnchor wordSelected={wordSelected} />
        )}
      </div>
      <div className="w-full">
        <WordDataContainer
          allTranslations={allMeanings}
          resCounter={resultCounter}
          textContent={wordSelected}
        />
      </div>

      <Arrow
        isArrowRight={false}
        onClick={() => cycleResults(true)}
        isDisabled={!(resultCounter < allMeanings.length - 1)}
      />
    </div>
  );
}
