// components/ControlsPanel.js

import React from 'react';

const ControlsPanel = () => (
  <div style={{ position: 'absolute', top: 10, right: 10, background: '#fff', padding: '10px' }}>
    <button style={{ marginRight: '5px' }}>Add Node</button>
    <button>Remove Node</button>
  </div>
);

export default ControlsPanel;
