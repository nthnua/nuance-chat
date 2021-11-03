import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/auth/login/Login";
import { Lounge } from "./features/lounge/Lounge";
import { NavBar } from "./features/navbars/Navbar";

function App() {
  const loginStatus = useSelector((state) => state.auth.session.status);
  if (loginStatus === "logged-out") {
    return <LoginPage />;
  } else if (loginStatus === "logged-in") {
    return (
      <BrowserRouter>
        <Flex flexDir="column" h="100vh">
          <NavBar />
          <Flex alignSelf="stretch" flexGrow="2">
            <Lounge />
          </Flex>
        </Flex>
      </BrowserRouter>
    );
  }
}

export default App;
