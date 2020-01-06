import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import {Controls} from '../../GoogleMapsControls';
import useGlobal from "../../store";
import Marker from '../Marker';
import {getData} from "../../serverData";

export default function MapContainer(props) {
    const [globalState, globalActions] = useGlobal();
    console.log(globalState);
    const mapProps = {
        bootstrapURLKeys:{ key: 'AIzaSyAeTXiA9DcOqTfEbtTubzjMn5lChDuKjFU' },
        options: {
            mapTypeControl: true,
            mapTypeId: 'hybrid'
        },
        zoom: globalState.mapOptions.zoom,
        center: globalState.mapOptions.center,
        onClick: globalActions.setMapCenter,
        yesIWantToUseGoogleMapApiInternals: true,
        resetBoundsOnResize: true,
        onChange: globalActions.handleMapChange
    }
    
    useEffect(() => {
        function handleUpdateMarkers(data) {
            globalActions.updateState(data)
        }
        
        getData(handleUpdateMarkers);
    }, []);
    
    return (
        globalState.isLoaded? <div className={'map-holder'}>
            <div className={'map-wrapper'} style={{width: '70%', height: '100vh', position: 'relative'}}>
                <div className={'map'} style={{width: '100%', height: '100%', position: 'absolute'}}>
                    <GoogleMapReact {...mapProps}>
                        {globalState.clusters.map(item => {
                            return (
                                <Marker
                                    key={item.id}
                                    lat={item.lat}
                                    lng={item.lng}
                                    points={item.points}
                                />
                            );
                        })}
                    </GoogleMapReact>
                </div>
            </div>
           <Controls/>
        </div> : 'Loading...'
    );
}


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