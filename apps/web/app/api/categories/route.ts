import { fetchCategories } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchCategories();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/products", error);
    return NextResponse.json(
      { error: "Error getting products" },
      { status: 500 }
    );
  }
}
