"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between border-b px-8 py-4">
      <div className="flex items-center gap-10">
        <Image
          src="/logoLogin.svg"
          alt="Logo da Finance Ai"
          width={173}
          height={39}
        />
        <Link
          href="/"
          className={`${pathname === "/" ? "font-bold text-primary" : "text-muted-foreground"}`}
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={`${pathname === "/transactions" ? "font-bold text-primary" : "text-muted-foreground"}`}
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={`${pathname === "/subscription" ? "font-bold text-primary" : "text-muted-foreground"}`}
        >
          Assinatura
        </Link>
      </div>
      <div className="">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default NavBar;
