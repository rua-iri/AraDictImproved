interface CustomButtonProps {
  textContent: string;
  handleClick?: () => void;
  style?: string;
}
export default function CustomButton({
  textContent,
  handleClick = () => {
    // do nothing.
  },
  style,
}: CustomButtonProps) {
  const buttonStyle = style ?? "btn btn-primary mx-3";

  return (
    <button
      className={buttonStyle}
      onClick={() => {
        handleClick();
      }}
    >
      {textContent}
    </button>
  );
}
