import React, {FC, useCallback} from 'react';
import './Cart.css'
import Cart_item from "./Cart_item";
import {ICardItems} from "../../types";
import {Link} from "react-router-dom";

interface ICart {
    item: ICardItems[],
    handleAddToCard: (clickedItem: ICardItems) => void,
    handleRemoveFromCard: (id: number) => void,
    deleteFromCart : (id: number) => void
}


const Cart : FC<ICart> = ({item,handleRemoveFromCard,handleAddToCard,deleteFromCart}) =>{

    return (
        <div className="main_wrapper">
            <Link to={'/'} className="back"><h3 >Назад</h3></Link>
            <h1>Корзина товаров</h1>
            <div className="cart_items">
                {item.map( el => {
                    return <Cart_item item={el} key ={el.id} deleteFromCart ={deleteFromCart} handleAddToCard={handleAddToCard} handleRemoveFromCard={handleRemoveFromCard}/>
                })}
            </div>
            <div className="total">
                <div className="total_price"><h3> Всего: {item.reduce( (acc,curr) => acc + ( curr.price * curr.amount ) ,0)}$</h3></div>
            </div>
        </div>
    )
}
export default Cart;