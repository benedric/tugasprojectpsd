import Product from "@/libs/models/product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectMongoDB()

        const data = await Product.find()

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something Went Wrong"
        }, {status: 400})
    }
}
