import { Alert } from "react-bootstrap";

const NotificationComponent = ({ variant, children }) => {
  return (
    <div className="d-flex justify-content-center">
      <Alert
        variant={variant}
        className="w-50"
        style={{ zIndex: 9999, position: "absolute", top: "40px" }}
      >
        {children}
      </Alert>
    </div>
  );
};

export default NotificationComponent;
