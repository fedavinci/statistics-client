import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";

const App: React.FC = () => (
  <div>
    <RouterProvider router={routerConfig}></RouterProvider>
  </div>
);

export default App;
