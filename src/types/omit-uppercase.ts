type OmitUppercase<T> = {
  [K in keyof T as K extends `${infer First}${infer Rest}`
    ? First extends Uppercase<First>
      ? never
      : K
    : never]: T[K];
};
