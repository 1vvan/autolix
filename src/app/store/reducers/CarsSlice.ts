import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAllCarsModels, IBrands, IModels } from "@/shared/types/api-types";

interface CarsModelsState {
  brands: IBrands[];
  models: IModels[];
}

const initialState: CarsModelsState = {
  models: [],
  brands: []
};

export const carsSlice = createSlice({
  name: 'carsModels',
  initialState,
  reducers: {
    setCarsModelsState: (state, action: PayloadAction<IAllCarsModels>) => {
      state.brands = action.payload.brands;
      state.models = action.payload.models;
    },
  },
});

export const { setCarsModelsState } = carsSlice.actions;

export const selectAllCarsModels = (state: RootState) => state.carsReducer;

export default carsSlice.reducer;
