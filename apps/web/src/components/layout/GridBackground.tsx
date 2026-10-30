/*
  Subtle sky-blue grid for the whole page. Fixed behind everything, and a radial mask
  fades the lines out toward the edges so it never competes with the content.
*/
const grid = "rgba(14, 165, 233, 0.07)";
const fade = "radial-gradient(ellipse 65% 55% at 50% 20%, #000 0%, transparent 72%)";

export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
}