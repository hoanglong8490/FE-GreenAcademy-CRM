import './App.css';
import LayoutDefault from "./layouts/LayoutDefault";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routeSideBar} from "./route";

function App() {
    return (
        <BrowserRouter>
            <LayoutDefault>
                {/*<Routes>*/}
                {/*    {*/}
                {/*        routeSideBar.map((item, index) => {*/}
                {/*            const Component = item.component;*/}
                {/*            return <Route path={item.to} element={<Component key={index}/>} />*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Routes>*/}
                <Routes>
                    {routeSideBar.map((item, index) => {
                        //mac dinh
                        if (item.component) {
                            return <Route key={index} path={item.to} element={<item.component key={index}/>}/>;
                        }
                        // xu li khi componenco child
                        if (item.child && item.child.length > 0) {
                            return item.child.map((child, childIndex) => (
                                <Route key={childIndex} path={child.to}
                                       element={<child.component key={childIndex}/>}/>
                            ));
                        }
                        return null;
                    })}
                </Routes>
            </LayoutDefault>
        </BrowserRouter>

    )
}

export default App;
