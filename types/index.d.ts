export {};

declare global {
  type NULLABLE<T> = T | null;
  type UNDEFINED<T> = T | undefined;
  type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];
}
