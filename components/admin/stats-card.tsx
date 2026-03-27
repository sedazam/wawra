type StatsCardProps = {
  label: string;
  value: number | string;
  helper?: string;
};

export default function StatsCard({ label, value, helper }: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {helper ? <p className="mt-2 text-xs text-zinc-500">{helper}</p> : null}
    </div>
  );
}
