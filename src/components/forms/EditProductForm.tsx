import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateProductSchema } from "../../schemas/product.schema";
import FormField from "../ui/form-field";
import { z, ZodIssue } from "zod";
import FormItem from "../ui/form-item";
import FormLabel from "../ui/form-label";
import FormInput from "../ui/form-input";
import FormMessage from "../ui/form-message";
import FormButton from "../ui/form-btn";
import FormCol from "../ui/form-col";
import FormTextArea from "../ui/form-textarea";
import { BiX } from "react-icons/bi";
import axios from "axios";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";

interface Props {
  Product: any;
}

export default function EditProductForm({ Product }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [productImages, setProductImages] = useState(Product.images);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; file: File }[]
  >([]);
  const minImageId = Product.images.findIndex(
    (image: any) => image.main === true
  );
  const [mainImageIndex, setMainImageIndex] = useState(
    minImageId < 0 ? 0 : minImageId
  );

  const newProductForm = useForm<z.infer<typeof UpdateProductSchema>>({
    mode: "onChange",
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      sku: Product.sku,
      name: Product.name,
      qty: Product.qty,
      description: Product.description,
      price: Product.price,
      newImages: [],
      imageToBeDeleted: [],
      mainImageId: mainImageIndex,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateProductSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    const formData = new FormData();
    console.log("Reached");
    formData.append("sku", values.sku);
    formData.append("name", values.name);
    formData.append("qty", values.qty.toString());
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("mainImageId", values.mainImageId?.toString() || "0");
    formData.append(
      "imageToBeDeleted",
      JSON.stringify(values.imageToBeDeleted)
    );

    if (values.newImages) {
      console.log("Reached");
      values.newImages.forEach((file) => {
        formData.append("newImages[]", file);
      });
    }

    setIsPending(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/product/by/${Product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data) {
        setSuccess("Product successfully uploaded!");
        window.location.reload();
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const serverErrors = error.response.data;

          if (
            serverErrors.message &&
            serverErrors.message.includes("Duplicate value detected")
          ) {
            setError(serverErrors.message);
          } else {
            setError(
              serverErrors.message ||
                "An error occurred while uploading the product."
            );
          }

          if (serverErrors?.name === "ZodError") {
            const zodErrors = serverErrors.issues || [];
            zodErrors.forEach((err: ZodIssue) => {
              if (err.path.length > 0) {
                newProductForm.setError(err.path[0] as any, {
                  type: "manual",
                  message: err.message,
                });
              }
            });
          } else {
            setError(
              error.response.data.message ||
                "An error occurred while uploading the product."
            );
          }
        } else if (error.request) {
          setError("No response received from the server. Please try again.");
        } else {
          setError("Error in setting up the request. Please check your input.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("Trgieers");
    if (files) {
      const fileArray = Array.from(files).slice(0, 5);
      const existingFiles = newProductForm.getValues("newImages") || [];
      const imageToBeDeleted =
        newProductForm.getValues("imageToBeDeleted") || [];
      const allImages =
        fileArray.length + existingFiles.length - imageToBeDeleted.length;

      if (allImages > 5) {
        console.log("Maximum 5 images are alloweed");
        return;
      }
      const previews = fileArray.map((file) => ({
        src: URL.createObjectURL(file),
        file,
      }));

      newProductForm.setValue("newImages", [...existingFiles, ...fileArray], {
        shouldValidate: true,
      });
      setImagePreviews(() => [...imagePreviews, ...previews]);
    }
  };

  const removeExistingImageFromForm = (indexToRemove: string) => {
    setProductImages((prev: any) => {
      return prev.filter(
        (image: any, index: any) => image._id !== indexToRemove
      );
    });
    const currentDeletedImages =
      newProductForm.getValues("imageToBeDeleted") || [];
    const updatedDeletedImages = [...currentDeletedImages, indexToRemove];
    newProductForm.setValue("imageToBeDeleted", updatedDeletedImages, {
      shouldValidate: true,
    });
  };

  const removeNewImageFromForm = (indexToRemove: number) => {
    const updatedPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setImagePreviews(updatedPreviews);
    newProductForm.setValue(
      "newImages",
      updatedPreviews.map((item) => item.file),
      { shouldValidate: true }
    );

    if (mainImageIndex === indexToRemove) {
      setMainImageIndex(0);
      newProductForm.setValue("mainImageId", 0);
    }
  };

  const selectMainImage = (index: number) => {
    setMainImageIndex(index);
    newProductForm.setValue("mainImageId", index);
  };

  return (
    <form onSubmit={newProductForm.handleSubmit(onSubmit)}>
      <div className="flex w-full  flex-col lg:flex-row lg:gap-10">
        <FormField
          control={newProductForm.control}
          name="sku"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormCol>
                <FormLabel text="SKU" />
                <FormInput {...field} type="text" />
              </FormCol>
              <FormMessage {...fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={newProductForm.control}
          name="price"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormCol>
                <FormLabel text="Price" />
                <FormInput
                  {...field}
                  type="number"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                />
              </FormCol>
              <FormMessage {...fieldState} />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full  flex-col lg:flex-row lg:gap-10">
        <FormField
          control={newProductForm.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormCol>
                <FormLabel text="Name" />
                <FormInput {...field} type="text" />
              </FormCol>
              <FormMessage {...fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={newProductForm.control}
          name="qty"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormCol>
                <FormLabel text="QTY" />
                <FormInput
                  {...field}
                  type="number"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                />
              </FormCol>
              <FormMessage {...fieldState} />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={newProductForm.control}
        name="description"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel text="Description" />
            <p className="text-secondary-text text-primary">
              A small description about the project"
            </p>
            <FormTextArea {...field} />
            <FormMessage {...fieldState} />
          </FormItem>
        )}
      />

      <FormField
        control={newProductForm.control}
        name="newImages"
        render={({ fieldState }) => (
          <FormItem>
            <div className="flex gap-10">
              <div className="">
                <FormCol>
                  <FormLabel text="Product Images" />
                </FormCol>
                <p className="text-secondary-text text-primary max-w-40">
                  JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                </p>
              </div>

              <div className="mt-3 flex gap-5 flex-wrap">
                {Product.images.length > 0 &&
                  productImages.map((prw: any, index: number) => (
                    <div
                      key={index}
                      className="relative w-[85px] aspect-square"
                    >
                      <img
                        key={index}
                        src={prw.url}
                        alt={`Preview ${index + 1}`}
                        className="w-[85px] aspect-square object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImageFromForm(prw._id)}
                        className="absolute top-2 right-2 text-red-500 bg-background cursor-pointer hover:bg-secondary"
                      >
                        <BiX />
                      </button>
                      <button
                        type="button"
                        onClick={() => selectMainImage(index)}
                        className={`absolute bottom-2 left-2 text-white px-2 py-1 text-xs ${
                          mainImageIndex === index
                            ? "bg-green-600"
                            : "bg-gray-400"
                        } rounded`}
                      >
                        {mainImageIndex === index ? "Main" : "Set as Main"}
                      </button>
                    </div>
                  ))}
                {imagePreviews.map((prw, index) => (
                  <div key={index} className="relative w-[85px] aspect-square">
                    <img
                      key={index}
                      src={prw.src}
                      alt={`Preview ${index + 1}`}
                      className="w-[85px] aspect-square object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImageFromForm(index)}
                      className="absolute top-2 right-2 text-red-500 bg-background cursor-pointer hover:bg-secondary"
                    >
                      <BiX />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="file"
                id="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="flex gap-5 items-start mb-5">
                <label
                  htmlFor="file"
                  className=" text-primary-text text-accent underline font-bold cursor-pointer"
                >
                  Edit Images
                </label>
              </div>
            </div>

            <span className="text-xs mt-[2px] text-red-400 font-semibold flex justify-start">
              {fieldState.error?.message}
            </span>
          </FormItem>
        )}
      />
      <FormError message={error} />
      <FormSuccess message={success} />
      <div className="flex justify-end">
        <FormButton text="Publish" isProcessing={isPending} />
      </div>
    </form>
  );
}
