export interface SlateText extends Text {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  text?: string;
}

// this is where you customize. If you omit this, it will revert to a default.
declare module 'slate' {
  export interface CustomTypes {
    Text: SlateText;
  }
}
