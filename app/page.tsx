<section className="py-8 md:py-10">
  <SectionHeader title="Categories" />

  {categories.length > 0 ? (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  ) : (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <h2 className="text-lg font-semibold text-white">No categories yet</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Create categories in the admin panel to organise your content.
      </p>
    </div>
  )}
</section>;
