/* eslint-disable @typescript-eslint/no-explicit-any */
const vairantFields: any = [
  {
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
