import React from "react";

import Container from "./components/Container";
import ImageSearch from "./pages/ImageSearch";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Container>
          <ImageSearch />
        </Container>
      </div>
    );
  }
}

export default App;
