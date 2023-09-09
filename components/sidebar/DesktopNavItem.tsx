import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface DesktopNavItemProps {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

export default function DesktopNavItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: DesktopNavItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  // console.log(active);

  return (
    <li onClick={handleClick} key={label}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold border border-gray-50 bg-gray-50  hover:text-gray-50 hover:bg-orange-500 shadow-md
          `,
          active && "text-gray-50 bg-orange-500"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
