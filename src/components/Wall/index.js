import {useState, useEffect,useContext} from 'react'
import WallContext from '../../Contexts/WallContext';
import Input from './Input';
import {v4} from 'uuid';
import Header from '../Header';
function Wall({items,setPositions}) {
    const {setItems,setColor} = useContext(WallContext);  
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    //const [isTyping, setTyping] = useState(false);

    
    useEffect(
      () => {
        const update = (e) => {
          setX(e.x)
          setY(e.y)
          
        }
        const clicked = (e) => {
            //console.log(e.path[0].nodeName == "INPUT");
            //e.path[0].nodeName === "INPUT" && console.log("Clicked");
            //console.log(v4());
            e.path[0].nodeName === "HTML" && setItems(prev => [...prev,{labelId:v4(),x:e.x,y:e.y,fromMe:true,msg:""}]);
        }
        window.addEventListener('mousemove', update)
        window.addEventListener('touchmove', update)
        window.addEventListener('click',clicked);
        return () => {
          window.removeEventListener('mousemove', update)
          window.removeEventListener('touchmove', update)
          window.removeEventListener('click', clicked)
        }
      },
      [setItems]
    )
    return ( 
        <>
          <Header/>
          {items.length > 0 && items.map((item,id) => <Input  key={id} item={item}></Input>)}

        </>
    )
}

export default Wall
