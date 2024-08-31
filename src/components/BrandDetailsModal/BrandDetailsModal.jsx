// BrandDetailsModal.jsx
import React from 'react';

function BrandDetailsModal({ brand }) {
  return (
    <div>
      <h2>{brand.name}</h2>
      <img src={brand.image} alt={brand.name} className="w-full" />
      <p>More details about {brand.name}...</p>
    </div>
  );
}

export default BrandDetailsModal;
