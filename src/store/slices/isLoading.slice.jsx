import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: true,
    reducers: {

        setIsLoading: (state, action)=>{

              const isLoading = action.payload
             return isLoading

        }

    }
})

export const {setIsLoading} = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
