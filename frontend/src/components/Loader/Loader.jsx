import React from 'react';
import Gif from './Loader.gif';

const Loader = ({ btn }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        margin: btn ? '1rem 0' : '5rem 0',
      }}
    >
      <img
        style={{ width: '5rem', height: '5rem' }}
        src={Gif}
        alt='Loading ...'
      />
    </div>
  );
};

export default Loader;
