import { useRef } from "react";
import { unicodeToBase64 } from "../../utils/textFormatter";
import { SpeakerWaveIcon } from "@heroicons/react/16/solid";

export default function AudioPlayer({ textContent, speakerName }) {
  let audioLink = "";
  const word64 = unicodeToBase64(textContent);
  const audioElem = useRef();

  if (textContent !== "Selected Word") {
    audioLink =
      "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/" +
      `voiceName=${speakerName}22k` +
      `?inputText=${word64}`;
  }

  function audioClick() {
    console.log(audioLink);
    audioLink && audioElem.current.play();
  }

  return (
    <span>
      <audio ref={audioElem} src={audioLink}></audio>

      <button
        className={`btn btn-sm`}
        disabled={textContent !== "Selected Word" ? "" : "disabled"}
        onClick={audioClick}
      >
        <SpeakerWaveIcon className="h-5" />
      </button>
    </span>
  );
}
