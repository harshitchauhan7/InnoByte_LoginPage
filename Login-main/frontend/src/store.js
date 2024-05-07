import {configureStore} from "@reduxjs/toolkit";


import { UserLogin, forgotReducer, loadUser, profileReducer, registerUser,allUserReducer } from "./reducer/UserReducer";






const store = configureStore({
    reducer:{
       
        user:UserLogin,
        register:registerUser,
        load:loadUser,
        profile:profileReducer,
        forgot:forgotReducer,
       
        allUsers:allUserReducer
        
    }
},

)



export default store; 