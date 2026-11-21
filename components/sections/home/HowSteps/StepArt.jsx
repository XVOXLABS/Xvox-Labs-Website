import styles from "./HowSteps.module.css";

// The prototype's own step illustrations (index.html `shot()`), unchanged except:
// gradient ids are prefixed to stay unique on the page, and the rotating ring uses a CSS
// animation (16s, linear) instead of SVG <animateTransform>, so reduced motion can stop it.
const ART = {
  tell: (
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <linearGradient id="how-t1" x1="0" x2="1">
          <stop offset="0" stopColor="#C9C2FF" />
          <stop offset="1" stopColor="#F3C6E8" />
        </linearGradient>
      </defs>
      <rect x="20" y="22" width="130" height="34" rx="17" fill="#F1F1F1" />
      <rect x="70" y="66" width="130" height="34" rx="17" fill="url(#how-t1)" />
      <rect x="20" y="110" width="96" height="30" rx="15" fill="#F1F1F1" />
      <circle cx="36" cy="39" r="4" fill="#bbb" />
      <circle cx="48" cy="39" r="4" fill="#bbb" />
      <circle cx="60" cy="39" r="4" fill="#bbb" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <linearGradient id="how-t2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD9C7" />
          <stop offset="1" stopColor="#FFB59A" />
        </linearGradient>
      </defs>
      <rect x="55" y="12" width="110" height="140" rx="12" fill="url(#how-t2)" />
      <rect x="72" y="34" width="76" height="8" rx="4" fill="#fff" />
      <rect x="72" y="54" width="56" height="8" rx="4" fill="#fff" opacity=".7" />
      <rect x="72" y="74" width="66" height="8" rx="4" fill="#fff" opacity=".7" />
      <circle cx="140" cy="122" r="16" fill="#111" />
      <path d="M133 122l5 5 9-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <linearGradient id="how-t3" x1="0" x2="1">
          <stop offset="0" stopColor="#FAD9C8" />
          <stop offset="1" stopColor="#F4BFA5" />
        </linearGradient>
      </defs>
      <rect x="40" y="104" width="140" height="40" rx="12" fill="url(#how-t3)" />
      <rect x="62" y="64" width="96" height="40" rx="12" fill="#FFD36E" />
      <rect x="84" y="24" width="52" height="40" rx="12" fill="#B9A8FF" />
    </svg>
  ),
  run: (
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <radialGradient id="how-t4" cx="40%" cy="35%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#8FB2FF" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="80" r="44" fill="url(#how-t4)" />
      <circle className={styles.spin} cx="110" cy="80" r="64" fill="none" stroke="#C9D8FF" strokeWidth="3" strokeDasharray="5 9" />
      <circle cx="174" cy="80" r="7" fill="#111" />
    </svg>
  ),
};

export default function StepArt({ kind }) {
  return ART[kind];
}
