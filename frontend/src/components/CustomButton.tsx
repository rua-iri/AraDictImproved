import type { ReactNode } from "react";

interface CustomButtonProps {
  textContent: string;
  handleClick?: () => void;
  style?: string;
  icon?: ReactNode;
}

export default function CustomButton({
  textContent,
  handleClick = () => {
    // do nothing.
  },
  style,
  icon,
}: CustomButtonProps) {
  const buttonStyle = style ?? "btn btn-primary mx-3";

  return (
    <button
      className={buttonStyle}
      onClick={() => {
        handleClick();
      }}
    >
      {icon}
      {textContent}
    </button>
  );
}
