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
      setNotice("Message sent successfully. I will get back to you shortly.");
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Message could not be sent.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs sm:text-sm font-medium text-white placeholder:text-white/35 focus:border-white/60 focus:bg-white/[0.08] focus:outline-none transition-all";
  const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1.5";

  return (
    <section
      className="relative scroll-mt-28 overflow-hidden bg-[#10100F] py-20 text-white selection:bg-white selection:text-[#10100F] sm:scroll-mt-20 lg:py-28 border-t border-white/10"
      id="contact"
    >
      {/* Background Ambience */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/images/contactmebackground.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#10100F]/55" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-start gap-12 sm:gap-16 px-5 sm:px-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(360px,1.15fr)] lg:px-[54px]">
        {/* Left Info Column */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AVAILABLE FOR OPPORTUNITIES
          </span>

          <h2 className="mb-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Let&apos;s Get In Touch.
          </h2>
          <p className="mb-10 text-sm sm:text-base text-white/60 font-medium leading-relaxed max-w-md">
            Have a project in mind, need a full-stack engineer, or want to discuss a potential collaboration? Reach out directly.
          </p>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                Email
              </h3>
              <a
                className="text-sm sm:text-base font-bold text-white/90 hover:text-white transition-colors"
                href="mailto:cheurnlyheng@gmail.com"
              >
                cheurnlyheng@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                Phone
              </h3>
              <a
                className="text-sm sm:text-base font-bold text-white/90 hover:text-white transition-colors"
                href="tel:+85517400085"
              >
                +(855) 17400085
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                Profiles &amp; Socials
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social, index) => (
                  <motion.a
                    href={social.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#10100F] transition-[background-color,color]"
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
                      className="h-3.5 w-3.5 object-contain"
                      src={social.icon}
                      alt=""
                      aria-hidden="true"
                    />
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form Column */}
        <motion.form
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-10 space-y-5"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              DIRECT MESSAGE
            </span>
            <h3 className="mt-1 text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Send a Message
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Name</label>
              <input
                className={inputClass}
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Subject</label>
              <input
                className={inputClass}
                name="subject"
                placeholder="Freelance project"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Email</label>
              <input
                className={inputClass}
                name="email"
                type="email"
                placeholder="youremail@gmail.com"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Phone (Optional)</label>
              <input
                className={inputClass}
                name="phone"
                type="tel"
                placeholder="+12 345678"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Message</label>
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              name="message"
              placeholder="Tell me about your project, timeline, and vision..."
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              required
            />
          </div>

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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#10100F] px-8 py-3.5 text-xs font-black uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="h-4 w-4 rounded-full border-2 border-[#10100F]/30 border-t-[#10100F] animate-spin" />
            ) : (
              <Icon name="send" className="h-4 w-4" />
            )}
            <span>{status === "loading" ? "SENDING..." : "SEND MESSAGE"}</span>
          </button>

          {notice && (
            <motion.p
              className={`rounded-xl border p-4 text-xs font-bold leading-relaxed ${
                status === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {notice}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
