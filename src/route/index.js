import {BookComponent, SubjectComponent} from '../pages';
import CreateDecison from '../pages/DecisionComponent/DetailDecision/CreateDecision';
import DecisionComponent from '../pages/DecisionComponent';  
import DetailPage from '../pages/DecisionComponent/DetailDecision';

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
                component: '',
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
                name: "Decision-List",
                icon: "nav-icon fas fa-building",
                to: "/DepartmentList",
                component: DecisionComponent,
                child: []
            },
            {
                name: "Create Decison",
                icon: "nav-icon fas fa-user-tie",
                to: "/createDecision",
                component: CreateDecison,
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