
import { PropTypes } from 'prop-types';
const Validation = ({ message }) => {
    return message ? (
        <div className="alert alert-danger">
            {message}
        </div>
    ) : null;

};
Validation.propTypes = {
    message: PropTypes.string,
};
export default Validation;