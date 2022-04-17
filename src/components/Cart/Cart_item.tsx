import React, {FC} from 'react';
import {ICardItems} from "../../types";

interface ICartItem {
    item: ICardItems,
    handleAddToCard: (clickedItem: ICardItems) => void,
    handleRemoveFromCard: (id: number) => void,
    deleteFromCart : (id: number) => void
}

const CartItem: FC<ICartItem> = ({item, handleAddToCard, handleRemoveFromCard,deleteFromCart}) => {
    return (
        <div className="cart_item">
            <div className="cart_image">
                <div className="image_cart"><img src={item.image} alt=""/></div>
                <div className="desc_cart">{item.title}</div>
            </div>
            <div className="right">
                <div className="cart_price_and_count">
                    <span>Цена: {item.price * item.amount}$</span>
                    <span>Колличество: <button className="cart_button_change" onClick={() => handleRemoveFromCard(item.id)}>-</button>{item.amount}<button className="cart_button_change"
                        onClick={() => handleAddToCard(item)}>+</button> </span>

                </div>
                <button className="delete" onClick={() => deleteFromCart(item.id)}>Удалить</button>
            </div>
        </div>
    )
}
export default CartItem;