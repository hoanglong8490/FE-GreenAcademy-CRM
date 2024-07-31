import './App.css';
import LayoutDefault from "./layouts/LayoutDefault";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeSideBar} from "./route";

function App() {
  return (
        <BrowserRouter>
            <LayoutDefault>
              <Routes>
                  {
                      routeSideBar.map((item) => {
                          const Component = item.component;
                          <Route path={item.to} element={<Component />} />
                      })
                  }
              </Routes>
            </LayoutDefault>
        </BrowserRouter>

  )
}

export default App;
