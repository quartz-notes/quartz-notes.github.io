import { InputHTMLAttributes } from "react";

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="p-2 rounded-md bg-stone-100 dark:bg-stone-800 focus:bg-stone-200 dark:focus:bg-stone-700 outline-hidden transition-colors"
      {...props}
    />
  );
}

export default Input;
