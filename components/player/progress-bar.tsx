"use client";

type ProgressBarProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
};

export default function ProgressBar({
  value,
  max,
  onChange,
}: ProgressBarProps) {
  return (
    <input
      type="range"
      min={0}
      max={max || 0}
      step={1}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
    />
  );
}
