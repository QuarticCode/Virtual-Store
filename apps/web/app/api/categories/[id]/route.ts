import { fetchCategories } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parentId = Number(id);
    const data = await fetchCategories(parentId);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/products", error);
    return NextResponse.json(
      { error: "Error getting products" },
      { status: 500 }
    );
  }
}
