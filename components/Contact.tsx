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
  const labelClass = "grid gap-[6px]";
  const fieldClass =
    "w-full border-b-2 border-[#17161a]/20 bg-transparent px-0.5 py-2 font-bold text-[#17161a] outline-0 transition placeholder:text-[#17161a]/30 focus:border-[#2f5d4b]";
  const labelTextClass = "text-[0.8rem] font-extrabold uppercase tracking-[0.08em] text-[#17161a]/45";

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
    <section className="relative scroll-mt-28 border-t border-[#17161a]/10 py-20 sm:scroll-mt-20 lg:py-28" id="contact">
      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-[clamp(40px,7vw,80px)] px-5 sm:px-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1fr)] lg:px-[54px]">
        <motion.div
          className="text-[#17161a]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-end gap-4 sm:gap-5">
            <span className="text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-none text-[#17161a]/10">05</span>
            <p className="text-[0.8rem] font-extrabold uppercase tracking-[0.18em] text-[#2f5d4b]">Contact</p>
          </div>
          <h2 className="mb-5 max-w-[480px] text-[clamp(2.4rem,7vw,3.2rem)] font-extrabold leading-[1.05]">
            Let&apos;s <span className="italic text-[#2f5d4b]">get in touch</span>
          </h2>
          <p className="mb-10 text-[clamp(1rem,2vw,1.15rem)] font-semibold text-[#17161a]/55">
            Feel free to give me a dm.
          </p>

          <div className="grid gap-7">
            <div>
              <h3 className="mb-2 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#17161a]/40">
                Phone
              </h3>
              <a
                className="text-[clamp(0.95rem,1.3vw,1.05rem)] font-bold text-[#17161a]/80 transition hover:text-[#2f5d4b]"
                href="tel:+85517400085"
              >
                +(855) 17400085
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#17161a]/40">
                Email
              </h3>
              <a
                className="text-[clamp(0.95rem,1.3vw,1.05rem)] font-bold text-[#17161a]/80 transition hover:text-[#2f5d4b]"
                href="mailto:cheurnlyheng@gmail.com"
              >
                cheurnlyheng@gmail.com
              </a>
            </div>
            <div>
              <h3 className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#17161a]/40">
                Links
              </h3>
              <div className="flex gap-2.5">
                {socials.map((social, index) => (
                  <motion.a
                    href={social.href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#17161a]/15 bg-[#ffffff] p-2 transition hover:-translate-y-1 hover:border-[#2f5d4b]/50"
                    key={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={`${social.label}: ${social.value}`}
                    title={social.value}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <img
                      className="h-full w-full object-contain"
                      src={social.icon}
                      alt=""
                      aria-hidden="true"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="grid gap-6 border-t-2 border-[#17161a] pt-8"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="m-0 text-[clamp(1.5rem,2.6vw,1.9rem)] font-extrabold leading-none text-[#17161a]">
            Send a message
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
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
              className={`${fieldClass} min-h-[110px] resize-y`}
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

          <motion.button
            className="mt-1.5 inline-flex min-h-[48px] min-w-[172px] items-center justify-center gap-[9px] rounded-full bg-[#17161a] px-[22px] py-3 font-extrabold text-[#faf9f6] transition hover:bg-[#2f5d4b] disabled:cursor-not-allowed disabled:opacity-60 disabled:grayscale"
            type="submit"
            disabled={status === "loading"}
            whileHover={status === "loading" ? undefined : { scale: 1.02 }}
            whileTap={status === "loading" ? undefined : { scale: 0.97 }}
          >
            {status === "loading" ? (
              <motion.span
                className="h-[18px] w-[18px] rounded-full border-2 border-[#faf9f6]/40 border-t-[#faf9f6]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <Icon name="send" className="h-[18px] w-[18px]" />
            )}
            {status === "loading" ? "Sending..." : "Send message"}
          </motion.button>

          {notice ? (
            <motion.p
              className={`m-0 border-l-2 px-3.5 py-2.5 text-[0.95rem] font-bold leading-[1.25] ${
                status === "success"
                  ? "border-[#3f7d54] bg-[#3f7d54]/10 text-[#2c5c3d]"
                  : "border-[#2f5d4b] bg-[#2f5d4b]/10 text-[#1c3f32]"
              }`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {notice}
            </motion.p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
