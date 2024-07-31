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
                      routeSideBar.map((item, index) => {
                          const Component = item.component;
                          return <Route path={item.to} element={<Component key={index}/>} />
                      })
                  }
              </Routes>
            </LayoutDefault>
        </BrowserRouter>

  )
}

export default App;
