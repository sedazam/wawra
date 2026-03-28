import AdminSidebar from "@/components/admin/admin-sidebar";
import CategoriesManager from "@/components/admin/categories-manager";
import PageContainer from "@/components/layout/page-container";
import { getCategories } from "@/lib/supabase/queries";

export default async function AdminCategoriesPage() {
  const categoriesRaw = await getCategories();

  const categories = categoriesRaw.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  }));

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <PageContainer className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <AdminSidebar />

          <section className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Categories
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Manage Categories
              </h1>
            </div>

            <CategoriesManager initialCategories={categories} />
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
