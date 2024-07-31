import SideBarItemComponent from "../../../components/MenuComponent/SideBarItemComponent";
import {routeSideBar} from "../../../route";

const SideBarLayout = () => {
    return <>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <a href="index3.html" className="brand-link">
                <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
                     className="brand-image img-circle elevation-3"/>
                <span className="brand-text font-weight-light">LSD Admin</span>
            </a>


            <div className="sidebar">

                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2"
                             alt="User Image"/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>


                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>


                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {
                            routeSideBar.map((item, key) => {

                                return <SideBarItemComponent item={item} key={key}></SideBarItemComponent>;
                            })
                        }

                        {/*<li className="nav-item">*/}
                        {/*    <a href="#" className="nav-link">*/}
                        {/*        <i className="nav-icon fas fa-edit"></i>*/}
                        {/*        <p>*/}
                        {/*            Forms*/}
                        {/*            <i className="fas fa-angle-left right"></i>*/}
                        {/*        </p>*/}
                        {/*    </a>*/}
                        {/*    <ul className="nav nav-treeview">*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="index.html" className="nav-link">*/}
                        {/*                <i className="far fa-circle nav-icon"></i>*/}
                        {/*                <p>List</p>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="form.html" className="nav-link">*/}
                        {/*                <i className="far fa-circle nav-icon"></i>*/}
                        {/*                <p>Form</p>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="detail.html" className="nav-link">*/}
                        {/*                <i className="far fa-circle nav-icon"></i>*/}
                        {/*                <p>Detail</p>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
                    </ul>
                </nav>

            </div>

        </aside>
    </>
}

export default SideBarLayout;