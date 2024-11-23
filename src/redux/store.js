import { configureStore } from '@reduxjs/toolkit';
import kakaoReducer from './kakaoSlice'; // 올바른 경로로 수정

const store = configureStore({
  reducer: {
    kakao: kakaoReducer, // 리듀서 이름이 'kakao'인지 확인
  },
});

export default store;
