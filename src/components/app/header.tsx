import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 bg-card border-b">
      <div className="container mx-auto text-center">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-pixel text-primary uppercase text-glow">
            Portal Retro Games
          </h1>
        </Link>
      </div>
    </header>
  );
}
