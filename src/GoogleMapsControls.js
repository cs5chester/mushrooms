import React, {useRef, useEffect} from 'react';
import useGlobal from "./store";
import {getData} from './getServerData'
import {mushrooms} from "./store/static";
import {Marker} from "google-maps-react";

const Controls = props => {
    const [globalState, globalActions] = useGlobal();
    const latInput = useRef(null);
    const lngInput = useRef(null);
    const mushroomSelect = useRef(null);
    const serverUrl = 'https://my-json-server.typicode.com/cs5chester/mushrooms/db';
    
    
    useEffect(() => {
        function handleUpdateMarkers(data) {
            globalActions.updateMarkers(data)
        }
        
        getData(serverUrl, handleUpdateMarkers);
    }, []);
    
    return (
        <div className={'controls-wrapper'}>
            <div className={'controls'}>
                <div className={'control'}>
                    <div>Lat</div>
                    <input  ref={latInput} defaultValue={'49.853191'}  name={'lat'} type="text" />
    
                    <div>Lng</div>
                    <input  ref={lngInput}  defaultValue={'36.283797'}  name={'lng'} type="text"/>
    
                    <button onClick={() => globalActions.addMarker({latInput, lngInput, mushroomSelect})}>Add point</button>
                </div>
               
                <div className={'control'}>
                    <select ref={mushroomSelect} name="mushrooms-list" defaultValue={''}>
                        {<option value='' >Выберите гриб</option>}
                        {
                            Object.keys(mushrooms).map(function (item, index) {
                                const mushroom = mushrooms[item];
                                
                                return  <option key={index} value={mushroom.id} >{mushroom.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
            
    );
}

export  {Controls}