import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {ICardItems} from "./types";
import axios from "axios";
import Card from "./components/Card/Card";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Cart from "./components/Cart/Cart";

function App() {

    const [data, setData] = useState<ICardItems[]>([]);
    const [cart, setCart] = useState<ICardItems[]>([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        try {
            const response = await axios.get<ICardItems[]>("https://fakestoreapi.com/products");
            setData(response.data.map(el => {
                return {...el, amount: 0}
            }))

        } catch (e) {
            console.log(e)
        }
    }
    const deleteFromCart = (id : number) => {
        setCart( prevState => prevState.filter( el => el.id !== id));
        setData( prevState =>  prevState.map( el => el.id === id ? ({...el, amount : 0}) : el ) )
    }
    const handleAddToCard = (clickedItem: ICardItems) => {
        setCart(prevState => {
            const isItemInArr = prevState.find(el => el.id === clickedItem.id);
            if (isItemInArr) {
                return prevState.map(item => item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item)
            } else {
                return [...prevState, {...clickedItem, amount: 1}]
            }
        })
        setData( prevState => prevState.map( el => el.id === clickedItem.id ? ({...el, amount : el.amount + 1}) : el ))
    };
    const handleRemoveFromCard = (id: number) => {
        setCart(prevState => {
            return prevState.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.amount == 1) return acc
                    return [...acc, {...item, amount: item.amount - 1}]
                } else{
                    return [...acc,item]
                }
            }, [] as ICardItems[])

        })
        setData( prevState => prevState.map( el => {
           return el.id === id ? {...el, amount : el.amount - 1} : el
        } ))

    };
    return (
        <BrowserRouter>
            <Header cart={cart} handleAddToCard={handleAddToCard} handleRemoveFromCard={handleRemoveFromCard}/>
            <Routes>
                <Route path ="/" element={
                    <div className="main_wrapper">
                        <div className="cards_wrapper">
                            {data?.map(el => (
                                <Card key={el.id} item={el} handleAddToCard={handleAddToCard}
                                      handleRemoveFromCard={handleRemoveFromCard}/>
                            ))}

                        </div>
                    </div>

                }>
                </Route>
                <Route path ="/cart" element={<Cart deleteFromCart={deleteFromCart} item={cart} handleRemoveFromCard={handleRemoveFromCard} handleAddToCard={handleAddToCard}/>}/>
            </Routes>

        </BrowserRouter>

    )
}

export default App;
