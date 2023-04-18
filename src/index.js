import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./components/Layout";
// import reportWebVitals from "./reportWebVitals";
import Newsubmission from "./pages/newsubmission/newsubmission";
import Eachhackathon from "./pages/eachhackathon/eachhackathon";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./pages/edit/edit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Layout>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/newsub" element={<Newsubmission />} />
                <Route path="/eachhack/:id" element={<Eachhackathon />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    </Layout>
);
// reportWebVitals();
