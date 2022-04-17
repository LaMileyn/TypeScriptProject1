import React, {FC} from 'react';
import './Card.css'
import {ICardItems} from "../../types";


interface ICardProps {
    item: ICardItems,
    handleAddToCard: (clickedItem: ICardItems) => void,
    handleRemoveFromCard: (id: number) => void
}

const Card: FC<ICardProps> = ({item, handleAddToCard, handleRemoveFromCard}) => {
    return (
        <div className="card">
            <div className="main_info_card">
                <div className="card_image">
                    <img src={item.image}
                         alt=""/>
                </div>
                <div className="card_description">
                    <h2>{item.title}</h2>
                    <h3>{item.price}$</h3>
                    <p>{item.description}</p>
                </div>
            </div>
            {
                item.amount ==  0
                    ?
                    (
                        <button className="card_add_button" onClick={() => handleAddToCard(item)} >Добавить</button>
                    )
                    :
                    (
                        <div className="buttons">
                            <button className="card_button_change" onClick={ () => handleRemoveFromCard(item.id)}>-</button>
                            <div className="card_amount">{item.amount}</div>
                            <button className="card_button_change" onClick={() => handleAddToCard(item)}>+</button>
                        </div>
                    )
            }


        </div>
    )
}
export default Card;