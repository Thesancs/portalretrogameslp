import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative z-30 border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-3">
          <span className="glow-ring inline-flex items-center justify-center rounded-full bg-secondary/60 p-2">
            <Image
              src="/image/logo.png"
              alt="Portal Retro Games Logo"
              width={58}
              height={32}
              priority
            />
          </span>
          <div className="hidden text-left sm:block">
            <p className="font-pixel text-xs tracking-[0.4em] text-primary uppercase">Portal Retro Games</p>
            <p className="font-body text-sm text-muted-foreground">Reviva a era gamer com estilo</p>
          </div>
        </Link>

        <div className="grid grid-cols-1 items-center gap-3 text-center sm:text-right">
          <span className="retro-badge justify-center sm:justify-end">Nostalgia em Alta</span>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">100k jogos - suporte vitalicio</p>
        </div>
      </div>
    </header>
  );
}
