import { getScaledLogoLayout } from "@/lib/brand/logo-cells";

type FaviconLogoProps = {
  size: number;
  rounded?: number;
  pixelColor?: string;
};

export function FaviconLogo({
  size,
  rounded = 0,
  pixelColor = "#FAFAFA",
}: FaviconLogoProps) {
  const pixels = getScaledLogoLayout(size);
  const cornerRadius = rounded || Math.round(size * 0.22);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        borderRadius: cornerRadius,
        background: "#101010",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: size,
          height: size,
        }}
      >
        {pixels.map((pixel, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: pixel.x,
              top: pixel.y,
              width: pixel.size,
              height: pixel.size,
              background: pixelColor,
              borderRadius: pixel.radius,
            }}
          />
        ))}
      </div>
    </div>
  );
}
