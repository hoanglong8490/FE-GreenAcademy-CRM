import {BookComponent, SubjectComponent} from '../pages';

import DepartmentComponent from '../pages/DepartmentComponent';
import ContactComponents from "../pages/ContractComponents";
import QualificationComponents from '../pages/QualificationComponents';

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
                component: SubjectComponent,
                child: []
            },
            {
                name: "Contract-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/ContractList",
                component: ContactComponents,
                child: []
            },
            {
                name: "Allowance-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/AllowanceList",
                component: BookComponent,
                child: []
            },
            {
                name: "Department-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/DepartmentList",
                component: BookComponent,
                child: []
            },
            {
                name: "Overtime-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/OvertimeList",
                component: BookComponent,
                child: []
            },
            {
                name: "Position-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/PositionList",
                component: BookComponent,
                child: []
            },
            {
                name: "Qualification-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/QualificationList",
                component: QualificationComponents,
                child: []
            },
            {
                name: "SalaryAdvance-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/SalaryAdvanceList",
                component: BookComponent,
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