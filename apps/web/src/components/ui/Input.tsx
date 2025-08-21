// apps/web/src/components/ui/Input.tsx
import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="border var(--color-muted) rounded-md px-3 py-2 w-full focus:outline-none focus:shadow-[0_0_0_2px_var(--color-primary)]"
      {...props}
    />
  );
};

export default Input;

