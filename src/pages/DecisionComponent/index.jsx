import {Link} from 'react-router-dom';
import './style.css';
import {useEffect, useState} from 'react';
import axios from 'axios'; 
import TableComponents from '../../components/TableComponents';

const DecisionComponent = () => { 
    return (
        <>
           <TableComponents/>
        </>
    );
};

export default DecisionComponent;
