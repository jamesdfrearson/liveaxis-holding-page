"use client";

// Next
import Link from "next/link";

// Components
import LiveAxisLogoSvg from "@/components/svg/liveaxis-logo";

// Styles
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Page() {
  const [isUnsubscribed, setIsUnsubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onUnsubscribe = async () => {
    const currentUrl: URL = new URL(window.location.href);

    const token = currentUrl.searchParams.get("token");

    if (!token) return;

    const url: URL = new URL("/api/unsubscribe", window.location.href);

    setIsLoading(true);

    const request = await fetch(url.toString(), {
      method: "DELETE",
      body: JSON.stringify({ token }),
    });

    const response = await request.json();

    if (response?.message === "OK") setIsUnsubscribed(true);

    setIsLoading(false);
  };

  if (isUnsubscribed)
    return (
      <div className={styles.global}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <LiveAxisLogoSvg />
          </Link>

          <div className={styles.container__contents}>
            <h1 className={styles.title}>You&apos;ve been unsubscribed</h1>
            <p>You&apos;ve been unsubscribed from LiveAxis updates.</p>
            <p>
              Your record of interest has also been deleted from our system.
            </p>
          </div>

          <div className={styles.copyright}>
            Copyright &copy; {new Date().getFullYear()} LiveAxis. All rights
            reserved. LiveAxis is a trading name of James Frearson.
          </div>

          <div className={styles.privacy}>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.global}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <LiveAxisLogoSvg />
        </Link>

        <div className={styles.container__contents}>
          <h1 className={styles.title}>Unsubscribe</h1>
          <p>Are you sure you want to unsubscribe?</p>
          <p>
            You&apos;ll no longer receive updates about LiveAxis, including
            progress updates, early previews or trial opportunities.
          </p>
          <p>
            To protect your privacy, we&apos;ll also delete your record of
            interest from our system.
          </p>

          <button
            role="button"
            className={styles.button}
            onClick={() => onUnsubscribe()}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Unsubscribe now"}
          </button>
        </div>

        <div className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} LiveAxis. All rights
          reserved. LiveAxis is a trading name of James Frearson.
        </div>

        <div className={styles.privacy}>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
