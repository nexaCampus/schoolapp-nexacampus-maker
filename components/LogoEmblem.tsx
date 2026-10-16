export default function LogoEmblem({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 select-none ${className}`}
      aria-label="NexaCampus Emblem"
    >
      {/* Official NexaCampus SVG Icon */}
      <img
        src="/icons/icon.svg"
        alt="NexaCampus"
        width={36}
        height={36}
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain drop-shadow-sm rounded-[22%]"
      />
      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 pointer-events-none">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container ring-1.5 ring-white"></span>
      </span>
    </div>
  );
}
