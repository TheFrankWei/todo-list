import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../features/table/tableSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
  },
});
