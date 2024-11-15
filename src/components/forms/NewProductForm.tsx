import Container from "../layouts/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { NewProductSchema } from "../../schemas/product.schema";
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
import { useNavigate } from "react-router-dom";

export default function NewProductForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; file: File }[]
  >([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  // Inside your component
  const navigate = useNavigate();

  const newProductForm = useForm<z.infer<typeof NewProductSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      sku: "",
      name: "",
      qty: 0,
      description: "",
      price: 0,
      images: [],
      mainImageId: mainImageIndex,
    },
  });

  const onSubmit = async (values: z.infer<typeof NewProductSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    const formData = new FormData();

    formData.append("sku", values.sku);
    formData.append("name", values.name);
    formData.append("qty", values.qty.toString());
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("mainImageId", values.mainImageId.toString());

    values.images.forEach((file) => {
      formData.append("images[]", file);
    });

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        setSuccess("Product successfully uploaded!");
        navigate("/");
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
      setIsLoading(false);
    }
  };

  // generate temp URL for view and store the file in form values
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).slice(0, 5);
      const existingFiles = newProductForm.getValues("images");
      if (existingFiles.length + fileArray.length > 5) {
        console.log("Maximum 5 images are alloweed");
        return;
      }
      const previews = fileArray.map((file) => ({
        src: URL.createObjectURL(file),
        file,
      }));
      newProductForm.setValue(
        "images",
        [...newProductForm.getValues("images"), ...fileArray],
        { shouldValidate: true }
      );

      setImagePreviews(() => [...imagePreviews, ...previews]);
    }
  };

  const removeImageFromForm = (indexToRemove: number) => {
    const updatedPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setImagePreviews(updatedPreviews);
    newProductForm.setValue(
      "images",
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
    <Container>
      <form onSubmit={newProductForm.handleSubmit(onSubmit)}>
        <div className="flex w-full  flex-col  lg:flex-row lg:gap-10">
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
        <div className="flex w-full  flex-col  lg:flex-row lg:gap-10">
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
          name="images"
          render={({ field, fieldState }) => (
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
                {imagePreviews.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {imagePreviews.map((prw, index) => (
                      <div
                        key={index}
                        className="relative w-[85px] aspect-square"
                      >
                        <img
                          key={index}
                          src={prw.src}
                          alt={`Preview ${index + 1}`}
                          className="w-[85px] aspect-square object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageFromForm(index)}
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
                  </div>
                )}
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
                    Add Images
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
          <FormButton text="Publish" isProcessing={isLoading} />
        </div>
      </form>
    </Container>
  );
}
