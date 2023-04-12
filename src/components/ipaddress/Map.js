import React,{useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function Map(props) {
    const RenderMap = ({lat,lng})=>{
        const map = useMap()
        useEffect(()=>{
            map.setView([lat,lng])
        },[lat,lng])
        return null
    }
  return (
    <>
      <MapContainer center={[props.latitude, props.longtitude]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[props.latitude,props.longtitude]}/>
          <RenderMap lat={props.latitude} lng={props.longtitude} />
      </MapContainer>
    </>
  );
}

export default Map;
