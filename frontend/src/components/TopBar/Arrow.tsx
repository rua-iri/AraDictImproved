import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

interface NavigationArrowProps {
  isArrowRight: boolean;
  handleClick: () => void;
  isDisabled: boolean;
}

export default function NavigationArrow({
  isArrowRight,
  handleClick,
  isDisabled,
}: NavigationArrowProps) {
  const buttonClass = isDisabled
    ? "w-10 flex items-center justify-center select-none btn-disabled opacity-30"
    : "w-10 flex items-center justify-center select-none cursor-pointer";

  const iconClass = isDisabled ? "size-8 text-base-300" : "size-8 text-neutral";

  return (
    <button
      className={buttonClass}
      onClick={() => {
        handleClick();
      }}
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
