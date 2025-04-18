declare module 'react' {
  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
    // 保留自定义属性声明
  }
}

declare module '*.png';
declare module '*.jpg';

declare global {
  namespace JSX {
    interface IntrinsicAttributes extends React.Attributes {}
  }
}