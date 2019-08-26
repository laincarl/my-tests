import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import MiniMap from './MiniMap';


const MiniMapReact = () => {
  const miniMap = useMemo(() => new MiniMap());
  
  console.log(miniMap);
  return (
    <div>
        MiniMap
    </div>
  );
};

MiniMapReact.propTypes = {

};

export default MiniMapReact;
