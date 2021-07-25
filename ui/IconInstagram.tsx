export const IconInstagram = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <rect
        strokeLinecap="round"
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5"
      ></rect>
      <path
        strokeLinejoin="round"
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      ></path>
      <line strokeWidth={2} x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}
