export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} JobPortal. Find your next opportunity.
      </div>
    </footer>
  );
}
