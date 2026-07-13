import { useState, useEffect, useCallback } from "react";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLetter?: string;
  size?: number;
}

function buildFallback(letter: string) {
  const colors = [
    ["#0A84FF", "#5E5CE6"],
    ["#BF5AF2", "#FF375F"],
    ["#30D158", "#64D2FF"],
    ["#FF9F0A", "#FFD60A"],
    ["#FF453A", "#FF9F0A"],
    ["#5E5CE6", "#BF5AF2"],
    ["#64D2FF", "#0A84FF"],
  ];
  const L = (letter || "?").charAt(0).toUpperCase();
  const [c1, c2] = colors[L.charCodeAt(0) % colors.length];
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(#g)"/><text x="50" y="65" text-anchor="middle" font-size="56" font-weight="700" font-family="-apple-system, sans-serif" fill="white">${L}</text></svg>`
  )}`;
}

/**
 * Robust logo renderer — deterministic, race-free.
 *
 * Design:
 *  - The <img> is keyed by the resolved URL so React always mounts a
 *    fresh DOM element. No stale onError from a previous src.
 *  - The <img> is always rendered at full opacity — the browser shows
 *    whatever it has decoded so far. No "loading" state flipping.
 *  - State is only `errored` (boolean). No triple-state race.
 *  - If Google's favicon service fails, we retry with the direct
 *    /favicon.ico as a second chance.
 *  - If both fail, we show a gradient-letter avatar.
 */
export function LogoImage({ src, alt, className, fallbackLetter, size = 48 }: LogoImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  // When the parent passes a new src, reset everything
  useEffect(() => {
    setResolvedSrc(src);
    setErrored(false);
  }, [src]);

  const handleError = useCallback(() => {
    if (resolvedSrc.includes("google.com/s2/favicons")) {
      try {
        const u = new URL(resolvedSrc);
        const domain = u.searchParams.get("domain");
        if (domain) {
          setResolvedSrc(`https://${domain}/favicon.ico`);
          return;
        }
      } catch {
        // fall through
      }
    }
    setErrored(true);
  }, [resolvedSrc]);

  const letter = (fallbackLetter || alt || "?").charAt(0).toUpperCase();

  if (errored || !resolvedSrc) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          backgroundImage: `url("${buildFallback(letter)}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 14,
        }}
        aria-label={alt}
        title={alt}
      />
    );
  }

  return (
    <div
      className={`relative shrink-0 ${className || ""}`}
      style={{ width: size, height: size }}
    >
      {/* Subtle background visible while image streams in — never blank */}
      <div
        className="absolute inset-0 rounded-[14px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)",
        }}
        aria-hidden
      />
      <img
        key={resolvedSrc}
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={handleError}
        className="relative w-full h-full object-contain"
        style={{ borderRadius: 14 }}
      />
    </div>
  );
}
