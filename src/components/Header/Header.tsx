import React, {FC} from 'react';
import './Header.css'
import {ICardItems} from "../../types";
import {Link} from "react-router-dom";

interface IHeaderProps {
    cart : ICardItems[],
    handleAddToCard: (clickedItem: ICardItems) => void,
    handleRemoveFromCard: (id: number) => void
}

const Header : FC<IHeaderProps> = ({cart,handleAddToCard,handleRemoveFromCard}) => {
    return (
        <header className="header">
            <div className="header_wrapper">
                <div className="bin_count">
                    <Link to={'/cart'} className="link"><h3>Корзина</h3></Link>
                    <div className ="header_count header_count_active" style={{background : `${cart.length > 0 ? "red" : "black"}`}}>{cart.length}</div>
                </div>
            </div>
        </header>
    )
}
export default Header;