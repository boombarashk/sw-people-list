import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import CardList from "./components/CardList/CardList";
import CardDetail from "./components/CardDetail/CardDetail";
import NotFound from "./components/NotFound/NotFound";
import useGetCollections from "./useGetCollections";

function App(): React.ReactNode {
  useGetCollections();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/card/:id" element={<CardDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
