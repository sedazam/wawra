import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="text-sm text-amber-400 hover:text-amber-300"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
