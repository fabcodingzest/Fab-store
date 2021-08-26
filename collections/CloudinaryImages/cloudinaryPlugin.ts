import { Config } from 'payload/config';
import hooks from './hooks/CloudinaryMediaHooks';

const addCloudinary = (incomingConfig: Config): Config => {
  const config: Config = {
    ...incomingConfig,
    collections: incomingConfig.collections.map((collection) => {
      if (collection.slug === 'images') {
        return {
          ...collection,
          hooks: {
            ...collection.hooks,
            beforeChange: [hooks.beforeChangeHook],
            // afterChange: [hooks.afterChangeHook],  // Don't need this anymore.
            afterDelete: [hooks.afterDeleteHook],
          },
          fields: [
            ...collection.fields,
            {
              name: 'cloudPublicId',
              type: 'text',
              access: {
                // prevent writing to the field, instead hooks are responsible for this
                create: () => false,
                update: () => false,
              },
              admin: {
                position: 'sidebar',
                condition: (data) => Boolean(data?.cloudPublicId),
                readOnly: true,
              },
            },
            {
              name: 'cloudinaryURL',
              type: 'text',
              access: {
                // prevent writing to the field, instead hooks are responsible for this
                create: () => false,
                update: () => false,
              },
              admin: {
                position: 'sidebar',
                readOnly: true,
                // only show the field when it has a value
                condition: (data) => Boolean(data?.cloudinaryURL),
              },
            },
          ],
        };
      }

      return collection;
    }),
  };

  return config;
};

export default addCloudinary;
