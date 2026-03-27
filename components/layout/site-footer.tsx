import PageContainer from "./page-container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <PageContainer className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Wawra</h2>
        <p className="text-sm text-zinc-400">A modern home for audio.</p>
      </PageContainer>
    </footer>
  );
}
