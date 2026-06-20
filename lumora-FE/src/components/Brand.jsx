export default function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FF7A45" />
              <stop offset="1" stopColor="#E8453C" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#lm)" />
          <path d="M26 22 L44 32 L26 42 Z" fill="#fff" />
          <rect x="13" y="13" width="20" height="38" rx="8" fill="#fff" opacity="0.12" />
        </svg>
      </div>
      <div className="brand-text">
        <span className="brand-name">LUMORA</span>
        <span className="brand-tagline">AI LIVE WEBSITE PLATFORM</span>
        <span className="brand-sub">Build Your Site. Go Live. Own Your Brand.</span>
      </div>
    </div>
  )
}
