import { useDispatch } from "react-redux";
import CustomButton from "../CustomButton.js";
import type { FormEvent } from "react";
import { setTextContent } from "../../features/textContent/textContentSlice.js";

export default function InputArea() {
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const inputText = (
      event.currentTarget.elements.namedItem(
        "input-textarea",
      ) as HTMLInputElement
    ).value;
    dispatch(setTextContent(inputText));
  }

  return (
    <div className="my-3">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="flex flex-col items-center">
          <textarea
            dir="rtl"
            className="h-60 w-10/12 text-lg m-2 resize-none textarea textarea-neutral"
            id="input-textarea"
            name="input-textarea"
            placeholder="Input Arabic Text Here"
          />
        </div>
        <CustomButton textContent={"Submit"} />
      </form>
    </div>
  );
}
