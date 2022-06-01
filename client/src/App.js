import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"; // import apollo clinet

import React from "react";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppNavbar from "./components/Nav";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Pets from "./pages/Pet";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // instantiate a new cache object using new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        
        <AppNavbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pet" element={<Pets />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
