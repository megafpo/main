import { useState, useMemo, useEffect, useRef } from "react";
import Apple from '../../apple.png'
import Strawberry from '../../strw.png'
import Banana from '../../banana.png'
import axios from 'axios';
import {
    GoogleMap,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

const mapContainerStyle = {
    height: "400px",
    width: "800px"
}

export default function Map() {

    const [fieldInfoWindowVisible, setFieldInfoWindowVisible] = useState(false);
    const [orchidInfoWindowVisible, setOrchidInfoWindowVisible] = useState(false);
    
    const [FieldListings, setFieldList] = useState(null);
    const [OrchidListings, setOrchidList] = useState(null);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            const resp = await axios.get("https://megafpo.herokuapp.com/Field-Listings");
            const response = await axios.get("https://megafpo.herokuapp.com/Orchid-Listings");
            setFieldList(resp.data, setTimeout(() => {
                console.log("SetField = ", FieldListings);
            }, 5000))
            setOrchidList(response.data)
        } catch (error) {
            console.log("error", error);
        }
    }

    const position = {
        lat: 36.47701575841023,
        lng: -0.715393306648977
    }
    const center = useMemo(() => ({ lat: 22.420963412473867, lng: 79.3181883423743, }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), []
    );
    const onClickOrchid = e => {
        console.log("e", e);
        setOrchidInfoWindowVisible(!orchidInfoWindowVisible);
        
    }

    const onClickField = e => {
        console.log("e", e);
        setFieldInfoWindowVisible(!fieldInfoWindowVisible);
    
    }

    return (
        <GoogleMap zoom={4.1} center={center} mapContainerStyle={mapContainerStyle}
            options={options}
        // onLoad={onLoad}
        >
            {FieldListings && FieldListings.map((Listing, i) => (
                <><Marker key={i} onClick={event => onClickField(Listing)} onLoad={() => { console.log("field marker # " + [i + 1] + " ", Listing); } } position={Listing.address}
                    icon={{ url: Strawberry, scaledSize: { height: 40, width: 40 }, }} />
                     {fieldInfoWindowVisible &&(
                    <InfoWindow position={Listing.address}>
                        <div>
                        <header >Field</header>
                            <h2>Type: {Listing.Type}</h2>
                            
                            <h3>{Listing.Type} Name: {Listing.fieldName}</h3>
                            <h3> Variety: {Listing.variety}</h3>
                            <h3> Sowing Month: {Listing.sewingMonth}</h3>
                            <h3> Harvest Month: {Listing.harvestMonth}</h3>
                            <h3> Expected Yield: {Listing.expectedYield}</h3>
                            
                            
                        </div>
                    </InfoWindow>
                     )}</>
            
                ))
            }
            {OrchidListings && OrchidListings.map((Listing, i) => (
                <><Marker key={i} onClick={event => onClickOrchid(Listing)}
                    onLoad={() => { console.log("orchid marker # " + [i + 1] + " ", Listing); } }
                    position={Listing.address}
                    icon={{ url: Apple, scaledSize: { height: 20, width: 20 }, }} />


        {orchidInfoWindowVisible &&( <InfoWindow position={Listing.address} >
                        <div>
                             <header >Orchid</header>
                           <h2>Type: {Listing.Type}</h2>
                            
                          <h3>{Listing.Type} Name: {Listing.fieldName}</h3>
                         
                          <h3> Variety: {Listing.variety}</h3> 
                           <h3> Establishment Year: {Listing.establishmentYear}</h3> 
                           <h3> Harvest Month: {Listing.harvestMonth}</h3> 
                           <h3> Expected Yield: {Listing.expectedYield}</h3> 
                           
                       </div>
                    </InfoWindow>
                   )} 

                    
                        
                    </>
                      
                   
))}

 {/* <Marker position={position} onClick={() => setInfoWindowVisible(!infoWindowVisible)}/> */}
{/* {infoWindowVisible && (
                        <InfoWindow position={position}>
                          <div>Hi!!</div>
                        </InfoWindow>
                      )}          */}

             </GoogleMap>

    )

}