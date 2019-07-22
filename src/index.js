import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {SongProvider} from "./context";



ReactDOM.render(
    <BrowserRouter>
        <SongProvider>
             <App />
        </SongProvider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
if (!window.Promise) {
    window.Promise = Promise;
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/sw.js`,{ scope: '/'})
        .then(function () {
            console.log('Service worker registered!');
        })
        .catch(function(err) {
            console.log(err);
        });
}
