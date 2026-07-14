import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      title="KVai — home"
      className={cn("group flex items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="KVai"
        width={102}
        height={24}
        priority
        className="h-6 w-auto object-contain transition-transform duration-300 group-hover:-rotate-2"
      />
    </Link>
  );
}
