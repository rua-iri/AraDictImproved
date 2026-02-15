import SingleWord from "./components/TextSpace/SingleWord";
import TopBar from "./components/TopBar/TopBar";
import InputArea from "./components/TextSpace/InputArea";
import OptionsMenu from "./components/Modals/OptionsMenu";
import CustomButton from "./components/CustomButton";
import TextContainer from "./components/TextSpace/TextContainer";
import AppInfoModal from "./components/Modals/AppInfoModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedWord,
  resetSelectedWord,
} from "./features/selectedWord/selectedWordSlice";
import {
  resetTextContent,
  setTextContent,
} from "./features/textContent/textContentSlice";
import Header from "./components/Header";

export default function App() {
  const dispatch = useDispatch();
  const selectedWord = useSelector((state) => state.selectedWord.value);
  const textContent = useSelector((state) => state.textContent.value);

  let pressTime = Date.now();

  // function to set the text to an empty string
  function resetText() {
    dispatch(resetTextContent());
    dispatch(resetSelectedWord());
  }

  function handleSubmit(event) {
    event.preventDefault();
    const inputText = event.target[0].value;
    dispatch(setTextContent(inputText));
  }

  //function to be executed when a word is clicked
  function activateWord(elemAlt) {
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
  const wordCollection = wordAra?.map((wrd, index) => {
    const wrdFormatted = wrd.replace(/[.,،/#!$%^&*;:{}=\-_`~()"؛]/g, "");

    return (
      <SingleWord
        wordContent={wrd}
        key={wrd + index}
        alt={wrdFormatted}
        onClick={activateWord}
        isSelected={selectedWord === wrdFormatted}
      />
    );
  });

  return (
    <div className="App min-h-svh h-full bg-slate-200 relative">
      <Header />

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
