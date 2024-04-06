import { AllTypes } from "@/shared/types/api-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: AllTypes = {
    fuelTypes: [],
    engineTypes: [],
    statusTypes: [],
    gearboxTypes: [],
    driveUnitTypes: [],
    paymentMethods: [],
};

export const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        setTypesState: (state, action: PayloadAction<Partial<AllTypes>>) => {
            const { payload } = action;
            Object.entries(payload).forEach(([key, value]) => {
                if (key in state) {
                    state[key] = value;
                }
            });
        },
    },
});

export const { setTypesState } = typesSlice.actions;

export const selectAllTypes = (state: RootState) => state.typesReducer
export const selectFuelTypes = (state: RootState) => state.typesReducer.fuelTypes;
export const selectEngineTypes = (state: RootState) => state.typesReducer.engineTypes;
export const selectStatusTypes = (state: RootState) => state.typesReducer.statusTypes;
export const selectGearboxTypes = (state: RootState) => state.typesReducer.gearboxTypes;
export const selectDriveUnitTypes = (state: RootState) => state.typesReducer.driveUnitTypes;
export const selectPaymentMethods = (state: RootState) => state.typesReducer.paymentMethods;

export default typesSlice.reducer;
