import { inter } from '@/fonts';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full justify-center items-center align-middle min-h-screen">
      <div className="text-center px-5 mx-5">
        <h2 className={`${inter.className} antiliased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">So sorry! Page not found</p>
        <p className="font-light">
          <span>Go back to </span>
          <Link href="/" className="font-normal hover:underline transition-all">
            home
          </Link>
        </p>
      </div>
    </div>
  );
}
