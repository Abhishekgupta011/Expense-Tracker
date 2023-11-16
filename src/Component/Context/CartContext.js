import React from "react";

const CartContext = React.createContext({
    items:[],
    additem:(item)=>{},
    removeitem:()=>{},
})

export default CartContext;