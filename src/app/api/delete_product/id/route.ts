import Product from "@/libs/models/product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParams: any) {
    try{
        const id = URLParams.params.id

        await connectMongoDB()

        await Product.findByIdAndDelete(id);

        return NextResponse.json({msg: "Deleted Successfully"});
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something Went Wrong"
        }, {status: 400})
    }
}
