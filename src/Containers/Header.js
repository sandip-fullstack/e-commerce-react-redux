import React from 'react';
import {browserHistory} from "react-router";

const Header = ()=>{
    return (
        <div className="header">
          <div style={{cursor: "pointer"}} onClick={() => browserHistory.push("/")}>My E-Commerce</div>
        </div>
    )
};

export default Header;