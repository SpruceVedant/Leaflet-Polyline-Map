import React from 'react';

const TollDetails = ({ tollDetails }) => {
  return (
    <div>
      {Object.keys(tollDetails).length > 0 && (
        <div>
          <h2>Toll Details</h2>
          <ul>
            {Object.entries(tollDetails).map(([toll, details]) => (
              <li key={toll}>
                {toll}: {details.cost}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TollDetails;