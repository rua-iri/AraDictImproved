import { useRef } from "react";
import { unicodeToBase64 } from "../../utils/textFormatter.js";
import { SpeakerWaveIcon } from "@heroicons/react/16/solid";

type AudioPlayerProps = {
  textContent: string;
  speakerName: string | null;
};
export default function AudioPlayer({
  textContent,
  speakerName,
}: AudioPlayerProps) {
  let audioLink = "";
  const word64 = unicodeToBase64(textContent);
  const audioElem = useRef<HTMLAudioElement>(null);

  if (textContent !== "Selected Word" && speakerName) {
    audioLink =
      "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/" +
      `voiceName=${speakerName}22k` +
      `?inputText=${word64}`;
  }

  function audioClick() {
    console.log(audioLink);
    audioLink && audioElem.current?.play();
  }

  return (
    <span>
      <audio ref={audioElem} src={audioLink}></audio>

      <button
        className={`btn btn-sm`}
        disabled={textContent !== "Selected Word" ? false : true}
        onClick={audioClick}
      >
        <SpeakerWaveIcon className="h-5" />
      </button>
    </span>
  );
}
