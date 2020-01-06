import React, {useRef, useEffect} from 'react';
import useGlobal from "./store";
import {getData} from './serverData'
import {mushrooms} from "./store/static";

const Controls = props => {
    const [globalState, globalActions] = useGlobal();
    const mapCenterLat = globalState.mapOptions.center.lat;
    const mapCenterLng = globalState.mapOptions.center.lng;
    const latInput = useRef(mapCenterLat);
    const lngInput = useRef(mapCenterLng);
    const mushroomSelect = useRef(null);
    
    return (
        <div className={'controls-wrapper'}>
            <div className={'controls'}>
                <div className={'control'}>
                    <div>Lat</div>
                    <input  ref={latInput} value={mapCenterLat} onChange={()=>{}}  name={'lat'} type="text" />
    
                    <div>Lng</div>
                    <input  ref={lngInput} value={mapCenterLng} onChange={()=>{}}  name={'lng'} type="text"/>
    
                    <button onClick={() => globalActions.addMarker({latInput, lngInput, mushroomSelect})}>Add point</button>
                </div>
               
                <div className={'control'}>
                    <select ref={mushroomSelect} name="mushrooms-list" onChange={()=>{}}>
                        {
                            Object.keys(mushrooms).map(function (item, index) {
                                const mushroom = mushrooms[item];
                                
                                return  <option key={index} value={mushroom.type} >{mushroom.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
            
    );
}

export  {Controls}