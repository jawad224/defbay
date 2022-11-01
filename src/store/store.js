import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostsReducer from './reducers/PostsReducer';
// import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import todoReducers from './reducers/Reducers';
import { reducer as reduxFormReducer } from 'redux-form';
// import rootreducer from './reducers/rootReducers'
import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";


// import of presist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


// const middleware = applyMiddleware(thunk);

// const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer,
		todoReducers,
	form: reduxFormReducer,	
	
});

const persistConfig = {
    key: 'root',
    whiteList: [" auth","posts","form"],
    storage,
  }


  
const persistedReducer = persistReducer(persistConfig, reducers)



  export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })

export const persist = persistStore(store);

//const store = createStore(rootReducers);

// export const store = createStore(reducers,  composeEnhancers(middleware));
