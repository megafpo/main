import { useLoadScript } from '@react-google-maps/api';
import Map from './map';
export default function Mapwrapper() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    return (
        <div>
            {isLoaded ? <Map/> : <div>Loading...</div>}
        </div>

    )
}