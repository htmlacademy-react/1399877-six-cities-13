import { useRef} from 'react';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { City, TOffers } from '../../types/offers-types';


type MapProps = {
  city: City;
  offers: TOffers[];
  selectedPoint: string | null;
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
