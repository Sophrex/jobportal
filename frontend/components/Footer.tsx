import Link from "next/link";

const footerLinks = [
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/for-job-seekers", label: "For Workers" },
  { href: "/for-employers", label: "For Hirers" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-green-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-lg font-bold text-green-800">Travailleso</p>
            <p className="mt-1 text-sm text-slate-500">Hot jobs for hands-on work.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-slate-600 transition hover:bg-green-50 hover:text-green-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Travailleso
        </p>
      </div>
    </footer>
  );
}
