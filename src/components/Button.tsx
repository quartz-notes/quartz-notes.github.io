import { ButtonHTMLAttributes } from "react";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-stone-100 dark:bg-stone-800 focus:bg-stone-200 dark:focus:bg-stone-700 p-2 rounded-md transition-colors hover:bg-stone-200 dark:hover:bg-stone-700 active:bg-stone-300 dark:active:bg-stone-600"
      {...props}
    />
  );
}

export default Button;
