import { z } from 'zod';

export const productBasicSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  sku: z.string().min(1, 'SKU is required'),
});

export const productPricingSchema = z.object({
  price: z.coerce.number().min(0, 'Price must be positive'),
  compareAtPrice: z.coerce.number().min(0, 'Compare price must be positive').optional(),
  stockQuantity: z.coerce.number().int().min(0, 'Stock must be positive'),
  lowStockThreshold: z.coerce.number().int().min(0, 'Threshold must be positive').default(10),
});

export const productImagesSchema = z.object({
  images: z.array(z.string()).min(1, 'At least one image is required'),
  isActive: z.boolean().default(true),
});

export const productSchema = productBasicSchema
  .merge(productPricingSchema)
  .merge(productImagesSchema);

export type ProductBasic = z.infer<typeof productBasicSchema>;
export type ProductPricing = z.infer<typeof productPricingSchema>;
export type ProductImages = z.infer<typeof productImagesSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
