import SingleWord from "./components/TextSpace/SingleWord.js";
import TopBar from "./components/TopBar/TopBar.js";
import InputArea from "./components/TextSpace/InputArea.js";
import OptionsMenu from "./components/Modals/OptionsMenu.js";
import CustomButton from "./components/CustomButton.js";
import TextContainer from "./components/TextSpace/TextContainer.js";
import AppInfoModal from "./components/Modals/AppInfoModal.js";
import { useDispatch } from "react-redux";
import {
  setSelectedWord,
  resetSelectedWord,
} from "./features/selectedWord/selectedWordSlice.js";
import {
  resetTextContent,
  setTextContent,
} from "./features/textContent/textContentSlice.js";
import TitleHeader from "./components/TitleHeader.js";
import type { FormEvent } from "react";
import { useAppSelector } from "./app/hooks.js";

export default function App() {
  const dispatch = useDispatch();
  const selectedWord = useAppSelector((state) => state.selectedWord.value);
  const textContent = useAppSelector((state) => state.textContent.value);

  let pressTime = Date.now();

  // function to set the text to an empty string
  function resetText() {
    dispatch(resetTextContent());
    dispatch(resetSelectedWord());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputText = event.currentTarget.value;
    dispatch(setTextContent(inputText));
  }

  //function to be executed when a word is clicked
  function activateWord(elemAlt: string) {
    // check that 500 seconds have passed the same so the server isn't spammed
    if (Date.now() >= pressTime + 500 && elemAlt !== selectedWord) {
      dispatch(setSelectedWord(elemAlt));
      pressTime = Date.now();
      console.log(elemAlt);
    }
  }

  // split each word into the string into an array
  const wordAra = textContent?.replaceAll("\n", " ").split(" ");

  //then map each element in the array to the Word component
  const wordCollection = wordAra?.map((word: string, index: number) => {
    const wordSanitised = word.replace(/[.,،/#!$%^&*;:{}=\-_`~()"؛]/g, "");

    return (
      <SingleWord
        wordContent={word}
        key={word + index}
        alt={wordSanitised}
        onClick={activateWord}
        isSelected={selectedWord === wordSanitised}
      />
    );
  });

  return (
    <div className="App min-h-svh h-full bg-slate-200 relative">
      <TitleHeader />

      <div className="text-center bg-white rounded-lg pb-3 mx-8 lg:mx-56">
        <div className="block">
          <TopBar selectedWord={selectedWord} />
        </div>

        {textContent ? (
          <TextContainer textContent={wordCollection} />
        ) : (
          <InputArea handleSubmit={handleSubmit} />
        )}

        {textContent && (
          <CustomButton textContent={"Reset"} handleClick={resetText} />
        )}

        <OptionsMenu />
      </div>

      <AppInfoModal />
    </div>
  );
}
