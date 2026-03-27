import AdminSidebar from "@/components/admin/admin-sidebar";
import CategoryForm from "@/components/admin/category-form";
import Card from "@/components/ui/card";
import PageContainer from "@/components/layout/page-container";
import { categories } from "@/lib/queries/mock-data";

export default function AdminCategoriesPage() {
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

            <CategoryForm />

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white">
                Existing Categories
              </h2>

              <div className="mt-5 space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div>
                      <p className="font-medium text-white">{category.name}</p>
                      <p className="text-sm text-zinc-400">{category.slug}</p>
                    </div>

                    <button
                      type="button"
                      className="text-sm text-amber-400 hover:text-amber-300"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
