import {createContext, useState} from 'react';

const WallContext = createContext(null);

export const WallProvider = ({children}) => {
    const [items,setItems] = useState([]);
    const [color,setColor] = useState("black");
    const [name,setName] = useState(`Anonym${Math.floor(Math.random()*10000000)}`)

    const values = {
        items,
        setItems,
        color,
        setColor,
        name,
        setName
    }
    return <WallContext.Provider value = {values}>{children}</WallContext.Provider>
}
export default WallContext;