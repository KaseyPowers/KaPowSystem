// make keys required as needed
export type PartialRequired<T extends Object, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type PartialPartial<T extends Object, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type MakeInputType<
  T extends Object,
  RemoveKeys extends keyof T,
  OptionalKeys extends keyof T
> = Omit<T, RemoveKeys | OptionalKeys> & Partial<Pick<T, OptionalKeys>>;

export type ObjectValues<T> = T[keyof T];
