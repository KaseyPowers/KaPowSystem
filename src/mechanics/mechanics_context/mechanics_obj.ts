
// Starting here, will build up over time
export interface MechanicsObj<Type> {
    readonly attributes: Type
}

export type MechanicsObjectKeys = keyof MechanicsObj<unknown>
