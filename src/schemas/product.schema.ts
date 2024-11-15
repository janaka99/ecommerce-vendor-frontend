import * as z from "zod";
import { VALID_IMAGE_TYPES } from "../utils/helper";

export const NewProductSchema = z.object({
  sku: z.string().min(1, {
    message: "SKU  is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  qty: z.number().min(0, {
    message: "Quantity is required",
  }),
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .max(128),
  price: z.number().min(0, {
    message: "Price is required",
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, {
      message: "At least one image is required",
    })
    .max(5, {
      message: "A maximum of 5 images are allowed",
    })
    .refine((files) => files.every((file) => file.size <= 50 * 1024 * 1024), {
      message: "Each image must be 50MB or smaller",
    })
    .refine(
      (files) => files.every((file) => VALID_IMAGE_TYPES.includes(file.type)),
      {
        message: "Only JPEG, PNG, WEBP, and JPG file types are allowed",
      }
    ),

  mainImageId: z.number().min(0).max(4),
});

export const UpdateProductSchema = z.object({
  sku: z.string().min(1, {
    message: "SKU  is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  qty: z.number().min(0, {
    message: "Quantity is required",
  }),
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .max(128),
  price: z.number().min(0, {
    message: "Price is required",
  }),
  newImages: z
    .array(z.instanceof(File))
    .max(5, {
      message: "A maximum of 5 images are allowed",
    })
    .refine((files) => files.every((file) => file.size <= 50 * 1024 * 1024), {
      message: "Each image must be 50MB or smaller",
    })
    .refine(
      (files) => files.every((file) => VALID_IMAGE_TYPES.includes(file.type)),
      {
        message: "Only JPEG, PNG, WEBP, and JPG file types are allowed",
      }
    )
    .optional(),
  imageToBeDeleted: z.array(z.string()).optional(),
  mainImageId: z.number().min(0).max(4).optional(),
});
