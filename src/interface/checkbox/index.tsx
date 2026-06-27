// Types
type Props = Readonly<{
  label: string;
  onClick: () => void;
  isChecked: boolean;
}>;

import CheckIconSvg from "@/components/svg/check-icon";
// Styles
import styles from "./styles.module.scss";

export default function Checkbox({ label, isChecked, onClick }: Props) {
  return (
    <button className={styles.input} role="button" onClick={onClick}>
      <div
        className={[
          styles.input__check,
          isChecked ? styles["input__check--active"] : "",
        ]
          .join(" ")
          .trim()}
      >
        {isChecked && <CheckIconSvg />}
      </div>
      <div className={styles.input__label}>{label}</div>
    </button>
  );
}
