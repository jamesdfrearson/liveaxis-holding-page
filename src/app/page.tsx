"use client";

// React
import { useState } from "react";

// Next
import Link from "next/link";

// Components
import RegisterModal from "@/components/modals/register";
import LiveAxisLogoSvg from "@/components/svg/liveaxis-logo";

// Styles
import styles from "./styles.module.scss";

export default function Page() {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  return (
    <div className={styles.global}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="LiveAxis home">
          <LiveAxisLogoSvg />
        </Link>

        <main className={styles.container__contents}>
          <h1 className={styles.title}>
            Building the future of live entertainment
          </h1>

          <p className={styles.description}>
            LiveAxis is a new technology company with a bold ambition: to
            transform how venues, events and entertainment businesses use
            technology.
          </p>

          <p className={styles.description}>
            We believe the software behind unforgettable experiences should be
            just as powerful as the moments themselves.
          </p>

          <p className={styles.description}>
            Too many businesses are still held back by outdated systems,
            unnecessary complexity and tools that were never designed for the
            people using them. We&apos;re here to change that.
          </p>

          <h2 className={styles.subtitle}>Starting with Retina</h2>

          <p className={styles.description}>
            Retina is our digital signage platform, built to make managing
            screens simple, flexible and reliable.
          </p>

          <p className={styles.description}>
            From promotions and menus to announcements, events and visitor
            information, Retina helps businesses bring their spaces to life
            without the usual complexity.
          </p>

          <p className={styles.description}>
            It&apos;s our first product, but only the beginning of what we want
            to build.
          </p>

          <h2 className={styles.subtitle}>Our bigger vision</h2>

          <p className={styles.description}>
            Live entertainment brings people together. It creates excitement,
            emotion and memories that stay with us.
          </p>

          <p className={styles.description}>
            We want to build a new generation of software that helps make those
            experiences even better.
          </p>

          <p className={styles.description}>
            Software that helps teams work smarter, connects disconnected
            systems and removes the friction that holds businesses back.
          </p>

          <p className={styles.description}>
            From digital signage and ordering to operations, communications and
            audience experiences, we want to rethink what technology across the
            industry can be.
          </p>

          <h2 className={styles.subtitle}>Technology with purpose</h2>

          <p className={styles.description}>
            We&apos;re not interested in building software for the sake of it.
          </p>

          <p className={styles.description}>
            Everything we create should solve a real problem, make
            someone&apos;s job easier or help deliver a better experience.
          </p>

          <p className={styles.description}>
            We&apos;ll build alongside the people who know the industry best,
            creating technology that is powerful enough for major arenas and
            accessible enough for independent venues.
          </p>

          <h2 className={styles.subtitle}>This is just the start</h2>

          <p className={styles.description}>
            Retina is our first step towards something much bigger.
          </p>

          <p className={styles.description}>
            Our goal is to help shape the future of live entertainment and show
            what&apos;s possible when great technology is built with ambition,
            care and a clear purpose.
          </p>

          <p className={styles.description}>
            We&apos;re starting with screens. We don&apos;t plan to stop there.
          </p>

          <h2 className={styles.subtitle}>Be part of the journey</h2>

          <p className={styles.description}>
            We&apos;re looking for businesses that want to help shape Retina and
            the future of LiveAxis.
          </p>

          <p className={styles.description}>
            Register your interest to trial the platform, share feedback,
            receive early access and follow our progress.
          </p>

          <button
            type="button"
            className={styles.button}
            onClick={() => setIsRegisterOpen(true)}
          >
            Register your interest
          </button>
        </main>

        <footer>
          <div className={styles.copyright}>
            Copyright &copy; {new Date().getFullYear()} LiveAxis. All rights
            reserved. LiveAxis is a trading name of James Frearson.
          </div>

          <div className={styles.privacy}>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
