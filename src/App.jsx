import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import HomeBook from "./HomeBook";
import ViewBook from "./ViewBook";
import Login from "./Login";
import Signup from "./Signup";
function App() {
  
  

  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/signup"  element={<Signup />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/" index element={<HomeBook />} />
          <Route path="/viewBook/:id"  element={<ViewBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
