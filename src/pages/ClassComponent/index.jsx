import PageContent from "./PageContent";
import PageHeader from "./PageHeader";

const ClassComponent = () => {
  return (
    <div className="relative">
      <PageHeader namePage={"Quản lý lớp học"} />
      <PageContent headerContent={"Danh sách lớp học"} />
    </div>
  );
};

export default ClassComponent;
