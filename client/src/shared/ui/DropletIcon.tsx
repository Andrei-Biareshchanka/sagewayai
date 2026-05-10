interface DropletIconProps {
  size?: number;
  className?: string;
}

function DropletIcon({ size = 24, className }: DropletIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 8C24 8 14 16 14 26C14 31.5 18.5 36 24 36C29.5 36 34 31.5 34 26C34 16 24 8 24 8Z"
        fill="#6B8F71"
      />
      <path
        d="M24 20C24 20 19 24 19 28C19 30.8 21.2 33 24 33C26.8 33 29 30.8 29 28C29 24 24 20 24 20Z"
        fill="#F0F4F0"
      />
    </svg>
  );
}

export { DropletIcon };
