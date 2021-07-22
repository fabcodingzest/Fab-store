import { CollectionConfig } from 'payload/types';

const ProductVariant: CollectionConfig = {
  slug: 'product_variants',
  admin: { useAsTitle: 'name' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'product_details',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'category',
      label: 'Product Category',
      type: 'select',
      options: [
        { label: 'Clothes', value: 'CLOTHES' },
        { label: 'Toys', value: 'TOYS' },
        { label: 'Furniture', value: 'FURNITURE' },
        { label: 'Books', value: 'BOOKS' },
        { label: 'Jwellery', value: 'JWELLERY' },
        { label: 'Electronics', value: 'ELECTRONICS' },
      ],
      required: true,
    },
    {
      name: 'colorApplies',
      type: 'checkbox',
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        condition: (
          _: Record<string, unknown>,
          siblingsData: Record<string, unknown>
        ): boolean => {
          if (siblingsData.colorApplies) {
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
      admin: {
        condition: (
          _: Record<string, unknown>,
          siblingsData: Record<string, unknown>
        ): boolean => {
          if (siblingsData.category === 'CLOTHES') {
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
          admin: {
            width: '50%',
            condition: (
              _: Record<string, unknown>,
              siblingsData: Record<string, unknown>
            ): boolean => {
              if (siblingsData.category === 'BOOKS') {
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
          admin: {
            width: '50%',
            condition: (
              _: Record<string, unknown>,
              siblingsData: Record<string, unknown>
            ): boolean => {
              if (siblingsData.category === 'BOOKS') {
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
        placeholder: 'Enter Price in Paisa',
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
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
        },
      ],
    },
    {
      name: 'product_images',
      type: 'array',
      labels: {
        singular: 'Product Image',
        plural: 'Product Images',
      },
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'images',
          required: true,
        },
      ],
    },
  ],
};

export default ProductVariant;
