import connectMongoDB from "@/app/libs/mongodb";
import ProductModel from "@/app/models/ProductModel";
import { NextResponse } from "next/server";
import cors from "cors";

const corsMiddleware = cors({
  origin: "https://nexr-app-git-main-alankgit.vercel.app", // Replace with your client's domain
  methods: ["GET", "POST", "DELETE"], // Specify the methods you want to allow
  allowedHeaders: ["Content-Type", "Authorization"], // Specify any additional headers you want to allow
});
 
export async function GET() {
      await corsMiddleware(request, request.nextUrl);

    await connectMongoDB();
    const products = await ProductModel.find();
    return NextResponse.json({ products });
}
 
export async function POST(request) {
          await corsMiddleware(request, request.nextUrl);

    const { name, image,price,category } = await request.json();
    await connectMongoDB();
    await ProductModel.create({ name, image, price, category });
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
}
 
export async function DELETE(request) {
          await corsMiddleware(request, request.nextUrl);

    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await ProductModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}