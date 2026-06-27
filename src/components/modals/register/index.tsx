"use client";

// Types
type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

// React
import { useMemo, useState } from "react";

// Components
import BaseModal from "../base";
import CloseIconSvg from "@/components/svg/close-icon";

// Interface
import Input from "@/interface/input";

// Styles
import styles from "./styles.module.scss";
import Link from "next/link";
import Checkbox from "@/interface/checkbox";

import z from "zod";

const FormEntry = z.strictObject({
  name: z.string().min(2).max(100).trim(),
  email: z.email().trim().toLowerCase(),
  company: z.string().min(2).max(100).trim(),
  agreeToTerms: z.boolean(),
  receiveUpdates: z.boolean(),
  screens: z.number(),
});

export default function RegisterModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [receiveUpdates, setReceiveUpdates] = useState<boolean>(false);
  const [screens, setScreens] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const isButtonActive = useMemo(() => {
    const parse = FormEntry.safeParse({
      name,
      email,
      company,
      agreeToTerms,
      receiveUpdates,
      screens,
    });

    if (!parse.success) return false;

    if (!agreeToTerms) return false;

    return true;
  }, [name, email, company, agreeToTerms, receiveUpdates, screens]);

  const onRegister = async () => {
    setIsLoading(true);

    const url: URL = new URL("/api/register", window.location.href);

    try {
      const request = await fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          company,
          agreeToTerms,
          receiveUpdates,
          screens,
        }),
      });

      const response = await request.json();

      if (response?.message === "OK") {
        setIsSuccessful(true);
        setName("");
        setEmail("");
        setCompany("");
        setAgreeToTerms(false);
        setReceiveUpdates(false);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccessful)
    return (
      <BaseModal isOpen={isOpen}>
        <div className={styles.modal}>
          <div className={styles.modal__header}>
            <h1 className={styles.modal__title}>Thank you!</h1>
          </div>

          <p>
            Thank you for your interest in LiveAxis. We have successfully and
            securely recorded your interest. Hopefully, we'll be in touch soon!
          </p>

          <button
            role="button"
            className={styles.button}
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </BaseModal>
    );

  return (
    <BaseModal isOpen={isOpen}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h1 className={styles.modal__title}>Register your interest</h1>
          <button
            role="button"
            onClick={() => onClose()}
            className={styles.modal__close}
          >
            <CloseIconSvg />
          </button>
        </div>

        <p>
          Thank you for your interest in LiveAxis. We're building with care,
          ambition, and a genuine belief that technology can help businesses
          create better experiences for their customers.
        </p>

        <p>
          Register your details below to follow our journey, hear about Retina,
          and be considered for early trial opportunities.
        </p>

        <div className={styles.modal__form}>
          <Input
            id="name"
            label="Your name"
            placeholder="Alex Smith"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            id="email"
            label="Your email address"
            placeholder="alex.smith@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
          />

          <Input
            id="company"
            label="Your company name"
            placeholder="Acme Corp"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Input
            id="screens"
            label="Approximate number of screens"
            placeholder="10"
            type="number"
            value={screens}
            onChange={(e) =>
              setScreens(
                isNaN(Number(e.target.value)) ? 1 : Number(e.target.value),
              )
            }
          />
        </div>

        <h2>Data Privacy</h2>

        <p>
          We&apos;ll only use your details to manage your interest in LiveAxis,
          send relevant updates about Retina, and contact you about potential
          early access or trial opportunities.
        </p>

        <p>
          You can unsubscribe or ask us to remove your details at any time. We
          won&apos;t sell your data or share it with unrelated third parties.
        </p>

        <p>
          <Link href="/privacy-policy" onClick={() => onClose()}>
            You can also read our Privacy Policy here.
          </Link>
        </p>

        <div className={styles.options}>
          <Checkbox
            label="I understand that LiveAxis will use my details to manage my registered interest and may contact me about relevant Retina trial opportunities."
            isChecked={agreeToTerms}
            onClick={() => setAgreeToTerms(!agreeToTerms)}
          />

          <Checkbox
            label="I would also like to receive occasional LiveAxis and Retina updates."
            isChecked={receiveUpdates}
            onClick={() => setReceiveUpdates(!receiveUpdates)}
          />
        </div>

        <button
          role="button"
          className={styles.button}
          disabled={!isButtonActive}
          onClick={() => onRegister()}
        >
          {isLoading ? "Please wait..." : "Register interest"}
        </button>
      </div>
    </BaseModal>
  );
}
