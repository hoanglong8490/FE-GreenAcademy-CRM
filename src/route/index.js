import {BookComponent, SubjectComponent} from '../pages';
import DepartmentComponent from '../pages/DepartmentComponent';
import ContactComponents from "../pages/ContractComponents";
import QualificationComponents from '../pages/QualificationComponents';
import ContractComponents from "../pages/ContractComponents";
import PersonnelComponents from "../pages/PersonelComponents";
import LiabilityComponents from "../pages/LiabilityComponents";

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
                component: DepartmentComponent,
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
            },
        ]
    }
]
import {
  BookComponent,
  ClassComponent,
  ContractComponents,
  CourseComponent,
  DecisionComponent,
  DepartmentComponent,
  ExamComponent,
  LiabilityComponents,
  PersonelComponents,
  QualificationComponents,
  ReservationComponent,
  ScheduleComponent3,
  SubjectComponent,
  TrainningProgramComponent,
  UserComponent
} from "../pages";


export const routeSideBar = [
    {
        name: "Dashboard",
        icon: "nav-icon fas fa-edit",
        to: "#",
        child: [],
    },
    {
        name: "Form",
        icon: "nav-icon fas fa-edit",
        to: "#",
        child: [
            {
                name: "List",
                icon: "nav-icon fas fa-tachometer-alt",
                to: "/list",
                component: UserComponent,
                child: [],
            },
        ],
    },

    {
        name: "Personnel",
        icon: "nav-icon fas fa-user-friends ",
        to: "#",
        child: [
            {
                name: "Personnel-List",
                icon: "nav-icon fas fa-solid fa-user",
                to: "/personnelList",
                component: PersonelComponents,
                child: [],
            },
            {
                name: "Contract-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/contracts",
                component: ContractComponents,
                child: [],
            },
            {
                name: "Allowance-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/allowances",
                component: BookComponent,
                child: [],
            },
            {
                name: "Qualification-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/qualifications",
                component: QualificationComponents,
                child: [],
            },
            {
                name: "Department-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/departments",
                component: DepartmentComponent,
                child: [],
            },
            {
                name: "Decision-List",
                icon: "nav-icon fas fa-file-contract",
                to: "/decisions",
                component: DecisionComponent,
                child: [],
            },
        ],
    },
    {
        name: "Education",
        icon: "nav-icon fas fa-book",
        to: "#",
        child: [
            {
                name: "Quản lý học viên",
                icon: "nav-icon fas fa-user",
                to: "/students",
                component: BookComponent,
            },
            {
                name: "Quản lý môn học",
                icon: "nav-icon fas fa-book",
                to: "/subjects",
                component: SubjectComponent,
            },
            {
                name: "Quản lý lớp",
                icon: "nav-icon fas fa-chalkboard-teacher",
                to: "/classes",
                component: ClassComponent,
            },
            {
                name: "Quản lý bảo lưu",
                icon: "nav-icon fas fa-pause-circle",
                to: "/reservations",
                component: ReservationComponent,
            },
            {
                name: "Quản lý thành viên lớp",
                icon: "nav-icon fas fa-users",
                to: "/class-members",
                component: BookComponent,
            },
            {
                name: "Quản lý chương trình đào tạo",
                icon: "nav-icon fas fa-cogs",
                to: "/programs",
                component: TrainningProgramComponent,
            },
            {
                name: "Quản lý điểm danh",
                icon: "nav-icon fas fa-calendar-check",
                to: "/attendance",
                component: BookComponent,
            },
            {
                name: "Quản lý khoá học",
                icon: "nav-icon fas fa-clipboard-list",
                to: "/courses",
                component: CourseComponent,
            },
            {
                name: "Quản lý lịch học",
                icon: "nav-icon fas fa-calendar-alt",
                to: "/schedules",
                component: ScheduleComponent3,
            },
            {
                name: "Quản lý lịch thi",
                icon: "nav-icon fas fa-calendar-plus",
                to: "/exams",
                component: ExamComponent,
            },
            {
                name: "Quản lý điểm số",
                icon: "nav-icon fas fa-chart-line",
                to: "/grades",
                component: BookComponent,
            },
        ],
    },
    {
        name: "Liability",
        icon: "nav-icon fas fa-edit",
        to: "#",
        child: [
            {
                name: "Liability-List",
                icon: "nav-icon fas fa-user-friends",
                to: "/liabilityList",
                component: LiabilityComponents,
                child: [],
            },
        ],
    },
];
