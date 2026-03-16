import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { sponsorLogos } from "@/data/programs";

const donateUrl = "https://www.paypal.com/donate?hosted_button_id=MP3B43MDN7H2N";
const judgeSignupUrl = "https://insightsscrsef.stemwizard.com/public_site/home/insightsscrsef";

const socials = [
  { href: "https://www.instagram.com/insightselpaso/?hl=es", label: "Instagram", icon: FaInstagram },
  { href: "https://www.facebook.com/insightselpaso", label: "Facebook", icon: FaFacebookF }
];

const pendingSocials = [
  { label: "LinkedIn", icon: FaLinkedinIn }
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-brand-ink/10 bg-brand-ink text-white">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">INSIGHTS Science Discovery</p>
            <h2 className="max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">A premium nonprofit experience built to spotlight discovery, access, and community momentum.</h2>
            <p className="max-w-2xl text-white/68">The core experience is live. Next we can replace placeholder contact copy, sponsor names, and newsletter handling with the final organization details.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Contact</p>
              <div className="mt-4 space-y-2 text-sm text-white/74">
                <p>El Paso, Texas</p>
                <p>
                  <a href="mailto:hello@insightsdiscovery.org" className="transition hover:text-brand-gold">hello@insightsdiscovery.org</a>
                </p>
                <p>
                  <a href="tel:+19155550114" className="transition hover:text-brand-gold">(915) 555-0114</a>
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Navigate</p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-white/74">
                <Link href="/" className="transition hover:text-brand-gold">Home</Link>
                <Link href="/about" className="transition hover:text-brand-gold">About</Link>
                <Link href="/programs" className="transition hover:text-brand-gold">Programs</Link>
                <Link href="/connect" className="transition hover:text-brand-gold">Connect</Link>
                <a href={judgeSignupUrl} target="_blank" rel="noreferrer" className="transition hover:text-brand-gold">Judge Sign Up</a>
                <a href={donateUrl} target="_blank" rel="noreferrer" className="transition hover:text-brand-gold">Donate</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Follow</p>
              <div className="mt-4 flex gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/78 transition hover:border-brand-gold/60 hover:text-brand-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
                {pendingSocials.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    aria-label={`${label} coming soon`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/35"
                    title={`${label} link coming soon`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">Newsletter</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Stay connected to new programs and discoveries.</h3>
            <p className="mt-3 text-sm text-white/65">The email capture design is in place. We can connect it next to Mailchimp, ConvertKit, Squarespace Email Campaigns, or another newsletter tool.</p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/45"
              />
              <button type="submit" className="rounded-full bg-brand-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e4674a]">Sign Up</button>
            </form>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Sponsors</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/74 sm:grid-cols-3">
              {sponsorLogos.map((logo) => (
                <div key={logo} className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-5 text-center">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
