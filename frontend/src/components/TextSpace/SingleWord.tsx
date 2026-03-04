type SingleWordProps = {
  isSelected: boolean;
  onClick: Function;
  alt: string;
  wordContent: string;
};

export default function SingleWord({
  isSelected,
  onClick,
  alt,
  wordContent,
}: SingleWordProps) {
  let fontDecoration = "";

  // alert(fontSize)

  if (isSelected) {
    fontDecoration = "bg-slate-200 rounded-sm";
  }

  if (!wordContent) {
    return <div className="h-3 basis-full"></div>;
  } else {
    return (
      <span
        dir="rtl"
        className={`cursor-pointer ${fontDecoration} me-1`}
        onClick={() => onClick(alt)}
      >
        {wordContent}
      </span>
    );
  }
}
