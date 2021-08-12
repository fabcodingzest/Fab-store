import { ReactEditor } from 'slate-react';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';

export interface SlateText extends Text {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  text?: string;
}

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
};
export type CustomElement = { type: 'paragraph'; children: CustomText[] };

// this is where you customize. If you omit this, it will revert to a default.
declare module 'slate' {
  export interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: SlateText;
  }
}
