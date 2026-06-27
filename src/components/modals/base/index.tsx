"use client";

// Types
type Props = Readonly<{
  isOpen: boolean;
  onClose?: () => void;
  canCloseOutside?: boolean;
  children: React.ReactNode;
}>;

// React
import { useState, useEffect, useRef, RefObject } from "react";

// Components
import Portal from "@/components/portal";

// Styles
import styles from "./styles.module.scss";

export default function BaseModal({
  isOpen,
  children,
}: Props): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalInDom, setIsModalInDom] = useState<boolean>(false);

  // Logic to close the modal when the user clicks outside of it
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
      setIsModalInDom(true);
      setTimeout(() => {
        setIsModalOpen(true);
      }, 100);

      return;
    }
    window.document.body.style.overflow = "";
    window.document.body.style.maxHeight = "";
    setIsModalOpen(false);
    setTimeout(() => {
      setIsModalInDom(false);
    }, 310);
  }, [isOpen]);

  if (!isModalInDom) return <></>;

  return (
    <Portal>
      <div
        className={[styles.modal, isModalOpen ? styles["modal--open"] : ""]
          .join(" ")
          .trim()}
      >
        <div style={{ display: "contents" }} ref={modalRef}>
          {children}
        </div>
      </div>
    </Portal>
  );
}
