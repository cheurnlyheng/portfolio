"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { socials } from "@/data/socials";
import { Icon } from "@/components/icons/Icon";

type Status = "idle" | "loading" | "success" | "error";

const initialForm = {
  name: "",
  subject: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const labelClass = "grid gap-[5px]";
  const fieldClass =
    "w-full rounded-[7px] border-[1.5px] border-[#1f2a44]/40 bg-white/70 px-2.5 py-2 font-bold text-[#1f2a44] outline-0 transition placeholder:text-[#5b6376]/55 focus:border-[#c12ee9] focus:bg-white focus:shadow-[0_0_0_4px_rgba(230,68,255,0.14)]";
  const labelTextClass = "text-[clamp(0.98rem,1.45vw,1.18rem)] leading-none";

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Message could not be sent.");
      }

      setForm(initialForm);
      setStatus("success");
      setNotice("Message sent. I will receive it in my inbox.");
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Message could not be sent.");
    }
  };

  return (
    <section className="bg-[#f7e5fb] py-14 lg:py-[76px]" id="contact">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-[clamp(36px,7vw,82px)] px-[22px] lg:grid-cols-[minmax(280px,0.86fr)_minmax(360px,1fr)] lg:px-[54px]">
        <motion.div
          className="text-[#1f2a44]"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-7 max-w-[680px] text-[clamp(3.05rem,15vw,4.7rem)] leading-[0.98] lg:max-w-[570px] lg:text-[clamp(3.6rem,8vw,7.1rem)]">
            Let&apos;s get in touch
          </h2>
          <p className="mb-10 text-[clamp(1.55rem,8vw,2.2rem)] leading-[1.08] lg:text-[clamp(1.8rem,3.4vw,3.1rem)]">
            Feel free to give me a dm.
          </p>

          <div className="grid gap-7">
            <div>
              <h3 className="mb-2 text-[clamp(1rem,1.5vw,1.2rem)]">Phone</h3>
              <a className="text-[clamp(0.92rem,1.3vw,1.02rem)] text-[#465069]" href="tel:+85517400085">
                +(855) 17400085
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-[clamp(1rem,1.5vw,1.2rem)]">Email</h3>
              <a
                className="text-[clamp(0.92rem,1.3vw,1.02rem)] text-[#465069]"
                href="mailto:cheurnlyheng@gmail.com"
              >
                cheurnlyheng@gmail.com
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-[clamp(1rem,1.5vw,1.2rem)]">Links</h3>
              <div className="flex gap-2.5">
                {socials.map((social) => (
                  <a
                    href={social.href}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:-translate-y-0.5 hover:brightness-105"
                    key={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={`${social.label}: ${social.value}`}
                    title={social.value}
                  >
                    <img
                      className="h-8 w-8 object-contain"
                      src={social.icon}
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="grid gap-[13px] rounded-lg border border-white/65 bg-[#f9fbff]/90 px-5 pb-[22px] pt-6 shadow-[8px_10px_0_rgba(31,42,68,0.18)]"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-0.5 text-[clamp(2rem,3.2vw,2.75rem)] leading-none text-[#1f2a44]">
            Contact
          </h2>

          <div className="grid gap-[13px] sm:grid-cols-2 sm:gap-[22px]">
            <label className={labelClass}>
              <span className={labelTextClass}>Name</span>
              <input
                className={fieldClass}
                name="name"
                placeholder="John Smith"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </label>
            <label className={labelClass}>
              <span className={labelTextClass}>Subject</span>
              <input
                className={fieldClass}
                name="subject"
                placeholder="UX/UI + Fullstack"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                required
              />
            </label>
          </div>

          <label className={labelClass}>
            <span className={labelTextClass}>Email</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              placeholder="johnsmith@gmail.com"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
          </label>

          <label className={labelClass}>
            <span className={labelTextClass}>Phone number</span>
            <input
              className={fieldClass}
              name="phone"
              type="tel"
              placeholder="+(855) 17400085"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </label>

          <label className={labelClass}>
            <span className={labelTextClass}>Description</span>
            <textarea
              className={`${fieldClass} min-h-[145px] resize-y`}
              name="message"
              placeholder="Hello, I am contacting here for ..."
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              required
            />
          </label>

          <label className="hidden" aria-hidden="true">
            <span>Company</span>
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </label>

          <button
            className="mt-1.5 inline-flex min-h-[46px] min-w-[172px] items-center justify-center gap-[9px] rounded-lg bg-gradient-to-r from-[#172338] to-[#7031aa] px-[22px] py-3 text-white shadow-[7px_8px_0_rgba(31,42,68,0.18)] transition hover:-translate-y-0.5 hover:shadow-[9px_10px_0_rgba(31,42,68,0.16)] active:translate-y-px active:scale-[0.98] active:shadow-[3px_4px_0_rgba(31,42,68,0.16)] disabled:cursor-not-allowed disabled:opacity-70 disabled:grayscale"
            type="submit"
            disabled={status === "loading"}
          >
            <Icon name="send" className="h-[18px] w-[18px]" />
            {status === "loading" ? "Sending..." : "Send message"}
          </button>

          {notice ? (
            <p
              className={`m-0 rounded-[7px] px-3 py-2.5 text-[0.95rem] leading-[1.25] ${
                status === "success"
                  ? "bg-[#44d68d]/15 text-[#146b43]"
                  : "bg-[#ff4c6e]/15 text-[#9b1b3a]"
              }`}
            >
              {notice}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
