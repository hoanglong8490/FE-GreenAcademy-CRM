import {BookComponent, SubjectComponent} from '../pages';
import DecisionComponent from '../pages/DecisionComponent';
import CreateDecision from '../pages/DecisionComponent/CreateDecision';
import DepartmentComponent from '../pages/DepartmentComponent';
import QualificationComponents from '../pages/QualificationComponents';
import ContractComponents from "../pages/ContractComponents";

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
                to: "/Personnel",
                component: SubjectComponent,
                child: []
            },
            {
                name: "Contract-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/Contract",
                component: ContractComponents,
                child: []
            },
            {
                name: "Allowance-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/Allowance",
                component: BookComponent,
                child: []
            },
            {
                name: "Qualification-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/Qualification",
                component: QualificationComponents,
                child: []
            },
            {
                name: "Department-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/Department",
                component: DepartmentComponent,
                child: []
            },


            {
                name: "Decision-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/Decision",
                component: DecisionComponent,
                child: []
            },
            {
                name: "Create-Decision",
                icon: "nav-icon fas fa-file-contract",
                to: "/CreateDecision",
                component: CreateDecision,
                child: []
            }

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