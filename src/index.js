import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { store } from './store/store';
import {store, persist } from './store/store';
import {PersistGate} from "redux-persist/integration/react"
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import 'react-overlay-loader/styles.css';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    // <React.StrictMode>
    //     <Provider store={store}>
    //         <SimpleReactLightbox>
    //             <BrowserRouter basename='/'>
    //                 <App />
    //             </BrowserRouter>
    //         </SimpleReactLightbox>
    //     </Provider>
    // </React.StrictMode>,

    // new redux

    <React.StrictMode>
            <PersistGate loading={null} persistor={persist}>
        <Provider store={store}>
                <SimpleReactLightbox>
                    <BrowserRouter basename='/'>
                        <App />
                    </BrowserRouter>
                </SimpleReactLightbox>
        </Provider>
            </PersistGate>
    </React.StrictMode>,

    //   <Provider store={store}>
    //   <PersistGate loading={null} persistor={persist}>
    //      <App />
    //   </PersistGate>
    // </Provider>
    document.getElementById("root")
);
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
