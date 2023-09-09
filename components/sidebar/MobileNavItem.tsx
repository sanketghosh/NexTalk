"use client";

import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

type MobileNavItemPropsType = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export default function MobileNavItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: MobileNavItemPropsType) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `group flex gap-x-3 rounded-md p-4 text-sm leading-6 font-semibold border bg-gray-50  hover:text-gray-50 hover:bg-orange-500 w-full justify-center 
    `,
        active && "text-gray-50 bg-orange-500"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}
