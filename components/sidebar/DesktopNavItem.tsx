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
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold border bg-gray-50  hover:text-gray-50 hover:bg-violet-500`,
          active && "text-gray-50 bg-violet-500"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
