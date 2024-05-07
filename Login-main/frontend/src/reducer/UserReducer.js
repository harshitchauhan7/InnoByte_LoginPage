
import { createReducer } from "@reduxjs/toolkit";
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_USER_FAIL,
  LOG_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,
  ALL_USERS_FAIL,ALL_USERS_REQUEST,ALL_USERS_SUCCESS
} from "../action/UserAction";

const initalValue = {
  LoginData: [],
};

export const UserLogin = createReducer(initalValue, (builder) => {
  builder.addCase(LOGIN_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(LOGIN_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      Login: action.payload,
    };
  });

  builder.addCase(LOGIN_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
      user: null,
    };
  });
});

//register user
const registerInitial = {
  registerData: [],
};

export const registerUser = createReducer(registerInitial, (builder) => {
  builder.addCase(REGISTER_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(REGISTER_USER_SUCCESS, (state, action) => {
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      registerUser: action.payload,
    };
  });
  builder.addCase(REGISTER_USER_FAIL, (state, action) => {
    return {
      loading: false,
      message: action.payload,
    };
  });
});

//load user

export const loadUser = createReducer(initalValue, (builder) => {
  builder.addCase(LOAD_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(LOG_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      user: null,
      isAuthenticated: false,
    };
  });

  builder.addCase(LOG_USER_FAIL, (state, action) => {
    return {
      loading: true,
      error: action.payload,
    };
  });

  builder.addCase(LOAD_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  });

  builder.addCase(LOAD_USER_FAIL, (state, action) => {
    return {
      loading: true,
      error: action.payload,
    };
  });
});

//logout

//profile reducer
export const profileReducer = createReducer(initalValue, (builder) => {
  builder.addCase(UPDATE_PROFILE_REQUEST, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });

  builder.addCase(UPDATE_PROFILE_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: action.payload,
    };
  });

  builder.addCase(UPDATE_PROFILE_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_PROFILE_RESET, (state, action) => {
    return {
      isUpdated: false,
    };
  });
  builder.addCase(UPDATE_PASSWORD_REQUEST, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  });

  builder.addCase(UPDATE_PASSWORD_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: action.payload,
    };
  });

  builder.addCase(UPDATE_PASSWORD_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_PASSWORD_RESET, (state, action) => {
    return {
      isUpdated: false,
    };
  });
});

//forgot and reset of passwords

export const forgotReducer = createReducer(initalValue, (builder) => {
  builder.addCase(FORGOT_PASSWORD_REQUEST, (state, action) => {
    return {
      loading: true,
      error: null,
    };
  });

  builder.addCase(FORGOT_PASSWORD_SUCCESS, (state, action) => {
    return {
      loading: false,
      message: action.payload,
    };
  });

  builder.addCase(FORGOT_PASSWORD_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(RESET_PASSWORD_REQUEST, (state, action) => {
    return {
      loading: true,
      error: null,
    };
  });

  builder.addCase(RESET_PASSWORD_SUCCESS, (state, action) => {
    return {
      loading: false,
      success: action.payload,
    };
  });

  builder.addCase(RESET_PASSWORD_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});

//get all users --admin

export const allUserReducer = createReducer(initalValue, (builder)=>{
  builder.addCase(ALL_USERS_REQUEST,(state,action)=>{
    return{
      loading:true,

    }
  });
  builder.addCase(ALL_USERS_SUCCESS,(state,action)=>{
    return{
      loading:false,
      users:action.payload,
    }
  })

  builder.addCase(ALL_USERS_FAIL,(state,action)=>{
    return{
      loading:false,
      error:action.payload,
    }
  })
})