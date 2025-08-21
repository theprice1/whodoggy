// apps/web/src/components/ui/Button.tsx
import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "btn"; // base button class from global.css
  const variantClasses = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} type="button">
      {children}
    </button>
  );
};

export default Button;

