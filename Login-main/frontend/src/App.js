import React,{useEffect, useState} from 'react'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Webfont from "webfontloader"

import Home from './components/Home/Home';

import LoginUser from './components/User/LoginUser';     
import { useDispatch, useSelector } from 'react-redux';
import { load, logoutUser } from './action/UserAction';
import UserOptions from './components/layout/Header/UserOptions';
import Account from './components/User/Account';

import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';









function App() {

  const dispatch = useDispatch();
  
  const {isAuthenticated, user} = useSelector((state)=>state.load)

  useEffect(() => {
  Webfont.load({
    google:{
      families:["Roboto","Chilanka","Droid Sans"]
    }
  })

    dispatch(load())
  
 
 }, [dispatch])
 
 
  return (
    <>
    <Router>
      
    {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      <Route exact path='/' Component={Home}></Route>
      
      
      

      <Route exact path='/login' Component={LoginUser}/>
      <Route exact path='/account' Component={Account}/>
      <Route exact path='/me/update'Component={UpdateProfile}/>
      <Route exact path='/password/update' Component={UpdatePassword}/>
      <Route exact path='/password/forgot' Component={ForgotPassword}/>
    
     
      </Routes>
 
    </Router>

   
    </>
  );
}

export default App;
