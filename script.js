import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Stroke, Style} from 'ol/style';

const style = new Style({
  stroke: new Stroke({
    color: '#000000',
    width: 2,
  }),
});

const iso3 = 'AFG';

const source = new VectorSource({
  url:
    'https://gisco-services.ec.europa.eu/distribution/v2/countries/geojson/CNTR_RG_01M_2020_4326.geojson',
  format: new GeoJSON(),
});

const layer = new VectorLayer({
  source: source,
  style: function (feature) {
    if (feature.get('ISO3_CODE') === iso3) {
      return style;
    }
  },
});

const map = new Map({
  layers: [layer],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
});

source.on('addfeature', function (e) {
  if (e.feature.get('ISO3_CODE') === iso3) {
    map.getView().fit(e.feature.getGeometry());
  }
});
