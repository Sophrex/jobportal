import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/for-job-seekers", label: "For Workers" },
  { href: "/for-employers", label: "For Hirers" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-green-100/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="Travailleso"
            width={36}
            height={36}
            className="h-9 w-9"
            aria-hidden
          />
          <span className="text-xl font-bold tracking-tight text-green-800">Travailleso</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-green-50 hover:text-green-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/jobs"
          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700"
        >
          Find work
        </Link>
      </div>
    </header>
  );
}
