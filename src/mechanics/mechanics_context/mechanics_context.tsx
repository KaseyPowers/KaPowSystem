import { createContext, useContext, useState } from "react";

// import { Attributes } from "../base";

import { UseFlagsStateOpts, useFlagsState, FlagsState } from "./flags_state";

type UpdateFnType<T> = T | ((current: T) => T);
type UpdateStateType<T> = (key: string, val: UpdateFnType<T>) => void;

// base selection type
type BaseSelectionType = string | string[];

type SelectionStateObj =
  | BaseSelectionType
  | ({
      // kinda messy but how we can give attributes a specific extra selection type
      attributes:
        | BaseSelectionType
        | {
            [attributeKey: string]: number;
          };
    } & {
      [key: string]: BaseSelectionType;
    });

// defaulting to an empty array as the simplist empty value (other option is adding undefined as a BaseSelectionType)
const defaultSelectionState: SelectionStateObj = [];

// base state will have flexible but narrowed to expected results, exceptions will be defined to start
interface MechanicsContextState extends FlagsState {
  selection: SelectionStateObj;
  // keeping the key in the function signature here because it will make standardized consuming o fhte context easier even if key is ignored in the update fn
  setSelection: UpdateStateType<SelectionStateObj>;
  // define other stuff here?
}

const MechanicalContext = createContext<MechanicsContextState | null>(null);

export function useMechanics(): Readonly<MechanicsContextState> {
  const c = useContext(MechanicalContext);
  if (c === null) {
    throw new Error("useMechanics must be inside a provider");
  }
  return c;
}

interface MechanicsProviderProps extends UseFlagsStateOpts {
  children: React.ReactNode;
}

export function MechanicsProvider2({
  children,
  initialFlagState,
  setFlagStateFn,
}: MechanicsProviderProps) {
  const flagState = useFlagsState({
    initialFlagState,
    setFlagStateFn,
  });

  const value = {
    ...flagState,
  };

  return (
    <MechanicalContext.Provider value={value}>
      {children}
    </MechanicalContext.Provider>
  );
}
