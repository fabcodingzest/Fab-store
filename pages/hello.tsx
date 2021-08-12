import React, { useEffect, useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';

const Hello: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [
        {
          text: 'Hello',
          bold: true,
        },
      ],
    },
  ]);

  return (
    <div>
      Hello
      <form>
        <label htmlFor="product-name">Product Name</label>
        <input type="text" id="product-name" />
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable
            onKeyDown={(event) => {
              if (event.key === '&') {
                // Prevent the ampersand character from being inserted.
                event.preventDefault();
                // Execute the `insertText` method when the event occurs.
                editor.insertText('and');
              }
            }}
          />
        </Slate>
      </form>
    </div>
  );
};

export default Hello;
