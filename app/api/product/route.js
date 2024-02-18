import connectMongoDB from "@/app/libs/mongodb";
import ProductModel from "@/app/models/ProductModel";
import { NextResponse } from "next/server";
 
export async function GET() {
    await connectMongoDB();
    const products = await ProductModel.find();
    return NextResponse.json({ products });
}
 
export async function POST(request) {
    const { name, image,price,category } = await request.json();
    await connectMongoDB();
    await ProductModel.create({ name, image, price, category });
    return NextResponse.json({ message: "Product Created" }, { status: 201 });
}
 
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await ProductModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}