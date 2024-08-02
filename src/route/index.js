import { BookComponent, SubjectComponent } from '../pages';
import DepartmentComponent from '../pages/DepartmentComponent';

export const routeSideBar = [
    {
        name: "Personnel",
        icon: "nav-icon fas fa-edit",
        component: "",
        to: "/PersonnelManagement",
        child: [
            {
                name: "Personnel-List",
                icon: "nav-icon fas fa-user-friends",
                to: "/PersonnelList",
                component: "",
                child: []
            },
            {
                name: "Contract-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/ContractList",
                component: "",
                child: []
            },
            {
                name: "Department-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/DepartmentList",
                component: DepartmentComponent,
                child: []
            },

        ]
    },
    {
        name: "Education",
        icon: "nav-icon fas fa-edit",
        component: "",
        to: "/Education",
        child: [
            {
                name: "Education-List",
                icon: "nav-icon fas fa-user-friends",
                to: "/educationList",
                component: SubjectComponent,
                child: [] //todo Không thêm cấp nữa
            },
            {
                name: "List",
                icon: "nav-icon fas fa-file-contract",
                to: "/List",
                component: BookComponent,
                child: [] //todo Không thêm cấp nữa
            }
        ]
    }
]