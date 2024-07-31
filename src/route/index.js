import {BookComponent, SubjectComponent} from '../pages';

export const routeSideBar = [
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
            }
        ]
    }
]