import { navItems } from "@/data/navigation";
import { socials } from "@/data/socials";

export function Footer() {
  return (
    <footer className="bg-[#172338] py-[72px] text-white lg:py-[78px]">
      <div className="mx-auto grid max-w-[1050px] gap-9 px-[22px] sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_minmax(140px,0.55fr)_minmax(140px,0.55fr)] lg:px-[54px]">
        <div>
          <h2 className="mb-2.5 text-[clamp(1.5rem,2.1vw,1.85rem)] leading-none">
            Portfolio
          </h2>
          <p className="m-0 text-sm text-white/70">Feel free to contact me!</p>
        </div>
        <div>
          <h3 className="mb-3 text-[clamp(1rem,1.4vw,1.15rem)]">Navigation</h3>
          <ul className="grid list-none gap-1.5 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="text-sm text-white/70 hover:text-white" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-[clamp(1rem,1.4vw,1.15rem)]">Contacts</h3>
          <ul className="grid list-none gap-1.5 p-0">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  className="text-sm text-white/70 hover:text-white"
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
    </footer>
  );
}
