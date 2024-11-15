import React, { useState, useTransition } from "react";
import { TableBody, TableCell, TableRow } from "./Table";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import favIcon from "../../assets/star.svg";
import favFillIcon from "../../assets/starred.svg";
import Dialog from "./Dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { toggleFavourite } from "../../store/product.slice";

type Props = {
  product: IProduct;
  loadProducts: () => void;
  isfavourite: boolean;
};

const ProductRow = ({ product, loadProducts, isfavourite }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeletting, setIsDeletting] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  let productImage = product.images.find((pr) => pr.main == true);
  if (!productImage) {
    productImage = product.images[0];
  }

  const deleteProduct = async () => {
    setIsDeletting(true);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/product/by/${product._id}`
      );

      if (res.status == 200) {
        loadProducts();
        toast.success("Successfully Deleted the Product");
      } else {
        toast.error("Failed to delete the product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the product");
    } finally {
      console.log("Reaching");
      setIsDeletting(false);
      setDialogOpen(false);
    }
  };

  const handleToggleFavourite = async () => {
    try {
      await dispatch(toggleFavourite(product._id)).unwrap();
      loadProducts();
      toast.success(
        isfavourite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      toast.error("Failed to update favorite status");
      console.error(error);
    }
  };

  return (
    <>
      <TableRow className="gap-[32px] border-b ">
        <TableCell>{product.sku}</TableCell>
        <TableCell>
          <img
            src={productImage.url}
            alt=" "
            className="w-[66px] aspect-square object-cover rounded-lg"
          />
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>${product.price}</TableCell>
        <TableCell className=" items-center justify-end  ">
          <div className="flex justify-end gap-[10px]">
            <button onClick={() => setDialogOpen(true)}>
              <img
                src={deleteIcon}
                alt=""
                className="w-[27px]   cursor-pointer"
              />
            </button>
            <a href={`/edit-product/${product._id}`}>
              <img src={editIcon} alt="" className="w-[27px]  cursor-pointer" />
            </a>
            {isfavourite ? (
              <img
                onClick={handleToggleFavourite}
                src={favFillIcon}
                alt=""
                className="w-[27px]  cursor-pointer"
              />
            ) : (
              <img
                onClick={handleToggleFavourite}
                src={favIcon}
                alt=""
                className="w-[27px]  cursor-pointer"
              />
            )}
          </div>
        </TableCell>
      </TableRow>
      {dialogOpen && (
        <Dialog
          setDialogOpen={setDialogOpen}
          onSuccess={deleteProduct}
          isPending={isDeletting}
        />
      )}
    </>
  );
};

export default ProductRow;
