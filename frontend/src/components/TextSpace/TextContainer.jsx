import { useSelector } from "react-redux";

export default function TextContainer({ textContent }) {
  const fontSize = useSelector((state) => state.fontSlice.size);

  return (
    <div className="m-4 max-h-100 lg:max-h-160 overflow-scroll overflow-x-auto border">
      <div
        dir="rtl"
        className={`w-full p-5 text-right inline-flex flex-wrap text-${fontSize}`}
      >
        {textContent}
      </div>
    </div>
  );
}
