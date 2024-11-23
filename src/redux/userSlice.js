import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kakaoId: null, // userId 기본값
};

const userSlice = createSlice({
  name: 'kakaoId',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.kakaoId = action.payload; // userId 업데이트
    },
    clearUserId: (state) => {
      state.kakaoId = null; // userId 초기화
    },
  },
});

export const { setKakaoId, clearKakaoId } = userSlice.actions;

export default userSlice.reducer;