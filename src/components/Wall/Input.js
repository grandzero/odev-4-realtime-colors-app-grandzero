import {useState,useRef,memo,useContext} from 'react';
import {sendMessage} from '../../sockets';
import WallContext from '../../Contexts/WallContext';
import ReactTooltip from 'react-tooltip';


function Input({item}) {
    const {color,name} = useContext(WallContext); 
    const style = {position:"absolute",fontSize:32,color:color,borderBottom:"1px solid black",left:item.x,top:item.y,backgroundColor: "transparent"};
    const h1Style = {position:"absolute", color:item.color,left:item.x,top:item.y,fontSize:32,border:"none",backgroundColor: "transparent"};
    const myStyle = {position:"absolute", color:color,left:item.x,top:item.y,fontSize:32,border:"none",backgroundColor: "transparent"};
    const [val, setVal] = useState("");
    const [styling,setStyling] = useState(item.fromMe ? style : h1Style);
    const [isEmpty,setEmpty] = useState(false);
    const inputArea = useRef(null);
    
    const  isBlank = (str) => {
        return (!str || /^\s*$/.test(str));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        inputArea.current.blur();
        isBlank(val) && setEmpty(true);  
        setStyling(myStyle);
        //sendMessage({x:item.x, y: item.y, fromMe:false, text:val});
        //setItems(prev => [...prev,{x:item.x, y: item.y, fromMe:true, text:val}])
        
    }
    const handleChange = e => {
        e.target.value.length < 21 && setVal(e.target.value)
        sendMessage({labelId:item.labelId,x:item.x, y: item.y, color:color,fromMe:false, text:e.target.value,name:name});
    }
    const handleBlur = (e) => {
        isBlank(e.target.value) ? setEmpty(true) : setStyling(myStyle);
        
        //setItems(prev => [...prev,{x:item.x, y: item.y, fromMe:true, text:val}])
    }
    return (
        <>
        <ReactTooltip />
        {!item.fromMe ? <div data-tip={item.name} style={styling}>{item.text}</div> : !isEmpty && <form onSubmit={handleSubmit}>
        {<input type="text" ref={inputArea} autoFocus onFocus={() => setStyling(style)} onBlur={handleBlur} style={styling} item={item}  value={val} onChange={handleChange}></input> }
        </form>}   
        </>
    )
}

export default memo(Input)
