import { configureStore } from '@reduxjs/toolkit';
import userlistSliceReducer from '../features/userlist/userlistSlice';
import userEditReducer from '../features/userlist/userEditSlice';
import addUserSliceReducer from '../features/userlist/addUserSlice';
import userloginSliceReducer from '../features/userlogin/userloginSlice';


export const store = configureStore({
  reducer: {
    userlist : userlistSliceReducer,
    userEdit : userEditReducer,
    addUser : addUserSliceReducer,
    userlogin : userloginSliceReducer,
  },
});
