import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../services/apiGeocoding.js';
async function getPosition() {
  try {
    const positionObj = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude
    };
  } catch (error) {
    throw new Error(
      'There was a problem getting your address. Make sure to fill this field.'
    );
  }
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    try {
      const position = await getPosition();
      // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode}, ${addressObj?.countryName}`;

      return { position, address };
    } catch (error) {
      throw new Error(
        'There was a problem getting your address. Make sure to fill this field.'
      );
    }
  }
);

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, { payload }) {
      state.username = payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, { payload }) => {
        state.position = payload.position;
        state.address = payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, { error }) => {
        state.status = 'error';
        state.error = error.message;
      })
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;

export const getUser = ({ user }) => user.username;
