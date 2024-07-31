import {
        UserComponent,
        SubjectComponent
} from '../pages';

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
        component: SubjectComponent,
        to: "/sub",
        child: [
            {
                name: "List",
                icon: "nav-icon fas fa-tachometer-alt",
                to: "/",
            }
        ]
    }
]