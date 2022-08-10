import { useState, useCallback } from "react";

interface FlagsStateObj {
    readonly [key: string]: boolean;
}

export interface FlagsState {
    readonly flags: FlagsStateObj,
    readonly setFlag: (key: string, val: boolean) => void;
}

export function useFlagState(): FlagsState {
    const [flags, setFlagsState] = useState<FlagsStateObj>({});
    const setFlag = useCallback(
        (key: string, val: boolean) => {
            setFlagsState((current) => ({
                ...current,
                [key]: val,
            }));
        },
        [setFlagsState]
    );
    return {
        flags,
        setFlag,
    };
}
