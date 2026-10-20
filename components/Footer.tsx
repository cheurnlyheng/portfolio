import { navItems } from "@/data/navigation";
import { socials } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#10100F] text-white font-sans antialiased border-t border-white/10 selection:bg-white selection:text-[#10100F] relative overflow-hidden">
      {/* Main Navigation Columns */}
      <div className="py-16 sm:py-20 px-5 sm:px-8 lg:px-[54px]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs font-black tracking-[0.2em] text-[#10100F] uppercase shadow-sm">
                LYHENG
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                Full-Stack Developer &amp; UI/UX
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed">
              Student at RUPP crafting clean, resilient, and engaging web applications from concept to production.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold text-white/70">
                <span>Based in Phnom Penh, Cambodia</span>
              </span>
            </div>
          </div>

          {/* Column: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/70 list-none p-0 m-0 font-medium">
              <li>
                <a href="/#home" className="hover:text-white transition-colors block">
                  Home
                </a>
              </li>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={`/${item.href}`} className="hover:text-white transition-colors block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Profiles */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Profiles &amp; Contact
            </h4>
            <ul className="space-y-2 text-xs text-white/70 list-none p-0 m-0 font-medium">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    className="hover:text-white transition-colors block"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:cheurnlyheng@gmail.com"
                  className="hover:text-white transition-colors block text-white/90"
                >
                  cheurnlyheng@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer: Clean Copyright Line */}
      <div className="border-t border-white/10 py-7 px-5 sm:px-8 lg:px-[54px] bg-[#0a0a09]">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <p className="text-[11px] font-medium text-white/40 m-0">
            &copy; {year} CHEURN LYHENG. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Architectural Background Signature Watermark */}
      <div className="w-full flex justify-center items-center py-10 sm:py-14 md:py-16 overflow-hidden select-none pointer-events-none opacity-[0.035] px-4">
        <span className="font-sans font-black text-[8.5vw] sm:text-[9.5vw] md:text-[10.5vw] lg:text-[11vw] leading-none tracking-[0.16em] pl-[0.16em] text-white uppercase whitespace-nowrap text-center">
          LYHENG
        </span>
      </div>
    </footer>
  );
}
