import {useContext} from 'react';
import WallContext from "../../Contexts/WallContext";
import { SliderPicker } from 'react-color'

function Header() {
    const {color,setColor,name,setName} = useContext(WallContext);
    const style = {
        width : "100%",
        height:"auto",
        marginRight:25,
        backgroundColor:"white",
        flex:1,
        display:"flex",
        textAlign:"center",
        justifyConten:"center"
    }
    
    return (
        <div style={style}>
          <div style={{flex:1,padding:10}}><SliderPicker style={{width:50}}  color={color} onChange={ (clr,event) =>  {setColor(clr.hex)}} /></div>
          <form style={{flex:1,margin:"auto"}} onSubmit={(e)=> {e.preventDefault();setName(name);}}>
              <input style={{ backgroundColor:"black",color:"white", fontSize:27}} value={name} onChange={(e) => setName(e.target.value)}></input>
          </form>
          <p style={{width:"auto",color:"black",flex:1}}>You have got only 20 characters ...</p>
        </div>
    )
}

export default Header
