import { BookComponent, SubjectComponent } from '../pages';
import DecisionComponent from '../pages/DecisionComponent';
import CreateDecision from '../pages/DecisionComponent/CreateDecision';
import DepartmentComponent from '../pages/DepartmentComponent';
import QualificationComponents from '../pages/QualificationComponents';
import ContractComponents from '../pages/ContractComponents';
import PersonnelComponents from '../pages/PersonelComponents';
import PositionComponents from '../pages/PositionComponents';
import LiabilityComponents from '../pages/LiabilityComponents';

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
                component: PersonnelComponents,
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
                name: "Qualification-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/Qualification",
                component: QualificationComponents,
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
                name: "Allowance-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/AllowanceList",
                component: BookComponent,
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
            },
            {
                name: "Position-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/PositionList",
                component: PositionComponents,
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
    },
    {
        name: "Liability",
        icon: "nav-icon fas fa-edit",
        component: "",
        to: "/Liability",
        child: [
            {
                name: "Liability-List",
                icon: "nav-icon fas fa-user-friends",
                to: "/liabilityList",
                component: LiabilityComponents,
                child: []
            }
        ]
    }
];
