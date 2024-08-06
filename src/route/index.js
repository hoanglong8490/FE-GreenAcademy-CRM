import {BookComponent, SubjectComponent} from '../pages';
import DecisionComponent from '../pages/DecisionComponent';
import CreateDecision from '../pages/DecisionComponent/CreateDecision';
import DepartmentComponent from '../pages/DepartmentComponent';
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
                component: QualificationComponents,
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
                component: DepartmentComponent,
                child: []
            },
            { 
                name: "Descision-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/DecisionList",
                component: DecisionComponent,
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