interface SingleWordProps {
  isSelected: boolean;
  onClick: (alt: string) => void;
  alt: string;
  wordContent: string;
}

export default function SingleWord({
  isSelected,
  onClick,
  alt,
  wordContent,
}: SingleWordProps) {
  const fontDecoration = isSelected ? "bg-secondary/30 rounded" : "";

  if (!wordContent) {
    return <div className="h-3 basis-full"></div>;
  } else {
    return (
      <span
        dir="rtl"
        className={`cursor-pointer ${fontDecoration} me-1`}
        onClick={() => {
          onClick(alt);
        }}
      >
        {wordContent}
      </span>
    );
  }
}
