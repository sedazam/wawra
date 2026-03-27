type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
        checked ? "bg-amber-500" : "bg-white/10"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
