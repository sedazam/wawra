type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#0B0B0F] p-8 text-white">
      Category page: {slug}
    </main>
  );
}
