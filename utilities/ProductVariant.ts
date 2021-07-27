/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Field } from 'payload/types';

const vairantFields: Field[] = [
  {
    name: 'color_applies',
    type: 'checkbox',
    required: true,
  },
  {
    name: 'color',
    type: 'text',
    hooks: {
      beforeChange: [
        ({
          value,
          data,
        }: {
          value?: unknown;
          data?: { [key: string]: unknown };
        }): Promise<unknown> | unknown => {
          const productVariants: any = data.product_variants;
          const field = productVariants.find((item) => item.color === value);
          return field.color_applies ? value : null;
        },
      ],
    },
    admin: {
      condition: (
        _: Record<string, unknown>,
        siblingsData: Record<string, unknown>
      ): boolean => {
        if (siblingsData.color_applies) {
          return true;
        }
        return false;
      },
    },
  },
  {
    name: 'size',
    label: 'Size of the Product',
    type: 'select',
    hasMany: true,
    options: [
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
      { label: 'XL', value: 'XL' },
      { label: 'XXL', value: 'XXL' },
      { label: 'XXXL', value: 'XXXL' },
      { label: 'XXXXL', value: 'XXXXl' },
    ],
    hooks: {
      beforeChange: [
        ({
          value,
          data,
        }: {
          value?: unknown;
          data?: { [key: string]: unknown };
        }): Promise<unknown> | unknown =>
          data.category === 'CLOTHES' ? value : null,
      ],
    },
    admin: {
      condition: (data: Record<string, unknown>): boolean => {
        console.log(data);
        if (data.category === 'CLOTHES') {
          return true;
        }
        return false;
      },
    },
  },
  {
    type: 'row',
    label: 'Book Details',
    fields: [
      {
        name: 'pages',
        type: 'number',
        min: 30,
        hooks: {
          beforeChange: [
            ({
              value,
              data,
            }: {
              value?: unknown;
              data?: { [key: string]: unknown };
            }): Promise<unknown> | unknown =>
              data.category === 'BOOKS' ? value : null,
          ],
        },
        admin: {
          width: '50%',
          condition: (data: Record<string, unknown>): boolean => {
            if (data.category === 'BOOKS') {
              return true;
            }
            return false;
          },
        },
      },
      {
        name: 'format',
        type: 'select',
        options: [
          { label: 'Paperback', value: 'PAPERBACK' },
          { label: 'Hardcover', value: 'HARDCOVER' },
          { label: 'E-Book', value: 'EBOOK' },
        ],
        hooks: {
          beforeChange: [
            ({
              value,
              data,
            }: {
              value?: unknown;
              data?: { [key: string]: unknown };
            }): Promise<unknown> | unknown =>
              data.category === 'BOOKS' ? value : null,
          ],
        },
        admin: {
          width: '50%',
          condition: (data: Record<string, unknown>): boolean => {
            if (data.category === 'BOOKS') {
              return true;
            }
            return false;
          },
        },
      },
    ],
  },
  {
    name: 'price',
    type: 'number',
    required: true,
    admin: {
      placeholder: 'Enter Price in cents',
    },
  },
  {
    name: 'available',
    type: 'checkbox',
    required: true,
  },
  {
    name: 'product_reviews',
    type: 'array',
    labels: { singular: 'Product Review', plural: 'Product Reviews' },
    fields: [
      {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
      },
      {
        name: 'review',
        label: 'User Review',
        type: 'textarea',
      },
    ],
  },
  {
    name: 'product_rating',
    type: 'array',
    labels: { singular: 'Product Rating', plural: 'Product Ratings' },
    fields: [
      {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
      },
      {
        name: 'rating',
        type: 'select',
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '6', value: '6' },
          { label: '7', value: '7' },
          { label: '8', value: '8' },
          { label: '9', value: '9' },
          { label: '10', value: '10' },
        ],
      },
    ],
  },
  {
    name: 'product_images',
    type: 'array',
    minRows: 1,
    maxRows: 10,
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'images',
        required: true,
        label: 'Product Image',
      },
    ],
  },
];
export default vairantFields;
