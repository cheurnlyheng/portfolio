import { navItems } from "@/data/navigation";
import { socials } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#17161a] py-16 text-[#faf9f6] lg:py-20">
      <div className="mx-auto grid max-w-[1050px] gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[minmax(220px,1fr)_minmax(140px,0.55fr)_minmax(140px,0.55fr)] lg:px-[54px]">
        <div>
          <h2 className="mb-3 text-[clamp(1.5rem,2.1vw,1.85rem)] font-extrabold leading-none">
            Cheurn Lyheng
          </h2>
          <p className="m-0 max-w-[280px] text-sm font-semibold text-[#faf9f6]/50">
            Full-stack developer &amp; UI/UX designer. Feel free to reach out anytime.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#faf9f6]/40">
            Navigation
          </h3>
          <ul className="grid list-none gap-2 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="text-sm font-bold text-[#faf9f6]/70 transition hover:text-[#6fa390]"
                  href={`/${item.href}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#faf9f6]/40">
            Contacts
          </h3>
          <ul className="grid list-none gap-2 p-0">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  className="text-sm font-bold text-[#faf9f6]/70 transition hover:text-[#6fa390]"
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1050px] border-t border-[#faf9f6]/12 px-5 pt-6 sm:px-8 lg:px-[54px]">
        <p className="m-0 text-xs font-semibold text-[#faf9f6]/35">
          © {year} Cheurn Lyheng. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
