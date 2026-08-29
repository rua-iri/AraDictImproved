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
      className="btn btn-primary mx-3"
      onClick={() => {
        handleClick();
      }}
    >
      {textContent}
    </button>
  );
}
