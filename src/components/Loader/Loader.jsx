import { Puff } from 'react-loader-spinner';
import React from 'react';
import PropTypes from 'prop-types';

export const Loader = isLoading => {
  return(
  <Puff
    height="80"
    width="80"
    radius={1}
    color="	#696969"
    ariaLabel="puff-loading"
    visible={Boolean(isLoading)}
    wrapperStyle={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
  />
)}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};