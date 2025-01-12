import Product from "@/libs/models/product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imgSrc, filekey, name, category, price } = body;

    // Validasi data input
    if (!imgSrc || !filekey || !name || !category || !price) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Koneksi ke MongoDB
    await connectMongoDB();

    // Tambahkan produk ke database
    const data = await Product.create({
      imgSrc,
      filekey,
      name,
      category,
      price,
    });

    // Return respons sukses
    return NextResponse.json({ message: "Product Added Successfully", data });
  } catch (error) {
    console.error("Error adding product:", error);

    // Gunakan type guard untuk memeriksa tipe error
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Return respons error
    return NextResponse.json(
      {
        message: "Something Went Wrong",
        error: errorMessage,
      },
      { status: 400 }
    );
  }
}
