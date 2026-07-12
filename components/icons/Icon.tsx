import type { ReactNode } from "react";

export type IconName =
  | "design"
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "camera"
  | "edit"
  | "presentation"
  | "spreadsheet"
  | "marketing"
  | "team"
  | "telegram"
  | "google"
  | "facebook"
  | "discord"
  | "send";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconName, ReactNode> = {
  design: (
    <>
      <path d="M4 15.5 14.5 5a2.1 2.1 0 0 1 3 3L7 18.5H4v-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m13 6.5 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  frontend: (
    <>
      <path d="M4 5h16v12H4V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  backend: (
    <>
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  tools: (
    <>
      <path d="M4 8h16v11H4V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 8V5h8v3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  camera: (
    <>
      <path d="M5 8h4l1.5-2h3L15 8h4v10H5V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  edit: (
    <>
      <path d="M4 6h11v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m14 14 5-5 2 2-5 5h-2v-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  presentation: (
    <>
      <path d="M4 5h16v11H4V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 21 12 16l4 5M8 10l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  spreadsheet: (
    <>
      <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v5h4M10 12h5M10 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  marketing: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12h16M12 4c2 2.1 3 4.8 3 8s-1 5.9-3 8M12 4c-2 2.1-3 4.8-3 8s1 5.9 3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10a2.5 2.5 0 1 0 0-5M17 14c2 .4 3.5 2.1 3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  telegram: (
    <path d="m21 4-3.4 16-5.3-4.1-3 2.9.6-4.8L19 6.6 7.1 13.8 2.5 12 21 4Z" fill="currentColor" />
  ),
  google: (
    <>
      <path d="M21 12.2c0-.7-.1-1.4-.2-2H12v3.8h5c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.8-4.1 2.8-7.1Z" fill="currentColor" />
      <path d="M12 21c2.6 0 4.8-.9 6.3-2.3l-3.1-2.4c-.9.6-2 .9-3.2.9-2.5 0-4.6-1.7-5.4-4H3.4v2.5A9.5 9.5 0 0 0 12 21Z" fill="currentColor" />
      <path d="M6.6 13.2a5.7 5.7 0 0 1 0-3.4V7.3H3.4a9.5 9.5 0 0 0 0 8.4l3.2-2.5Z" fill="currentColor" />
      <path d="M12 6.8c1.4 0 2.7.5 3.7 1.5l2.7-2.7A9.1 9.1 0 0 0 12 3 9.5 9.5 0 0 0 3.4 7.3l3.2 2.5c.8-2.3 2.9-4 5.4-4Z" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M14 8h2V4h-3c-3 0-5 1.9-5 5v2H5v4h3v6h4v-6h3l.5-4H12V9.5c0-1 .5-1.5 2-1.5Z" fill="currentColor" />
  ),
  discord: (
    <>
      <path d="M7.5 7.5A13 13 0 0 1 11 7l.3.7c.5-.1 1-.1 1.4 0L13 7a13 13 0 0 1 3.5.5c1.7 2.6 2.2 5.1 2 7.6a12 12 0 0 1-4.2 2.1l-.9-1.4c.5-.2 1-.4 1.4-.7-.3.1-.7.3-1 .4a10 10 0 0 1-3.6 0c-.3-.1-.7-.2-1-.4.4.3.9.5 1.4.7l-.9 1.4a12 12 0 0 1-4.2-2.1c-.2-2.5.3-5 2-7.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12.6h.1M14.4 12.6h.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  send: (
    <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
};
