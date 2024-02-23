// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter className="text-3xl text-red-500">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute isDashboard={false} />}>
          <Route path="/sign-in" element={<Signin />} />
        </Route>
        <Route element={<PrivateRoute isDashboard={false} />}>
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute isDashboard={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
