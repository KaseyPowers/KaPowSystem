import { createContext, useContext } from "react";

import { useFlagState } from "./flags_state";
import { useSelectedState } from "./use_selected";

import {
  BaseMechanicsContextState,
  useCalculatedValues,
  CalculatedMechanicsObj,
} from "./calculated_values";

interface MechanicsContextState extends BaseMechanicsContextState {
  // calculated values
  values: CalculatedMechanicsObj;
}

const MechanicalContext = createContext<MechanicsContextState | null>(null);

export function useMechanics(): Readonly<MechanicsContextState> {
  const c = useContext(MechanicalContext);
  if (c === null) {
    throw new Error("useMechanics must be inside a provider");
  }
  return c;
}

export function useFlag(key: string): [boolean, (val: boolean) => void] {
  const { flags, setFlag } = useMechanics();
  const flagValue = flags[key];
  return [!!flagValue, (val: boolean) => setFlag(key, val)];
}

export function MechanicsProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const flagStateObj = useFlagState();
  const selectedStateObj = useSelectedState();

  const baseValue: BaseMechanicsContextState = {
    ...flagStateObj,
    ...selectedStateObj,
  };

  const calculated = useCalculatedValues(baseValue);
  const value: MechanicsContextState = {
    ...baseValue,
    values: calculated,
  };

  return (
    <MechanicalContext.Provider value={value}>
      {children}
    </MechanicalContext.Provider>
  );
}
