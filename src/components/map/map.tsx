import { useRef} from 'react';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';


type MapProps = {
  selectedPoint: string | null;
};

function Map({selectedPoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);


  useMap(mapRef, selectedPoint);
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
