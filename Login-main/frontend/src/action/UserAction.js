import {createAction} from "@reduxjs/toolkit"
import axios from "axios";
//LOGIN USER

export const LOGIN_REQUEST = createAction("LOGIN_REQUEST");
export const LOGIN_SUCCESS =createAction ("LOGIN_SUCCESS");
export const LOGIN_FAIL = createAction("LOGIN_FAIL");

// REGISTER USER

export const REGISTER_USER_REQUEST =createAction ( "REGISTER_USER_REQUEST");
export const REGISTER_USER_SUCCESS = createAction("REGISTER_USER_SUCCESS");
export const REGISTER_USER_FAIL =createAction ("REGISTER_USER_FAIL");

//LOAD USER
export const LOAD_USER_REQUEST =createAction ( "LOAD_USER_REQUEST");
export const LOAD_USER_SUCCESS = createAction("LOAD_USER_SUCCESS");
export const LOAD_USER_FAIL =createAction ("LOAD_USER_FAIL");

//LOGOUT USER


export const LOG_USER_SUCCESS = createAction("LOG_USER_SUCCESS");
export const LOG_USER_FAIL =createAction ("LOG_USER_FAIL");


//update User's Profile

export const UPDATE_PROFILE_REQUEST =createAction ( "UPDATE_PROFILE_REQUEST");
export const  UPDATE_PROFILE_SUCCESS = createAction(" UPDATE_PROFILE_SUCCESS");
export const  UPDATE_PROFILE_FAIL =createAction (" UPDATE_PROFILE_FAIL");
export const UPDATE_PROFILE_RESET = createAction("UPDATE_PROFILE_RESET");

//update password 

export const UPDATE_PASSWORD_REQUEST =createAction ( "UPDATE_PASSWORD_REQUEST");
export const  UPDATE_PASSWORD_SUCCESS = createAction(" UPDATE_PASSWORD_SUCCESS");
export const  UPDATE_PASSWORD_FAIL =createAction (" UPDATE_PASSWORD_FAIL");
export const UPDATE_PASSWORD_RESET = createAction("UPDATE_PASSWORD_RESET");

//forgot password
export const FORGOT_PASSWORD_REQUEST =createAction ( "FORGOT_PASSWORD_REQUEST");
export const  FORGOT_PASSWORD_SUCCESS = createAction(" FORGOT_PASSWORD_SUCCESS");
export const  FORGOT_PASSWORD_FAIL =createAction (" FORGOT_PASSWORD_FAIL");

//reset password
export const RESET_PASSWORD_REQUEST =createAction ( "RESET_PASSWORD_REQUEST");
export const  RESET_PASSWORD_SUCCESS = createAction(" RESET_PASSWORD_SUCCESS");
export const  RESET_PASSWORD_FAIL =createAction (" RESET_PASSWORD_FAIL");

//get all user 
export const ALL_USERS_REQUEST = createAction("ALL_USERS_REQUEST")
export const ALL_USERS_FAIL = createAction("ALL_USERS_FAIL")
export const ALL_USERS_SUCCESS = createAction("ALL_USERS_SUCCESS")


export const login = (email,password) => async( dispatch) =>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        })

        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(`api/v1/loginUser`,{email,password},config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.message,
        
        })
    }
}


// register user

export const register = (userData)=> async(dispatch)=>{
  try {
     dispatch({
        type:REGISTER_USER_REQUEST
     })
     const config = {headers:{"Content-Type":"multipart/form-data"}};
     const {data} = await axios.post(`/api/v1/createUser`,userData,config)
     console.log(data);
     dispatch({
        type:REGISTER_USER_SUCCESS,
        payload:data.user,
     })


  } catch (error) {
    dispatch({
        type:REGISTER_USER_FAIL,
        payload:error.message
    })
    
  }
}
//load user
export const load = ()=> async(dispatch)=>{
    
    try {
        dispatch({
            type:LOAD_USER_REQUEST
        })

    const config = {headers:{"Content-Type":"application/json"}};
    
    const {data} = await axios.get("/api/v1/me",config)

    dispatch({
        type:LOAD_USER_SUCCESS,
        payload:data.user
    })

    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.message
        })
    }
}

//logout user 

export const logoutUser = ()=>async(dispatch)=>{
    try {
       
        await axios.get("api/v1/logout")

        dispatch({
            type:LOG_USER_SUCCESS,
            
            
        })
        
    } catch (error) {
        dispatch({
            type:LOG_USER_FAIL,
            payload:error.message
        })
    }
}

//update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };

     const {data} = await axios.put(`/api/v1/update/me`,userData,config)
     console.log(data)
      
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success});
      

 
 

    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error,
      });
    }
  };

  //UPDATE PASSWORD 

  export const updatePassword = (passwords)=> async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST
        })

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.put("/api/v1/updatePassword",passwords,config)
        console.log(data)

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error
        })
    }
  }


//forgot password

export const forgotPassword = (email) => async(dispatch)=>{
    try {
        
        dispatch({
            type:FORGOT_PASSWORD_REQUEST
        })
        
        const  config = {headers:{"Content-Type":"application/json"}};
        
        const {data} = await axios.post("/api/v1/forgotPassword",email,config)

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })



        


    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error
        })
    }
}

//reset password 

export const resetPassword = (id,passwords)=> async(dispatch)=>{
    try {

        dispatch({
            type:RESET_PASSWORD_REQUEST
        })
        const  config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.put(`/api/v1/password/reset/${id}`,passwords,config)
        
        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.success
        })
        
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.message
        })
    }
}

//get all users --admin
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.message });
    }
  };