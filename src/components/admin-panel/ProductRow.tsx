import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IProduct } from "@/app/admin/dashboard/page";
import { useAppDispatch } from "@/redux/hooks";
import { setProduct } from "@/redux/features/productSlice";
import axios from "axios";
import { setLoading } from "@/redux/features/loadingSlice";
import { makeToast } from "@/utils/helper";

interface PropsType {
  srNo: number; // Pastikan srNo bertipe number
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = () => {
    dispatch(setLoading(true));

    const payload = {
      fileKey: product.filekey,
    };

    axios
      .delete("/api/uploadthing", { data: payload })
      .then((res) => {
        console.log(res);

        axios
          .delete(`/api/delete_product/${product._id}`) // Perbaiki penggunaan string template
          .then((res) => {
            console.log(res);
            makeToast("Product Deleted Successfully!");
            setUpdateTable((prevState) => !prevState);
          })
          .catch((err) => console.log(err))
          .finally(() => dispatch(setLoading(false)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr>
      <td>
        <div>{Number(srNo)}</div> {/* Pastikan srNo ditampilkan sebagai number */}
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>{product.price}</td>
      <td className="py-2">
        <Image
          src={product.imgSrc}
          width={40}
          height={40}
          alt="Product_image"
        />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <CiEdit
            className="cursor-pointer hover:text-black"
            onClick={onEdit}
          />
          <RiDeleteBin5Line
            className="text-[20px] cursor-pointer hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
