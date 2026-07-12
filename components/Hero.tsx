"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const textVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.12 },
  },
};

export function Hero() {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const gradientText =
    "bg-[linear-gradient(100deg,#7b53ad_0%,#d438f5_54%,#55a7ff_108%)] bg-clip-text text-transparent";
  const buttonBase =
    "inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-lg px-5 py-3 text-[0.95rem] font-extrabold text-white shadow-[7px_8px_0_rgba(31,42,68,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[9px_10px_0_rgba(31,42,68,0.16)] active:translate-y-px active:scale-[0.98] active:shadow-[3px_4px_0_rgba(31,42,68,0.16)] sm:min-w-[138px] sm:flex-none";

  return (
    <section
      className="scroll-mt-20 overflow-hidden bg-[#eef3f8] pb-16 pt-[92px] lg:min-h-[760px] lg:pt-[106px]"
      id="home"
    >
      <div className="mx-auto grid min-h-[560px] w-full max-w-[1180px] items-center gap-[clamp(34px,6vw,88px)] px-[22px] lg:grid-cols-[minmax(0,0.98fr)_minmax(340px,1.02fr)] lg:px-[54px]">
        <motion.div
          className="max-w-[760px] pt-9 lg:pt-0"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
        >
          <motion.h1 variants={textVariants}>
            <span className="block max-w-[720px] text-[clamp(2.05rem,8.6vw,2.8rem)] font-extrabold leading-[1.18] text-[#111827] lg:text-[clamp(2.35rem,3.3vw,3.45rem)]">
              Hi, I&apos;m Cheurn <span className={gradientText}>Lyheng</span>
              <br />
              I&apos;m a full-stack <span className={gradientText}>developer</span>
              <br />
              and specialize in <span className={gradientText}>UX/UI</span>
              <br />
              designer.
            </span>
          </motion.h1>

          <motion.div className="mt-[34px] flex flex-wrap gap-3.5 sm:mt-[54px] sm:gap-7" variants={textVariants}>
            <button
              className={`${buttonBase} bg-[#172338]`}
              type="button"
              onClick={() => scrollTo("#contact")}
            >
              Contact me
            </button>
            <button
              className={`${buttonBase} bg-gradient-to-r from-[#ff35f2] to-[#a85cff]`}
              type="button"
              onClick={() => scrollTo("#about")}
            >
              About me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-[540px] justify-self-center before:absolute before:bottom-[18px] before:left-[4%] before:right-0 before:top-[38px] before:rounded-[54%_46%_48%_52%] before:bg-[radial-gradient(circle_at_68%_22%,rgba(255,255,255,0.28),transparent_27%),linear-gradient(145deg,#dea4ee_0%,#a268ba_100%)] before:shadow-[12px_16px_0_rgba(31,42,68,0.16)] before:content-[''] lg:max-w-[610px] lg:justify-self-end lg:before:bottom-[26px] lg:before:left-[7%] lg:before:top-[50px]"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <motion.div
            className="relative z-[1]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              className="ml-auto h-auto w-[min(100%,620px)] drop-shadow-[0_20px_0_rgba(31,42,68,0.18)]"
              src="/images/me.png"
              alt="Cheurn Lyheng"
              width={760}
              height={760}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
