import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/for-job-seekers", label: "For Job Seekers" },
  { href: "/for-employers", label: "For Employers" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
            aria-hidden
          />
          <span className="text-xl font-bold text-lime-700">JobPortal</span>
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 transition hover:text-lime-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
