"use client";

// React
import { useState } from "react";

// Components
import LiveAxisLogoSvg from "@/components/svg/liveaxis-logo";
import RegisterModal from "@/components/modals/register";

// Styles
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Page() {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  return (
    <div className={styles.global}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <LiveAxisLogoSvg />
        </Link>

        <div className={styles.container__contents}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.description}>
            We are a new technology company built around a simple belief:
            businesses should have access to powerful, thoughtful tools that
            help them communicate, connect and create better experiences for
            their customers.
          </p>
          <p className={styles.description}>
            We're starting with Retina - our digital signage platform designed
            to make it easier for businesses to bring their screens to life.
          </p>
          <p className={styles.description}>
            But for us, this is about more than software.
          </p>
          <p className={styles.description}>
            It's about helping businesses share their message clearly. It's
            about giving teams the confidence to create moments that feel
            professional, engaging and memorable. It's about making technology
            feel simple, useful and genuinely empowering.
          </p>
          <h2 className={styles.subtitle}>What we're building</h2>
          <p className={styles.description}>
            Every business has something to say.
          </p>
          <p className={styles.description}>A product to promote.</p>
          <p className={styles.description}>An event to showcase. </p>
          <p className={styles.description}>A customer to guide.</p>
          <p className={styles.description}>A brand experience to improve. </p>
          <p className={styles.description}>
            A moment where the right message, shown in the right place, can make
            all the difference. We believe technology should help make those
            moments easier to create.
          </p>

          <p className={styles.description}>
            LiveAxis exists to build products that are practical, reliable,
            beautifully considered, and accessible to the businesses that need
            them - not just large organisations with large budgets.
          </p>

          <p className={styles.description}>
            We care about doing things properly. That means being transparent,
            listening carefully, building responsibly, and creating tools that
            are genuinely useful in the real world.
          </p>

          <h3 className={styles.subtitle}>Our first product: Retina</h3>

          <p className={styles.description}>
            Retina is a modern digital signage platform being developed to help
            businesses manage screen content with ease.
          </p>

          <p className={styles.description}>
            Whether it&apos;s promoting offers, displaying menus, sharing
            announcements, highlighting events, welcoming visitors, or improving
            the customer journey, Retina is being built to make digital signage
            simpler and more effective.
          </p>

          <p className={styles.description}>
            Our aim is to remove the usual complexity and give businesses a
            platform that feels clear, flexible, and dependable from day one.
          </p>

          <p className={styles.description}>
            Retina is being built for real businesses, with real feedback, and
            with a clear focus on helping customers create better experiences.
          </p>

          <h4 className={styles.subtitle}>
            A hopeful future for business technology
          </h4>

          <p className={styles.description}>
            We believe the future of business technology should feel more human.
          </p>

          <p className={styles.description}>
            Less complicated. Less closed off. Less overwhelming.
          </p>

          <p className={styles.description}>
            More useful. More transparent. More empowering.
          </p>

          <p className={styles.description}>
            LiveAxis is being built with that future in mind.
          </p>

          <p className={styles.description}>
            We want to create technology that helps businesses move forward,
            express themselves better, and deliver experiences their customers
            remember.
          </p>

          <p className={styles.description}>
            This is only the beginning, but we&apos;re building with care,
            ambition, and a genuine belief that good technology can make a real
            difference.
          </p>

          <h5 className={styles.subtitle}>Want to be apart of our story?</h5>

          <p className={styles.description}>
            We&apos;re looking for small to medium-sized businesses who want to
            help shape the future of Retina, our digital signage platform.
          </p>

          <p className={styles.description}>
            If you&apos;re interested in trialling Retina, sharing feedback, or
            simply following the LiveAxis journey, you can register your
            interest below.
          </p>

          <p className={styles.description}>
            We&apos;ll keep you updated with our progress, early access
            opportunities, product updates, and ways to get involved as we
            continue building.
          </p>

          <p className={styles.description}>
            Be part of the journey from the beginning.
          </p>

          <button
            className={styles.button}
            role="button"
            onClick={() => setIsRegisterOpen(true)}
          >
            Register your interest
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

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
        }}
      />
    </div>
  );
}
