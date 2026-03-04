import CustomButton from "../CustomButton.js";

type InputAreaProps = { handleSubmit: Function };

export default function InputArea({ handleSubmit }: InputAreaProps) {
  return (
    <div className="my-3">
      <form onSubmit={() => handleSubmit(event)}>
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
