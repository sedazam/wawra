type CategoryChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function CategoryChip({
  label,
  active = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition ${
        active
          ? "bg-amber-500 text-black"
          : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
