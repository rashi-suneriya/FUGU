import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

/**
 * 
 * STEPS for State Management
 * Submit Action
 * Handle action in it's reducer 
 * Register Here -> Reduceer
 * 
 */





 export const store  = configureStore({

  reducer: {
     auth: authReducer,
     posts: postReducer
     
  }
})
