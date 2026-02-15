export default function CustomButton({ textContent, handleClick }) {
  return (
    <button
      className="btn glass bg-slate-200 hover:bg-slate-300 mx-3"
      onClick={() => handleClick()}
    >
      {textContent}
    </button>
  );
}
