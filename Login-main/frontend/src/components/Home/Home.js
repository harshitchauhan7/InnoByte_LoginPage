import React, { Fragment } from "react";

import "./Home.css";

import MetaData from "../layout/MetaData";



const Home = () => {
 


 

  return (
    <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
           
            <h1>Welcome to Home Page</h1>
            <a href="/login"><button>login</button></a>

           
          </div>

          

         
        </Fragment>
  );
};

export default Home;
