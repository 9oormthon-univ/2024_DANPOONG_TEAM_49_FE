import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kakaoId: null,
};

const kakaoSlice = createSlice({
  name: 'kakao',
  initialState,
  reducers: {
    setKakaoId: (state, action) => {
      state.kakaoId = action.payload;
    },
    clearKakaoId: (state) => {
      state.kakaoId = null;
    },
  },
});

export const { setKakaoId, clearKakaoId } = kakaoSlice.actions;
export default kakaoSlice.reducer;
