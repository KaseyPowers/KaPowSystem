// make keys required as needed
export type MakeRequiredKey<T extends Object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type MakeKeyOptional<T extends Object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ObjectValues<T> = T[keyof T];