import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/services/redux/reducers'

export const store = configureStore({
  reducer: rootReducer, // atau gabungkan reducer yang lainnya di sini
});
