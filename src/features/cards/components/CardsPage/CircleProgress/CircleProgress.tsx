interface CircleProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  trackColor?: string;
  textColor?: string;
}

const radius = 90;
const circle = 2 * Math.PI * radius;

export const CircleProgress = ({
  progress,
  size = 200,
  strokeWidth = 16,
  progressColor = "#76e5b1",
  trackColor = "#e0e0e0",
  textColor = "#6bdba7",
}: CircleProgressProps) => {
  const offset = circle * (1 - Math.min(Math.max(progress, 0), 100) / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox="-25 -25 250 250"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        r={radius}
        cx="100"
        cy="100"
        fill="transparent"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      <circle
        r={radius}
        cx="100"
        cy="100"
        fill="transparent"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circle}
        strokeDashoffset={offset}
      />
      <text
        x="100"
        y="115"
        fill={textColor}
        fontSize="52"
        fontWeight="bold"
        textAnchor="middle"
        style={{ transform: "rotate(90deg) translate(0px, -196px)" }}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};
