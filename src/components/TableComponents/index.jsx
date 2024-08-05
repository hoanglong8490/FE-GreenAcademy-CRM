import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import TableBodyComponents from '../TableBodyComponents';
import Input from '../InputComponents';
import { Link } from 'react-router-dom';

const TableComponents = ({ headers, children }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("data/thead.json")
            .then((res) => setData(res.data.data))
            .catch(
                (err) => console.log("Xay ra loi roi" + err)
            );
    }, []);
    console.log(data);

    return (
        <> 
                <Link className='btn btn-primary' style={{ margin: '10px 0 10px 0' }} to='/createDecision'>Thêm quyết định</Link>
                <table className="table table-bordered table-hover table-striped">
                    <thead className='table-primary'>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <th>{item.stt}</th>
                                <th>{item.manv}</th>
                                <th>{item.name}</th>
                                <th>{item.content}</th>
                                <th>{item.date}</th>
                                <th>{item.hinhthuc}</th>
                                <th>{item.status}</th>
                                <th>{item.action}</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        <TableBodyComponents />
                    </tbody>
                </table> 
        </>
    );
};

TableComponents.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired
};

export default TableComponents;
