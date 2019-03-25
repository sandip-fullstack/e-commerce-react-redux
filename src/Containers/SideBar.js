import React from "react";
import BasketCart from "./BasketCart";
import Categories from "./Categories";

const SideBar = ()=>{
    return(
        <div>
            <BasketCart/>
            <Categories/>
        </div>
    );
};

export default SideBar;