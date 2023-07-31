import { useRef, useEffect} from 'react';
import {Card} from '../../types/offers-types';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {Icon, Marker} from 'leaflet';
import cn from 'classnames';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';


type MapProps = {
  selectedPoint: string | null;
  points: Card[];
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

function Map({selectedPoint, points}: MapProps): JSX.Element {
  const mapRef = useRef(null);

  const city = points[0]?.city;
  const map = useMap(mapRef, city);

  useEffect(()=>{
    if(map){
      if(city){
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

        points.forEach((offer) => {
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
  }, [map,points, selectedPoint, city]);

  return(
    <section
      className={cn(
        `${'cities'}__map`,
        'map'
      )}
      ref={mapRef}
    />
  );
}

export default Map;
