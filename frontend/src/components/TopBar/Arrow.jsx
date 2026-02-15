import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

export default function Arrow({ isArrowRight, onClick, isDisabled }) {
  let buttonClass =
    "invert w-10 flex items-center justify-center select-none";

  let iconClass = "size-12"

  if (isDisabled) {
    buttonClass += " btn-disabled blur-xs grayscale";
    iconClass += " text-slate-400"
  } else {
    iconClass += " text-black"
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      role="button"
      aria-disabled={isDisabled}
    >
      {isArrowRight ? (
        <ChevronDoubleRightIcon className={iconClass} />
      ) : (
        <ChevronDoubleLeftIcon className={iconClass} />
      )}
    </button>
  );
}
