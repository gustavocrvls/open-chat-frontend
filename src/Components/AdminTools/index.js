import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FilterContext} from '../../App';

import api from '../../services/api';

import './styles.scss';
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
    const userType = localStorage.getItem('userType');

    return (
        <div className="admin-tools">
            {userType == "2" &&
                props.children
            }
        </div>
    )
}