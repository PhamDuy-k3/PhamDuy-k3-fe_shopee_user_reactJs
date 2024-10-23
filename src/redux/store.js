// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import rootReducer from "./reducer";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// const store = createStore(rootReducer, composedEnhancer);

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
