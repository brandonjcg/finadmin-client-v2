import Link from 'next/link';
import { inter } from '@/fonts';

export const Footer = () => {
  return (
    <div className="flex flex-col w-full justify-center text-xs mb-10 items-center">
      <Link href="/" className="mx-3 mb-2">
        <span className={`${inter.className} antialiased font-bold`}>
          FinAdmin © {new Date().getFullYear()}
        </span>
      </Link>
      <span className={`${inter.className} antialiased font-bold`}>
        Developed by Brandon Castillo 👨🏽‍💻
      </span>
    </div>
  );
};
