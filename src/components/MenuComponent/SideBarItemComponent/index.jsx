import {NavLink, useMatch, useResolvedPath} from "react-router-dom";

const SideBarItemComponent = (props) => {
    const { to, name, icon, child } = props.item;
    const resolved = useResolvedPath(to);
    const isActive = useMatch({ path: resolved.pathname, end: true });
    // const {to, name, icon, child = []} = props.item;
    // const [isOpen, setIsOpen] = useState(false);
    // const resolved = useResolvedPath(to);
    // const isActive = useMatch({path: resolved.pathname, end: true});
    //
    // useEffect(() => {
    //     setIsOpen(isActive)
    // }, []);

    return (
        <li className="nav-item menu-open">
            {child.length > 0 ? (
                <>
                    <NavLink to={to} className={isActive ? "nav-link active" : "nav-link"}>
                        <i className={icon}></i>
                        <p>
                            {name}
                            <i className="fas fa-angle-left right"></i>
                        </p>
                    </NavLink>
                    <ul className="nav nav-treeview">
                        {child.map((item, index) => (
                            <SideBarItemComponent item={item} key={index} />
                        ))}
                    </ul>
                </>
            ) : (
                <NavLink to={to} className={isActive ? "nav-link active" : "nav-link"}>
                    <i className={icon}></i>
                    <p>{name}</p>
                </NavLink>
            )}
{/*    const handleToggle = (event) => {*/}
{/*        setIsOpen(prevIsOpen => !prevIsOpen);*/}
{/*    };*/}

{/*    return (*/}
{/*        <li className={`nav-item ${child.length > 0 ? 'menu-open' : ''}`}>*/}
{/*            <NavLink*/}
{/*                to={to}*/}
{/*                className={isActive ? "nav-link active" : "nav-link"}*/}
{/*                onClick={handleToggle}*/}
{/*            >*/}
{/*                <i className={icon}></i>*/}
{/*                <p>*/}
{/*                    {name}*/}
{/*                    {child.length > 0 && (*/}
{/*                        <i className={`fas fa-angle-${isOpen ? 'down' : 'left'} right`}></i>*/}
{/*                    )}*/}
{/*                </p>*/}
{/*            </NavLink>*/}
{/*            {child.length > 0 && (*/}
{/*                <ul className={`nav nav-treeview ${isOpen ? 'd-block' : 'd-none'}`}>*/}
{/*                    {child.map((item, i) => (*/}
{/*                        <SideBarItemComponent item={item} key={i}/>*/}
{/*                    ))}*/}
{/*                </ul>*/}
{/*            )}*/}
        </li>
    );
};

export default SideBarItemComponent;
