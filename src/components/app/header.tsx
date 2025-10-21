import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-4 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Link href="/">
          <Image
            src="/image/logo.png"
            alt="Portal Retro Games Logo"
            width={180}
            height={32}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
