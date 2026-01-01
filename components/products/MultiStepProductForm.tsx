'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import toast from 'react-hot-toast';
import {
  productBasicSchema,
  productPricingSchema,
  productImagesSchema,
  ProductFormData,
} from '@/lib/validations/product';
import { z } from 'zod';

interface MultiStepProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
}

const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Food',
  'Beauty',
  'Automotive',
  'Other',
];

export const MultiStepProductForm: React.FC<MultiStepProductFormProps> = ({
  initialData,
  productId,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    tags: [],
    sku: '',
    price: 0,
    compareAtPrice: 0,
    cost: 0,
    stockQuantity: 0,
    lowStockThreshold: 10,
    images: [],
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const url = productId ? `/api/products/${productId}` : '/api/products';
      const method = productId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save product');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success(
        productId ? 'Product updated successfully' : 'Product created successfully'
      );
      router.push('/products');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? parseFloat(value) || 0
          : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const validateStep = (stepNumber: number) => {
    setErrors({});

    try {
      if (stepNumber === 1) {
        productBasicSchema.parse({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          tags: formData.tags,
          sku: formData.sku,
        });
      } else if (stepNumber === 2) {
        productPricingSchema.parse({
          price: formData.price,
          compareAtPrice: formData.compareAtPrice,
          cost: formData.cost,
          stockQuantity: formData.stockQuantity,
          lowStockThreshold: formData.lowStockThreshold,
        });
      } else if (stepNumber === 3) {
        productImagesSchema.parse({
          images: formData.images,
          isActive: formData.isActive,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    } else {
      toast.error('Please fix the errors before continuing');
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      mutation.mutate(formData);
    } else {
      toast.error('Please fix the errors before submitting');
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Pricing & Stock' },
    { number: 3, title: 'Images & Status' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s.number === step
                      ? 'bg-primary-600 text-white'
                      : s.number < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s.number < step ? '✓' : s.number}
                </div>
                <span className="text-sm mt-2 text-gray-600">{s.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    s.number < step ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>

              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                placeholder="Enter product name"
              />

              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                required
                rows={4}
                placeholder="Describe your product"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  error={errors.category}
                  required
                  options={[
                    { value: '', label: 'Select a category' },
                    ...CATEGORIES.map((cat) => ({
                      value: cat,
                      label: cat,
                    })),
                  ]}
                />

                <Input
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  error={errors.sku}
                  required
                  placeholder="e.g., PROD-001"
                />
              </div>

              <Input
                label="Tags"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="Enter tags separated by commas"
                helperText="e.g., new, featured, sale"
              />
            </div>
          )}

          {/* Step 2: Pricing & Stock */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  error={errors.price}
                  required
                  placeholder="0.00"
                />

                <Input
                  label="Compare at Price"
                  name="compareAtPrice"
                  type="number"
                  step="0.01"
                  value={formData.compareAtPrice || ''}
                  onChange={handleChange}
                  error={errors.compareAtPrice}
                  placeholder="0.00"
                  helperText="Original price (for sale items)"
                />

                <Input
                  label="Cost"
                  name="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={handleChange}
                  error={errors.cost}
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Stock Quantity"
                  name="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  error={errors.stockQuantity}
                  required
                  placeholder="0"
                />

                <Input
                  label="Low Stock Threshold"
                  name="lowStockThreshold"
                  type="number"
                  value={formData.lowStockThreshold}
                  onChange={handleChange}
                  error={errors.lowStockThreshold}
                  placeholder="10"
                  helperText="Alert when stock falls below this number"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Profit Margin</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formData.price && formData.cost
                    ? `$${(formData.price - formData.cost).toFixed(2)} (${(
                        ((formData.price - formData.cost) / formData.price) *
                        100
                      ).toFixed(1)}%)`
                    : '$0.00'}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Images & Status */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Images & Status
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <ImageUpload
                  value={formData.images}
                  onChange={(urls) =>
                    setFormData((prev) => ({ ...prev, images: urls }))
                  }
                  maxFiles={5}
                />
                {errors.images && (
                  <p className="text-sm text-red-600 mt-1">{errors.images}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Product is active and visible to customers
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {step > 1 && (
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Back
                </Button>
              )}
            </div>
            <div className="space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push('/products')}
              >
                Cancel
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" isLoading={mutation.isPending}>
                  {productId ? 'Update Product' : 'Create Product'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};
