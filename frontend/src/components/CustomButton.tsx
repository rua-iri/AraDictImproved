interface CustomButtonProps {
  textContent: string;
  handleClick?: () => void;
}
export default function CustomButton({
  textContent,
  handleClick = () => {
    // do nothing.
  },
}: CustomButtonProps) {
  return (
    <button
      className="btn glass bg-slate-200 hover:bg-slate-300 mx-3"
      onClick={() => {
        handleClick();
      }}
    >
      {textContent}
    </button>
  );
}
