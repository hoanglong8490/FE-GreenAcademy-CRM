import {
    UserComponent,
    SubjectComponent,
    BookComponent
} from '../pages';
import DecisionComponent from "../pages/DecisionComponent";

export const routeSideBar = [
    {
        name: "Dashboard",
        icon: "nav-icon fas fa-tachometer-alt",
        component: UserComponent,
        to: "/",
        child: []
    },

    {
        name: "Form",
        icon: "nav-icon fas fa-edit",
        component: "",
        to: "/form",
        child: [
            {
                name: "List",
                icon: "nav-icon fas fa-list",
                to: "/list",
                component: SubjectComponent,
                child: [] //todo Không thêm cấp nữa
            },
            {
                name: "check",
                icon: "nav-icon fas fa-list",
                to: "/check",
                component: BookComponent,
                child: [] //todo Không thêm cấp nữa
            },
            {
                name: "Decision",
                icon: "nav-icon fas fa-list",
                to: "/decision",
                component: DecisionComponent,
                child: [] //todo Không thêm cấp nữa
            }
        ]
    }
]