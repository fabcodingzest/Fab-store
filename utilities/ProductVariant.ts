/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Field } from 'payload/types';

export const categoryField: Field = {
  name: 'category',
  label: 'Product Category',
  type: 'select',
  options: [
    { label: 'Clothes', value: 'CLOTHES' },
    { label: 'Stationary', value: 'STATIONARY' },
    { label: 'Toys', value: 'TOYS' },
    { label: 'Furniture', value: 'FURNITURE' },
    { label: 'Books', value: 'BOOKS' },
    { label: 'Jwellery', value: 'JWELLERY' },
    { label: 'Electronics', value: 'ELECTRONICS' },
  ],
  required: true,
  index: true,
};

export const sizeSelect: Field = {
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
      if (data.category === 'CLOTHES') {
        return true;
      }
      return false;
    },
  },
};

const vairantFields: Field[] = [
  {
    name: 'color_applies',
    type: 'checkbox',
    defaultValue: false,
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
        }): Promise<unknown> | unknown => (data.color_applies ? value : null),
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
    name: 'isBook',
    label: 'Is it a book?',
    type: 'checkbox',
    defaultValue: false,
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
              data.isBook === true ? value : null,
          ],
        },
        admin: {
          width: '50%',
          condition: (data: Record<string, unknown>): boolean => {
            if (data.isBook === true) {
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
              data.isBook === true ? value : undefined,
          ],
        },
        admin: {
          width: '50%',
          condition: (data: Record<string, unknown>): boolean => {
            if (data.isBook === true) {
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
    name: 'status',
    type: 'select',
    options: [
      { label: 'Draft', value: 'DRAFT' },
      { label: 'Available', value: 'AVAILABLE' },
      { label: 'Unavailable', value: 'UNAVAILABLE' },
    ],
    required: true,
    defaultValue: 'DRAFT',
  },
  {
    name: 'reviews',
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
      {
        name: 'rating',
        label: 'Rating out of 5',
        type: 'number',
        max: 10,
      },
    ],
  },
  {
    name: 'images',
    type: 'array',
    minRows: 1,
    maxRows: 10,
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'images',
        label: 'Product Image',
      },
    ],
  },
];
export default vairantFields;
