import React from 'react';
import {Marker} from 'google-maps-react';


const Markers = props => {
    return (
        props.markers.map(function (item, index) {
            console.log(item);
            return <Marker
                    title="Location"
                    id={index}
                    key={index}
                    draggable={true}
                    position={item.position}/>
            
        })
    );
}

export  {Markers}