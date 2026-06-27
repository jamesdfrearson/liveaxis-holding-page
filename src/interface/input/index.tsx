// Types
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
interface Props extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: string;
  id: string;
}

// Styles
import styles from "./styles.module.scss";

export default function Input({ label, id, ...props }: Props) {
  return (
    <div className={styles.input}>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={styles.input__input} {...props} />
    </div>
  );
}
