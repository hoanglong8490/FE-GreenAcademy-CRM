import {NavLink, useMatch, useResolvedPath} from "react-router-dom";

const SideBarItemComponent = (props) => {
    const {to, name, icon, child} = props.item;
    const resoled = useResolvedPath(to)
    const isActive = useMatch({path: resoled.pathname, end: true})

    return <>
        <li className="nav-item menu-open">
            <NavLink to={to} className={ isActive ? "nav-link active": "nav-link"}>
                <i className={icon}></i>
                <p>
                    {
                        child.length > 0 ?
                           <>
                               {name} <i className="fas fa-angle-left right"></i>
                               {
                                   child.map((item, i) => {
                                       console.log(item)
                                       // return <SideBarItemComponent item={item} key={i}/>
                                   })
                               }
                           </>
                            : name
                    }
                </p>
            </NavLink>
        </li>
    </>
}

export default SideBarItemComponent;