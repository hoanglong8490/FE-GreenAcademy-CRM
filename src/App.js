import './App.css';
import LayoutDefault from "./layouts/LayoutDefault";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeSideBar} from "./route";
import NotFound from './pages/NotFound';
import DetailPage from './pages/DetailDecision';

function App() {
    return (
        <BrowserRouter>
            <LayoutDefault>
                <Routes>
                    {routeSideBar.map((item, index) => {
                        const Component = item.component;
                        if (item.child.length <= 0) {
                            return <Route key={index} path={item.to} element={<Component/>}/>;
                        }

                        return item.child.map((subItem, subIndex) => {
                            const ChildComponent = subItem.component;
                            return (
                                <Route
                                    key={`${index}-${subIndex}`}
                                    path={subItem.to}
                                    element={<ChildComponent/>}
                                />
                            );
                        });
                    })}
                     <Route path='*' element={<NotFound/>}/>
                     <Route path="/decision/:id" element={<DetailPage/>}/>
                </Routes>
            </LayoutDefault>
        </BrowserRouter>
    )
}

export default App;
