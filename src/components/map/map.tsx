import { useRef} from 'react';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { City, DetailOffer, Offer } from '../../types/offers-types';


type MapProps = {
  city: City;
  points: Offer[];
  selectedPoint: Offer | undefined;
  detailedOffer: DetailOffer | undefined;
};

function Map(prop: MapProps): JSX.Element {
  const mapRef = useRef(null);

  useMap(mapRef, prop);
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
