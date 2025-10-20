import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Link href="/">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-pixel text-primary uppercase text-glow">
            Portal Retro Games
          </h1>
        </Link>
      </div>
    </header>
  );
}
