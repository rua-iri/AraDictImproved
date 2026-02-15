import AudioPlayer from "../AudioPlayer";
import RootModal from "../Modals/RootModal";
import { useSelector } from "react-redux";

export default function WordDataContainer({
  allTranslations,
  resCounter,
  textContent,
}) {
  let translationArray = allTranslations;
  let resultCounter = resCounter;

  const selectedVoice = useSelector((state) => state.voice.value);

  let rootElem;

  if (translationArray[resCounter]) {
    const rootArray = translationArray[resCounter].root.split("");
    rootElem =
      rootArray.length === 0 ? (
        <div></div>
      ) : (
        <button
          dir="rtl"
          className={`btn btn-sm`}
          onClick={() => document.getElementById("root_modal").showModal()}
        >
          {rootArray.map((rootLetter, index) => (
            <div className="inline mx-0.5" key={index}>
              {rootLetter}
            </div>
          ))}
        </button>
      );
  } else {
    rootElem = "";
  }

  return (
    <div>
      <div className="h-16 flex flex-col">
        <div className="px-1 grow-1">
          {translationArray[resultCounter]
            ? translationArray[resultCounter].meaning.replaceAll(";", "/ ")
            : "meaning"}
        </div>
        <div className="grow-1">
          {translationArray[resultCounter]
            ? translationArray[resultCounter].tense
            : "tense"}
        </div>
      </div>

      <div className="flex w-full h-8">
        <div className="w-full arab-text">{rootElem}</div>
        <div className="w-full">
          {translationArray[resultCounter]
            ? translationArray[resultCounter].verbForm
            : "verbForm"}
        </div>
        <div className="w-full">
          <AudioPlayer textContent={textContent} speakerName={selectedVoice} />
        </div>
      </div>
      <RootModal root={translationArray[resCounter]?.root} />
    </div>
  );
}
