import {useContext,useEffect} from 'react';
import WallContext from '../../Contexts/WallContext';
import Wall from './index';
import {initSocket, disconnectSocket, subscribeToWall} from '../../sockets';


function WallWrapper() {
    const {items, setItems,name} = useContext(WallContext);
    
    useEffect(() => {
        initSocket();
        subscribeToWall((data) => {
           
            setItems(prev => {
                
                const obj = {
                    labelId: data.labelId,
                    x:data.x,
                    y:data.y,
                    fromMe:false,
                    color: data.color,
                    name:data.name,
                    text:data.text};
                let newList = [...prev];
               // console.log(`Before splice list :`,newList);
               // const index = newList.findIndex((item) => item.labelId === data.labelId);
                //newList = [...newList.splice(index,1,obj)];
                //console.log(`New updated list :` , newList);
                newList = newList.filter(item => item.labelId !== obj.labelId);
                newList.push(obj);
                
                return newList;    
            });
            //console.log(items);
        });
        return () => {
            disconnectSocket();
        }
    }, [setItems])
    
    return (
        <>
            
            <Wall items={items}/>
        </>
    )
}

export default WallWrapper
