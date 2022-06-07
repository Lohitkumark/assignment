import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

store.subscribe(()=>{
  console.log('updated state', store.getState());
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)