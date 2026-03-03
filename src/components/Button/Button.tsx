import "./Button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "normal" | "warning" | "success" | "extra";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  label,
  onClick,
  variant = "normal",
  fullWidth = true,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`btn ${variant} ${fullWidth ? "fullWidth" : ""} ${
        disabled ? "disabled" : ""
      } ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
