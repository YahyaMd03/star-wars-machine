"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center text-black p-4 h-16 bg-[#2563EB] shadow-md">
            <Link href="/" className="cursor-pointer">
                <Image src="/star-wars.png" alt="Star Wars" width={100} height={60} />
            </Link>

            <Link href="/favorites" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none" className="w-6 h-6">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
                </svg>
            </Link>
        </div>
    );
}
