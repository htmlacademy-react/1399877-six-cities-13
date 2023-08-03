import { useRef, useState, useEffect, MutableRefObject } from 'react';
import { Map, TileLayer, Icon, Marker } from 'leaflet';
import { City } from '../types/offers-types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const';
import { useAppSelector } from '.';

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


export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, selectedPoint: string | null): void {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const currentOffers = useAppSelector((state) => state.offers);
  const city: City = currentOffers[0]?.city;

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

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
}
