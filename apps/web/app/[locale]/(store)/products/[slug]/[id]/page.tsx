import Details from "@/components/details/details";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const productId = Number(id);

  return (
    <section className="min-h-screen bg-background">
      <Details productId={productId} />
    </section>
  );
}