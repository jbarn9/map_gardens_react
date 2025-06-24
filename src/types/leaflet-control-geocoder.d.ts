import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    class Geocoder extends L.Control {
      constructor(options?: GeocoderOptions);
      addTo(map: L.Map): this;
      on(event: string, fn: Function): this;
      markGeocode(result: any): this;
    }

    interface GeocoderOptions {
      position?: L.ControlPosition;
      defaultMarkGeocode?: boolean;
      placeholder?: string;
      errorMessage?: string;
      showResultIcons?: boolean;
      collapsed?: boolean;
      expand?: string;
      maxResults?: number;
    }
  }
}

declare module 'leaflet-control-geocoder' {
  // Module de définition vide pour l'import
} 