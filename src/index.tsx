
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./pages/shared/layout";
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import todoApp from './reducers'
// import App from './components/App'
// import registerServiceWorker from "./registerServiceWorker";
// const store = createStore(todoApp)

ReactDOM.render(
  (
    <BrowserRouter> 
      {/* <Provider store={store}></Provider> */}
      <Layout />
    </BrowserRouter>
  ), document.querySelector("#root")
);
// registerServiceWorker();
