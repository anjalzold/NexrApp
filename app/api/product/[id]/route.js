import connectMongoDB from "@/app/libs/mongodb";
import ProductModel from "@/app/models/ProductModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    name,image,price,category
  } = await request.json();
  await connectMongoDB();
  await ProductModel.findByIdAndUpdate(id, { name, image, price, category });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const product = await ProductModel.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
