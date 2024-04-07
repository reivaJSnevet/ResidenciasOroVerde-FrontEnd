import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000} >
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
