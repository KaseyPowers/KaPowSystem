export type ReplaceType<ObjType, ReplaceKeys extends keyof ObjType, ToType> = Omit<ObjType, ReplaceKeys> & {
    [Property in ReplaceKeys]: ToType
};

// export type OptionalKeysObject<ObjType, OptionalKeys extends keyof ObjType> = {
//     [Property in Exclude<keyof ObjType, OptionalKeys>]: ObjType[Property]
// } & {
//         [Property in OptionalKeys]?: ObjType[Property]
//     };

export type OptionalKeysObject<ObjType, OptionalKeys extends keyof ObjType> = Omit<ObjType, OptionalKeys> & Partial<Pick<ObjType, OptionalKeys>>;