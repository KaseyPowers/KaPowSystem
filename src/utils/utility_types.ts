
export type ReplaceType<ObjType, ReplaceKeys extends keyof ObjType, ToType> = Omit<ObjType, ReplaceKeys> & {
    [P in keyof ObjType as ReplaceKeys]: ToType
}

export type OptionalKeysObject<ObjType, OptionalKeys extends keyof ObjType> = Omit<ObjType, OptionalKeys> & Partial<Pick<ObjType, OptionalKeys>>