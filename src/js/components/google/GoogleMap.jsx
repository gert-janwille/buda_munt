import React from 'react';
import {object, array} from 'prop-types';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

const GoogleMap = ({markers, center}) => (
    <article className='popup-google-map'>
      <GoogleMapReact
        bootstrapURLKeys={{key: `AIzaSyDX88EksGrMshfme4H722CWDtlndWREZ8Y`}}
        defaultCenter={center}
        defaultZoom={15}>

        {markers.map(m => <Marker key={m.id} text={`Budastraat`} lng={m.location.lng} lat={m.location.lat} />)}

      </GoogleMapReact>
    </article>
  );

GoogleMap.propTypes = {
  markers: array.isRequired,
  center: object.isRequired
};

export default GoogleMap;
