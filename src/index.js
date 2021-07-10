import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemContext from './context/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemContext.Provider value="black">
      <App />
    </ThemContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
