import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FilterContext} from '../../App';

import api from '../../services/api';

import './styles.css';
import { FiSearch } from 'react-icons/fi';

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        position: 'absolute',
        transform: 'translate(-50%, -100%)'
    }
};


export default function AdminTools(props) {
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenUsername, setIsOpenUsername] = useState(false);
    const [applyFilter, setApplyFilter] = useState(false);

    const filters = useContext(FilterContext);
    
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const [date, setDate] = useState(new Date(Date.now() - tzoffset).toISOString().substring(0, 10));

    useEffect(() => {
        console.log(filters);
    }, [props.username])

    function onChangeOrder(e) {
        
    };

    function handleFilters(e) {
        e.preventDefault();
        // props.fetchWithFilters();
    }

    return (
        <div>
            <input type="text" value={props.username} onChange={(e) => {props.setUsername(e.target.value)}}></input>
        </div>
    )
}