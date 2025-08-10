import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import HomeBook from "./HomeBook";
import ViewBook from "./ViewBook";
function App() {
  
  

  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/" index element={<HomeBook />} />
          <Route path="/viewBook/:id"  element={<ViewBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
