"use client";

// Next
import Link from "next/link";

// Components
import LiveAxisLogoSvg from "@/components/svg/liveaxis-logo";

// Styles
import styles from "./styles.module.scss";

export default function Page() {
  return (
    <div className={styles.global}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <LiveAxisLogoSvg />
        </Link>

        <div className={styles.container__contents}>
          <h1 className={styles.title}>Privacy Policy</h1>

          <p>Last updated: 27 June 2026</p>

          <p>At LiveAxis, we believe privacy matters.</p>

          <p>
            When you share your details with us, you are trusting us with your
            personal information. We do not take that lightly. We want to be
            open about what we collect, why we collect it, how we use it, and
            the choices you have.
          </p>

          <p>
            This Privacy Policy explains how James Frearson, trading as
            LiveAxis, collects and uses personal information through the
            LiveAxis website at <Link href="/">https://liveaxis.co.uk</Link>.
          </p>

          <p>
            This policy currently applies to the LiveAxis company landing page,
            including the register your interest form. Retina, our digital
            signage platform, will have its own privacy information before any
            trial or product launch.
          </p>

          <h2 className={styles.subtitle}>Who we are</h2>

          <p>LiveAxis is operated by James Frearson as a sole trader.</p>

          <p>For legal and data protection purposes, the data controller is:</p>
          <p>James Frearson trading as LiveAxis</p>
          <p>You can contact us about privacy or data protection matters at:</p>
          <a href="mailto:privacy@liveaxis.co.uk">privacy@liveaxis.co.uk</a>

          <p>
            As LiveAxis is currently operated from a private home address, we do
            not publish a postal address on this website. If a postal address is
            legally required or reasonably necessary, please contact us using
            the email address above.
          </p>

          <h2 className={styles.subtitle}>What this policy covers</h2>

          <p>
            This Privacy Policy covers personal information collected through
            the LiveAxis website, including when you:
          </p>

          <ul>
            <li>
              Visit <a href="/">https://liveaxis.co.uk</a>
            </li>
            <li>Register your interest in LiveAxis or Retina</li>
            <li>Choose to receive updates from us</li>
            <li>Contact us directly</li>
            <li>
              Interact with our form protection, analytics, or website security
              features
            </li>
          </ul>

          <p>
            This policy does not yet cover the full Retina product, customer
            accounts, uploaded digital signage content, screen/device data,
            support systems, payments, or future customer services. Those areas
            will be covered by separate or updated privacy information before
            they are made available.
          </p>

          <h2 className={styles.subtitle}>
            The personal information we collect
          </h2>

          <p>We aim to collect only what we need.</p>

          <h3>Information you provide us</h3>
          <p>When you register your interest, we may collect:</p>
          <ul>
            <li>Your name</li>
            <li>Your email address</li>
            <li>Your company or business name</li>
            <li>
              Your communication preferences, such as whether you want to
              receive occasional updates
            </li>
            <li>
              Any information you choose to send us by email or through future
              contact forms
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            When you visit our website, some technical information may be
            collected automatically, such as:
          </p>

          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Approximate location based on IP address</li>
            <li>Date and time of visit</li>
            <li>Referral source, such as how you arrived at the website</li>
            <li>Basic security and server logs</li>
          </ul>

          <p>
            This information helps us keep the website secure, understand how
            people use it and improve the experience.
          </p>

          <h3>Analytics information</h3>
          <p>
            We intend to use Google Analytics to understand how visitors use the
            LiveAxis website.
          </p>
          <p>
            Google Analytics may collect information such as page views, visit
            duration, traffic source, device information, approximate location,
            and interactions with the website.
          </p>
          <p>
            Where analytics cookies or similar technologies are used, we will
            ask for your consent before enabling them unless the law allows
            otherwise.
          </p>
          <p>
            We do not use analytics to identify individual visitors personally.
          </p>

          <h3>Spam protection information</h3>
          <p>
            We use Google reCAPTCHA on our forms to help protect the website
            from spam, abuse, and automated submissions.
          </p>
          <p>
            reCAPTCHA may process technical information about your device,
            browser, interaction with the website, and network connection to
            assess whether a form submission appears genuine.
          </p>
          <p>
            We use this to protect LiveAxis, our website, and the people who use
            it.
          </p>

          <h2 className={styles.subtitle}>
            How we use your personal information
          </h2>

          <p>We use personal information for the following purposes:</p>
          <ul>
            <li>To receive and manage registrations of interest.</li>
            <li>
              To understand which businesses may be interested in LiveAxis or
              Retina.
            </li>
            <li>To contact you about your registered interest.</li>
            <li>
              To consider you or your business for future Retina trial
              opportunities.
            </li>
            <li>
              To send occasional updates if you have chosen to receive them.
            </li>
            <li>To respond to enquiries.</li>
            <li>To operate, protect and improve the LiveAxis website.</li>
            <li>To prevent spam, abuse and misuse of our forms.</li>
            <li>To understand website performance and visitor engagement.</li>
            <li>To comply with legal obligations.</li>
            <li>
              To keep appropriate records of consent, preferences, and data
              protection requests.
            </li>
          </ul>

          <p>We do not sell your personal information.</p>
          <p>
            We do not share your personal information with unrelated third
            parties for their own marketing.
          </p>

          <h2 className={styles.subtitle}>
            Registering interest and receiving updates
          </h2>
          <p>
            You can register your interest in LiveAxis or Retina without
            agreeing to receive general updates.
          </p>
          <p>
            If you register your interest, we may contact you about your
            specific interest, such as future trial opportunities, early access,
            or a relevant follow-up about Retina.
          </p>
          <p>
            If you choose to receive occasional updates, we may send you emails
            about LiveAxis, Retina, product progress, trial availability, early
            access opportunities, and related news.
          </p>
          <p>
            Every marketing or update email will include a way to unsubscribe.
          </p>
          <p>
            You can also ask us to stop contacting you at any time by emailing:{" "}
            <a href="mailto:privacy@liveaxis.co.uk">privacy@liveaxis.co.uk</a>
          </p>

          <h2 className={styles.subtitle}>
            Our lawful basis for using personal information
          </h2>

          <p>
            Under UK data protection law, we need a lawful basis to use personal
            information.
          </p>
          <p>We rely on the following lawful bases:</p>

          <div className={styles.minisection}>
            <h3>Registering and managing your interest</h3>
            <div>Lawful basis: Legitimate interests</div>
            <div>
              We use your name, email address, and company name to record your
              interest and contact you about relevant LiveAxis or Retina
              opportunities.
            </div>
            <div>
              Our legitimate interest is understanding interest in our business
              and developing products that may be useful to small and
              medium-sized businesses.
            </div>
          </div>

          <div className={styles.minisection}>
            <h3>Sending optional updates</h3>
            <div>Lawful basis: Consent</div>
            <div>
              If you choose to receive occasional updates from LiveAxis, we rely
              on your consent.
            </div>
            <div>
              You can withdraw your consent at any time by unsubscribing or
              contacting us.
            </div>
          </div>

          <div className={styles.minisection}>
            <h3>Responding to enquiries</h3>
            <div>Lawful basis: Legitimate interests</div>
            <div>
              If you contact us, we use your details to respond and manage the
              enquiry.
            </div>
          </div>

          <div className={styles.minisection}>
            <h3>Website security and spam prevention</h3>
            <div>Lawful basis: Legitimate interests</div>
            <div>
              We use security logs, technical information, and reCAPTCHA to
              protect our website from spam, abuse, unauthorised access, and
              misuse.
            </div>
          </div>

          <div className={styles.minisection}>
            <h3>Website analytics</h3>
            <div>Lawful basis: Consent, where required</div>
            <div>
              Where analytics cookies or similar technologies are used, we will
              request consent before enabling them unless the law allows
              otherwise.
            </div>
          </div>

          <div className={styles.minisection}>
            <h3>Legal and compliance matters</h3>
            <div>Lawful basis: Legal obligation or legitimate interests</div>
            <div>
              We may use personal information where necessary to comply with the
              law, handle data protection requests, keep appropriate records, or
              protect our legal position.
            </div>
          </div>

          <h2 className={styles.subtitle}>
            Who we share personal information with
          </h2>
          <p>
            We only share personal information where needed to operate LiveAxis,
            provide the website, manage interest submissions, send emails,
            protect our systems, or comply with the law.
          </p>
          <p>We may use the following types of service providers:</p>
          <ul>
            <li>
              Website hosting provider, currently{" "}
              <a href="https://vercel.com/" target="_blank">
                Vercel
              </a>
            </li>
            <li>
              Database provider, currently{" "}
              <a href="https://www.mongodb.com/" target="_blank">
                MongoDB Atlas
              </a>
            </li>
            <li>
              Email provider, currently{" "}
              <a href="https://resend.dev/" target="_blank">
                Resend
              </a>
            </li>
            <li>
              Analytics provider, currently{" "}
              <a href="https://developers.google.com/analytics" target="_blank">
                Google Analytics
              </a>
            </li>
            <li>
              Spam protection provider, currently{" "}
              <a
                href="https://docs.cloud.google.com/recaptcha/docs"
                target="_blank"
              >
                Google reCAPTCHA
              </a>
            </li>
            <li>Domain, DNS, security, and infrastructure providers.</li>
            <li>
              Professional advisers, if needed, such as accountants, legal
              advisers, or compliance advisers.
            </li>
            <li>Regulators or authorities, where legally required.</li>
          </ul>

          <p>
            These providers may process personal information on our behalf. We
            aim to use reputable providers with appropriate security and data
            protection arrangements.
          </p>

          <p>
            We do not allow service providers to use your personal information
            for their own unrelated marketing.
          </p>

          <h2 className={styles.subtitle}>International transfers</h2>
          <p>
            Some of the service providers we use may process personal
            information outside the UK.
          </p>
          <p>
            Where personal information is transferred outside the UK, we will
            take steps intended to ensure it remains protected in line with UK
            data protection law. This may include using providers that rely on
            adequacy regulations, the UK International Data Transfer Agreement,
            the UK Addendum to the EU Standard Contractual Clauses, or other
            appropriate safeguards.
          </p>

          <h2 className={styles.subtitle}>
            How long we keep personal information
          </h2>
          <p>We keep personal information only for as long as we need it.</p>
          <p>
            For interest registrations, we normally keep your details for up to
            24 months from the date you registered or from your last meaningful
            interaction with us.
          </p>
          <p>
            If you become involved in a future Retina trial, we may provide
            updated privacy information and may keep relevant data for a
            different period.
          </p>
          <p>
            If you unsubscribe from updates, we will remove you from active
            update emails. We may keep a minimal record of your unsubscribe
            request where necessary to make sure we respect your preference.
          </p>
          <p>
            If you contact us with an enquiry, we normally keep the
            correspondence for up to 24 months unless we need to keep it longer
            for legal, accounting, security, or dispute-related reasons.
          </p>
          <p>
            Technical logs are normally kept for a limited period unless needed
            to investigate security, abuse, or technical issues.
          </p>

          <h2 className={styles.subtitle}>
            How we protect personal information
          </h2>
          <p>We take reasonable steps to protect personal information.</p>
          <p>
            This includes using trusted service providers, access controls,
            secure authentication, encrypted connections where appropriate, and
            limiting access to personal information to those who need it.
          </p>
          <p>
            No website, database, or online service can be guaranteed to be
            completely secure. However, we take privacy and security seriously
            and aim to build LiveAxis in a careful, responsible way from the
            beginning.
          </p>

          <h2 className={styles.subtitle}>Your rights</h2>
          <p>
            Under UK data protection law, you have rights over your personal
            information.
          </p>
          <p>Depending on the circumstances, you may have the right to:</p>
          <ul>
            <li>Ask for a copy of your personal information.</li>
            <li>Ask us to correct inaccurate or incomplete information.</li>
            <li>Ask us to delete your personal information.</li>
            <li>Ask us to restrict how we use your information.</li>
            <li>Object to how we use your information.</li>
            <li>Withdraw consent where we rely on consent.</li>
            <li>Withdraw consent where we rely on consent.</li>
            <li>
              Ask for your information to be transferred to another
              organisation.
            </li>
            <li>Complain to the Information Commissioner&apos;s Office.</li>
          </ul>

          <p>
            To make a request, contact:{" "}
            <a href="mailto:privacy@liveaxis.co.uk">privacy@liveaxis.co.uk</a>
          </p>
          <p>
            We may need to verify your identity before responding to certain
            requests.
          </p>

          <h2 className={styles.subtitle}>
            Withdrawing consent and unsubscribing
          </h2>
          <p>
            If you have chosen to receive updates from LiveAxis, you can
            unsubscribe at any time using the link included in our emails.
          </p>
          <p>
            You can also contact us at:{" "}
            <a href="mailto:privacy@liveaxis.co.uk">privacy@liveaxis.co.uk</a>
          </p>
          <p>
            Withdrawing consent does not affect anything we did before consent
            was withdrawn.
          </p>

          <h2 className={styles.subtitle}>Cookies and similar technologies</h2>
          <p>The LiveAxis website may use cookies or similar technologies.</p>
          <p>
            Essential cookies and similar technologies may be used where needed
            to make the website work, protect the website, remember privacy
            choices, or provide security.
          </p>
          <p>We do not use advertising cookies.</p>
          <p>
            We intend to use Google Analytics to understand how people use the
            website. Where Google Analytics uses cookies or similar
            technologies, we will ask for your consent before enabling them
            unless the law allows otherwise.
          </p>
          <p>
            You can control cookies through your browser settings. If you block
            some cookies, parts of the website may not work as intended.
          </p>

          <h2 className={styles.subtitle}>Google Analytics</h2>
          <p>
            We use Google Analytics to help us understand how visitors use the
            LiveAxis website.
          </p>
          <p>
            This helps us improve the website, understand which content is
            useful, and make better decisions about LiveAxis and Retina.
          </p>
          <p>
            Google Analytics information is used in an aggregated way. We do not
            use it to personally identify individual visitors.
          </p>
          <p>
            Where required, Google Analytics will only run after you have given
            consent.
          </p>

          <h2 className={styles.subtitle}>Google reCAPTCHA</h2>
          <p>
            We use Google reCAPTCHA to help protect our forms from spam and
            automated abuse.
          </p>
          <p>
            reCAPTCHA may process technical information about your device,
            browser, and interaction with the website to help determine whether
            a submission is genuine.
          </p>
          <p>
            This helps us keep the website secure and protects the integrity of
            our register your interest form.
          </p>

          <h2 className={styles.subtitle}>Future Retina privacy information</h2>
          <p>
            Retina is the digital signage platform being developed by LiveAxis.
          </p>
          <p>
            Retina may involve additional personal information and business
            data, such as business account details, user accounts, uploaded
            content, media files, screen/device information, schedules,
            playlists, activity logs, and support information.
          </p>
          <p>
            Because Retina is not yet fully built, this Privacy Policy does not
            attempt to cover all future product processing in detail.
          </p>
          <p>
            Before Retina is made available for trials or customers, we will
            provide appropriate privacy information explaining what data Retina
            collects, how it is used, how it is protected, and what
            responsibilities apply to LiveAxis and trial businesses.
          </p>

          <h2 className={styles.subtitle}>
            Content uploaded to Retina in the future
          </h2>
          <p>
            When Retina becomes available, businesses may be able to upload and
            display their own content.
          </p>
          <p>
            Some uploaded content could contain personal information, such as
            names, images of people, staff information, visitor information, or
            event-related details.
          </p>
          <p>
            LiveAxis will design Retina with security and access controls in
            mind. However, businesses using Retina will also need to make sure
            they have the right to upload and display the content they choose to
            use.
          </p>
          <p>
            This will be explained further in future Retina terms and privacy
            information.
          </p>

          <h2 className={styles.subtitle}>Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy as LiveAxis develops, our website
            changes, our suppliers change, or legal requirements evolve.
          </p>
          <p>The latest version will be published on this page.</p>
          <p>
            If we make significant changes, we will take reasonable steps to
            make them clear.
          </p>

          <h2 className={styles.subtitle}>Complaints</h2>
          <p>
            We would appreciate the opportunity to resolve any privacy concern
            directly first.
          </p>
          <p>
            You can contact us at:{" "}
            <a href="mailto:privacy@liveaxis.co.uk">privacy@liveaxis.co.uk</a>
          </p>
          <p>
            You also have the right to complain to the Information
            Commissioner&apos;s Office, the UK regulator for data protection.
          </p>

          <h2 className={styles.subtitle}>Contact us</h2>
          <p>
            For any questions about this Privacy Policy or how LiveAxis uses
            personal information, contact:{" "}
            <a href="mailto:privacy@liveaxis.co.uk">privacy@liveaxis.co.uk</a>
          </p>
          <p>
            Thank you for trusting LiveAxis with your information. We are
            grateful for your interest and will treat your personal data with
            the care and respect it deserves.
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
}
