interface ToastsContainerProps {
  toasts: {
    variety: "success" | "warn" | "error";
    message: string;
    timestamp: Date;
  }[];
}

export default function ToastsContainer({ toasts }: ToastsContainerProps) {
  // TODO: store toast messages in redux state and expire after time has expired

  return (
    <div className="toast toast-end toast-start">
      {toasts.map((toast) => (
        <div className={`alert alert-${toast.variety}`}>
          <span>{toast.message}</span>
          <span>{toast.timestamp.toISOString()}</span>
        </div>
      ))}
    </div>
  );
}
