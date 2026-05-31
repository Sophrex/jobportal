import Link from "next/link";

const footerLinks = [
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/for-job-seekers", label: "For Job Seekers" },
  { href: "/for-employers", label: "For Employers" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-900 text-zinc-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-lg font-bold text-white">JobPortal</p>
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition hover:text-lime-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} JobPortal. Find your next opportunity.
        </p>
      </div>
    </footer>
  );
}
