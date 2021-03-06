import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import {Controls} from './GoogleMapsControls';
import useGlobal from "./store";
import {mushrooms} from "./store/static";

export function MapContainer(props) {
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         alert("Geolocation is not supported by this browser.");
    //     }
    // }
    // function showPosition(position) {
    //     var lat = position.coords.latitude;
    //     var lng = position.coords.longitude;
    //     map.setCenter(new google.maps.LatLng(lat, lng));
    // }
    // const latInput = useRef(null);
    // const lngInput = useRef(null);
   
    const [globalState] = useGlobal();
    
    const mapProps = {
        google: props.google,
        zoom: 50,
        style: {
            width: '100%',
            height: '100%',
            position: 'relative',
        },
        initialCenter: {
            lat: 49.853191,
            lng: 36.283477
        },
        mapType: 'satellite'
    }
    console.log(globalState.markers);
    return (
        <div className={'map-holder'}>
            <div className={'map-wrapper'} style={{width: '70%', height: '100vh', position: 'relative'}}>
                <div className={'map'} style={{width: '100%', height: '100%', position: 'absolute'}}>
                    <Map {...mapProps}>
                        {
                            globalState.markers.map(function (item, index) {
                                const mushroom = item.typeId && mushrooms[item.typeId];
                                
                                return  (
                                    <Marker
                                        title= {mushroom && mushroom.name}
                                        id={index}
                                        key={index}
                                        draggable={true}
                                        position={item.position}
                                        icon={{
                                            url: mushroom && mushroom.icon,
                                            anchor: new window.google.maps.Point(32,32),
                                            scaledSize: new window.google.maps.Size(32,32)
                                        }}
                                    />
                                    
                                )
                            })
                        }
                    </Map>
                </div>
            </div>
           <Controls/>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAeTXiA9DcOqTfEbtTubzjMn5lChDuKjFU')
})(MapContainer)