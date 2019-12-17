import React, {useRef} from 'react';
import useGlobal from "./store";

const Controls = props => {
    const [globalState, globalActions] = useGlobal();
    const latInput = useRef(null);
    const lngInput = useRef(null);
    
    return (
        <div className={'controls-wrapper'}>
            <div className={'controls'}>
                <div>Lat</div>
                <input  ref={latInput} defaultValue={'49.853191'}  name={'lat'} type="text" />
    
                <div>Lng</div>
                <input  ref={lngInput}  defaultValue={'36.283797'}  name={'lng'} type="text"/>
    
                <button onClick={() => globalActions.addMarker({latInput, lngInput})}>Add point</button>
            </div>
        </div>
            
    );
}

export  {Controls}