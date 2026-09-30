"use client";

import Script from "next/script";
import { useRef, useState, type SubmitEvent } from "react";

type Country = { label: string; value: string };

const AC_FORM_URL = "https://ac.strategic.ae/proc.php";
const RECAPTCHA_SITE_KEY = "6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go";

const fieldClass = "flex flex-col gap-1";
const labelClass = "text-sm font-medium text-black";
// Underlined fields read like a spec sheet. `user-invalid:` only kicks in after
// the user has interacted with the field (or tried to submit).
const controlClass =
  "w-full rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-base text-black placeholder:text-black/50 outline-none transition-[border-color,box-shadow] duration-200 hover:border-black focus:border-black focus:shadow-[0_1px_0_0_#000] user-invalid:border-red-600 user-invalid:shadow-[0_1px_0_0_#dc2626]";
const legendClass =
  "font-heading text-3xl font-semibold leading-none text-black md:text-4xl";

const SERVICES = [
  "Customized Stand Booking",
  "Event Services",
  "Audio Visual Service",
  "Furniture Rental",
  "Official Contractor",
];

export default function ContactForm({
  CountriesData,
  CountriesCode,
  mainsource,
  subsource,
}: {
  CountriesData: Country[];
  CountriesCode: Country[];
  mainsource: string;
  subsource: string;
}) {
  const [captchaOk, setCaptchaOk] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const captchaRef = useRef<HTMLDivElement>(null);

  function renderCaptcha() {
    const { grecaptcha } = window as any;
    grecaptcha.ready(() =>
      grecaptcha.render(captchaRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: () => setCaptchaOk(true),
        "expired-callback": () => setCaptchaOk(false),
      }),
    );
  }

  // Only runs once the browser's built-in validation (required, type="email") passes.
  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget); // includes g-recaptcha-response
    setStatus("sending");
    try {
      // ActiveCampaign sends no CORS headers, so the response is unreadable;
      // a resolved fetch means the submission reached the server.
      await fetch(AC_FORM_URL, { method: "POST", mode: "no-cors", body: data });
      setStatus("sent");
    } catch {
      setStatus("error");
      // reCAPTCHA tokens are single-use, so ask for a fresh one.
      (window as any).grecaptcha.reset();
      setCaptchaOk(false);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-6 lg:py-10">
        <h2 className="font-heading text-6xl leading-[0.9] font-semibold text-black md:text-8xl">
          Thank you.
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-black/70">
          We&apos;ve received your brief and will be in touch shortly. If it
          can&apos;t wait, write to{" "}
          <a
            href="mailto:info@creation-house.ae"
            className="font-medium text-black underline decoration-primary decoration-2 underline-offset-4"
          >
            info@creation-house.ae
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        onReady={renderCaptcha}
      />

      <form
        method="POST"
        action={AC_FORM_URL}
        onSubmit={handleSubmit}
        className="grid gap-12"
      >
        {/* ActiveCampaign form 488 config; field[N] ids map to AC custom fields. */}
        <input type="hidden" name="u" value="488" />
        <input type="hidden" name="f" value="488" />
        <input type="hidden" name="s" />
        <input type="hidden" name="c" value="0" />
        <input type="hidden" name="m" value="0" />
        <input type="hidden" name="act" value="sub" />
        <input type="hidden" name="v" value="2" />
        <input
          type="hidden"
          name="or"
          value="08c1a538-e61e-43d8-bf03-6506bf3d1dbc"
        />
        <input
          type="hidden"
          name="field[38]"
          value="Creation House 2026 - Contact Us"
        />
        <input type="hidden" name="field[328]" value={mainsource} />
        <input type="hidden" name="field[329]" value={subsource} />
        <input type="hidden" name="leadType" value="Creation House Lead" />

        {/* Service: five options, so all stay visible instead of hiding in a dropdown. */}
        <fieldset className="grid gap-5">
          <legend className={`${legendClass} mb-5`}>
            What do you need? <span className="sr-only">(required)</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.map((service, i) => (
              <div key={service} className="relative">
                <input
                  type="radio"
                  id={`service-${i}`}
                  name="field[360]"
                  value={service}
                  required
                  className="peer sr-only"
                />
                <label
                  htmlFor={`service-${i}`}
                  className="inline-flex min-h-12 cursor-pointer items-center rounded-full border border-black/30 px-5 text-[15px] font-medium text-black transition-[background-color,border-color,color] duration-200 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-black"
                >
                  {service}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-x-8 gap-y-7 md:grid-cols-2">
          <legend className={`${legendClass} mb-5 md:col-span-2`}>
            Who should we talk to?
          </legend>

          {/* First Name */}
          <div className={fieldClass}>
            <label htmlFor="firstname" className={labelClass}>
              First name <span className="text-red-600">*</span>
            </label>
            <input
              id="firstname"
              name="firstname"
              required
              autoComplete="given-name"
              className={controlClass}
            />
          </div>

          {/* Last Name */}
          <div className={fieldClass}>
            <label htmlFor="lastname" className={labelClass}>
              Last name <span className="text-red-600">*</span>
            </label>
            <input
              id="lastname"
              name="lastname"
              required
              autoComplete="family-name"
              className={controlClass}
            />
          </div>

          {/* Organization */}
          <div className={fieldClass}>
            <label htmlFor="customer_account" className={labelClass}>
              Company <span className="text-red-600">*</span>
            </label>
            <input
              id="customer_account"
              name="customer_account"
              required
              autoComplete="organization"
              className={controlClass}
            />
          </div>

          {/* Email */}
          <div className={fieldClass}>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className={controlClass}
            />
          </div>

          {/* Phone */}
          <div className={fieldClass}>
            <label htmlFor="field[12]" className={labelClass}>
              Mobile phone <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-[6.5rem_1fr] gap-4">
              <div className="relative">
                <select
                  name="phoneCode"
                  required
                  aria-label="Phone country code"
                  className={`${controlClass} appearance-none pr-7`}
                >
                  <option value="">Code</option>
                  {CountriesCode.map((c, i) => (
                    <option key={i} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
              <input
                id="field[12]"
                name="field[12]"
                required
                type="tel"
                autoComplete="tel-national"
                placeholder="Phone number"
                className={controlClass}
              />
            </div>
          </div>

          {/* Country */}
          <div className={fieldClass}>
            <label htmlFor="field[3]" className={labelClass}>
              Country <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <select
                id="field[3]"
                name="field[3]"
                required
                autoComplete="country-name"
                className={`${controlClass} appearance-none pr-7`}
              >
                <option value="">Select country</option>
                {CountriesData.map((c, i) => (
                  <option key={i} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </fieldset>

        <div className="grid gap-5">
          <div className={fieldClass}>
            <label htmlFor="field[6]" className={`${legendClass} mb-4`}>
              Tell us about the project
            </label>
            <textarea
              id="field[6]"
              name="field[6]"
              rows={4}
              placeholder="Event or show, dates, venue, stand size, budget range"
              className={`${controlClass} resize-y`}
            />
          </div>
        </div>

        {/* reCAPTCHA + Submit */}
        <div className="flex flex-col items-start gap-6">
          <div ref={captchaRef} className="max-w-full overflow-x-auto" />

          {status === "error" && (
            <p role="alert" className="text-sm font-medium text-red-700">
              Your message didn&apos;t send. Check your connection and try
              again, or email info@creation-house.ae.
            </p>
          )}

          <button
            disabled={!captchaOk || status === "sending"}
            type="submit"
            className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-full bg-primary px-10 text-base font-semibold tracking-normal text-black shadow-[0_18px_46px_-20px_rgba(139,226,198,.9)] transition-[translate,box-shadow,opacity] duration-300 ease-expo hover:-translate-y-0.5 hover:shadow-[0_24px_54px_-18px_rgba(139,226,198,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 max-sm:w-full"
          >
            {status === "sending" ? "Sending…" : "Send brief"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-black/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}
