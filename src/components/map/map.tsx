import { useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {Icon, Marker} from 'leaflet';
import cn from 'classnames';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useAppSelector } from '../../hooks';


type MapProps = {
  selectedPoint: string | null;
};


const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

function Map({selectedPoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);

  const currentOffers = useAppSelector((state) => state.offers);

  const city = currentOffers[0]?.city;
  const map = useMap(mapRef, city);

  useEffect(()=>{
    if(map){
      if(city){
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

        currentOffers.forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });

          marker
            .setIcon(
              selectedPoint && selectedPoint === offer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(map);
        });
      }
    }
  }, [map,currentOffers, selectedPoint, city]);

  return(
    <section
      className={cn(
        `${'cities'}__map`,
        'map'
      )}
      ref={mapRef}
      style={{height: '100%', minHeight: '579px'}}
    />
  );
}

export default Map;
