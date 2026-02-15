import AudioPlayer from "../AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setVoice } from "../../features/voice/voiceSlice";

export default function VoicesSelector() {
  const voiceList = [
    {
      nameEn: "Leila",
      nameAr: "ليلَى",
    },
    {
      nameEn: "Mehdi",
      nameAr: "مَهدِي",
    },
    {
      nameEn: "Nizar",
      nameAr: "نزار",
    },
    {
      nameEn: "Salma",
      nameAr: "سلمَى",
    },
  ];

  const selectedVoice = useSelector((state) => state.voice.value);
  const dispatch = useDispatch();

  function changeSelectedVoice(event) {
    dispatch(setVoice(event.target.value));
  }

  return (
    <div className="m-3 p-3 font-light">
      <h3 className="font-normal mb-2">Available Voices</h3>
      <div className="grid grid-cols-4">
        {voiceList.map((speaker, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <p className="my-3">{speaker.nameEn}</p>

            <AudioPlayer
              textContent={`مرحبا، اسمي ${speaker.nameAr}`}
              speakerName={speaker.nameEn}
            />

            <input
              className="radio radio-info mx-2 my-3"
              type="radio"
              name="radio-group"
              value={speaker.nameEn}
              onChange={changeSelectedVoice}
              defaultChecked={speaker.nameEn === selectedVoice}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
