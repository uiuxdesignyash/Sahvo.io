import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Sahvo collects, uses, and protects your data under India\'s DPDP Act 2023.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] pt-28 pb-16">
      <Container className="max-w-[720px]">
        <article className="font-[family-name:var(--font-figtree)] text-[15px] leading-[1.75] text-[var(--color-text-primary)]">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Last updated: 31 July 2026
          </p>

          <p className="mt-8">
            Sahvo is a pre-launch product. This site does one thing with your data: it
            takes an email address so we can tell you when the Jaipur pilot opens, and it
            takes questions so we can answer them.
          </p>
          <p className="mt-3">
            This policy describes exactly that. It is short because we collect very little.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Who we are</h2>
          <p className="mt-3">
            Sahvo is an early-stage project based in Jaipur, Rajasthan, India, building a
            mobile safety and price-transparency app for travellers in India. The app has
            not launched.
          </p>
          <p className="mt-3">
            For anything in this policy, including requests to see or delete your data,
            contact{' '}
            <a
              href="mailto:sahvo.app@gmail.com"
              className="underline underline-offset-2 hover:text-[var(--color-brand-primary)] transition-colors duration-150"
            >
              sahvo.app@gmail.com
            </a>
            .
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">What we collect, and why</h2>

          <h3 className="mt-6 text-lg font-semibold">If you join the early-access list</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="py-2 pr-4 font-semibold">What</th>
                  <th className="py-2 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Your email address</td>
                  <td className="py-2">To email you when the Jaipur pilot opens</td>
                </tr>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Which form you used (hero or page)</td>
                  <td className="py-2">To understand which part of the site works</td>
                </tr>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Date and time of submission</td>
                  <td className="py-2">To keep the list in order</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-lg font-semibold">If you send us a question</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="py-2 pr-4 font-semibold">What</th>
                  <th className="py-2 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Your email address</td>
                  <td className="py-2">To reply to you</td>
                </tr>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Your name, if you give one</td>
                  <td className="py-2">Optional. To address the reply</td>
                </tr>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Your question</td>
                  <td className="py-2">To answer it</td>
                </tr>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <td className="py-2 pr-4">Date and time of submission</td>
                  <td className="py-2">To track response times</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-lg font-semibold">If you simply visit the site</h3>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            We use Google Analytics, which sets cookies and collects your approximate
            location, device type, browser, and which pages you viewed. We use this to see
            whether people find the site useful. We do not use it to identify you, and we
            do not send your email address or any other personal detail to Google
            Analytics.
          </p>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Our hosting provider, Vercel, keeps standard server logs, which include IP
            addresses. This is ordinary web infrastructure and we do not analyse those logs.
          </p>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            <strong>We do not collect anything else.</strong> No location tracking, no advertising
            pixels, no profiling, no data purchased from anyone else.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">What we do with it</h2>
          <p className="mt-3">
            We email you about Sahvo&apos;s launch. That is the only reason we hold your email
            address.
          </p>
          <p className="mt-3">We will not:</p>
          <ul className="mt-2 ml-6 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>sell your data, or share it with advertisers or data brokers</li>
            <li>add you to any marketing list beyond launch updates</li>
            <li>send you anything unrelated to Sahvo</li>
            <li>use your data to train any model</li>
          </ul>
          <p className="mt-3">
            If we ever want to use your email for something other than launch updates, we
            will ask you first.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Who can see it</h2>
          <p className="mt-3">
            Waitlist entries and questions are stored in a private Google Sheet. Only
            Sahvo&apos;s founders can open it.
          </p>
          <p className="mt-3">
            The services that necessarily process this data on our behalf are:
          </p>
          <ul className="mt-2 ml-6 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>
              <strong>Google</strong> — Sheets and Apps Script store the entries, Gmail delivers
              question notifications, Analytics measures site usage
            </li>
            <li>
              <strong>Vercel</strong> — hosts the website
            </li>
          </ul>
          <p className="mt-3">
            Because these are global services, your data may be stored or processed outside
            India.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">How long we keep it</h2>
          <p className="mt-3">
            <strong>Waitlist emails:</strong> until the Jaipur pilot launches and we have told you, or
            24 months from the date you signed up — whichever comes first. If the pilot has
            not launched within 24 months, we delete the list. We would rather delete your
            address than hold it indefinitely for a product that did not ship.
          </p>
          <p className="mt-3">
            <strong>Questions:</strong> 12 months after we reply, then deleted.
          </p>
          <p className="mt-3">
            You can ask us to delete your data before either of these points, and we will.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Your rights</h2>
          <p className="mt-3">
            Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask us to:
          </p>
          <ul className="mt-2 ml-6 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>tell you what data we hold about you</li>
            <li>correct anything inaccurate</li>
            <li>delete your data</li>
            <li>withdraw your consent, at any time and without giving a reason</li>
            <li>nominate someone to exercise these rights on your behalf if you cannot</li>
            <li>raise a grievance if you are unhappy with how we have handled your data</li>
          </ul>
          <p className="mt-3">
            Email{' '}
            <a
              href="mailto:sahvo.app@gmail.com"
              className="underline underline-offset-2 hover:text-[var(--color-brand-primary)] transition-colors duration-150"
            >
              sahvo.app@gmail.com
            </a>
            . We aim to reply within 7 days and to act within
            30. There is no charge, and you do not need to explain why.
          </p>
          <p className="mt-3">
            Withdrawing consent means we stop emailing you and remove you from the list. It
            does not affect anything we did lawfully before you withdrew.
          </p>
          <p className="mt-3">
            If you are not satisfied with our response, you may complain to the Data
            Protection Board of India.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Children</h2>
          <p className="mt-3">
            This site is not directed at anyone under 18, and we do not knowingly collect
            data from children. If you believe a child has submitted their details, email
            us and we will delete the entry.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Security</h2>
          <p className="mt-3">
            Access to our records is restricted to Sahvo&apos;s founders and protected by the
            account security of the services above. Form submissions travel over HTTPS and
            are checked server-side before being stored.
          </p>
          <p className="mt-3">
            No system is perfectly secure. If a breach affects your data, we will notify
            you and the Data Protection Board of India as required.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Cookies</h2>
          <p className="mt-3">
            The only cookies this site sets are Google Analytics measurement cookies. You
            can block them in your browser settings, or use a browser extension, without
            losing any functionality — nothing on this site requires cookies to work.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Changes</h2>
          <p className="mt-3">
            If we change this policy in a way that affects how we use data you have already
            given us, we will email you before the change takes effect. Smaller changes will
            be reflected in the &ldquo;last updated&rdquo; date above.
          </p>

          <hr className="my-10 border-[var(--color-border-subtle)]" />

          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-3">
            <a
              href="mailto:sahvo.app@gmail.com"
              className="underline underline-offset-2 hover:text-[var(--color-brand-primary)] transition-colors duration-150"
            >
              sahvo.app@gmail.com
            </a>
          </p>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            Sahvo · Jaipur, Rajasthan, India
          </p>
        </article>
      </Container>
    </main>
  );
}
