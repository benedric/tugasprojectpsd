import Product from "@/libs/models/product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, URLParams: any) {
    try{

        const body = await request.json()
        const id = URLParams.params.id
        const { name, category, price } = body;

        await connectMongoDB()

        console.log(id, name, category, price)

        const data = await Product.findByIdAndUpdate(id, {
            name, category, price
        })

        return NextResponse.json({msg: "Updated Successfully", data})
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something Went Wrong"
        }, {status: 400})
    }
}
