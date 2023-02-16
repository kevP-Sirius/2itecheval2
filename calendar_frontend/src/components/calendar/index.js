import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import axios from "axios";

import Toolbar from 'react-big-calendar/lib/Toolbar';
import {useLocation, useNavigate} from "react-router-dom";
const qs = require('qs');
const localizer = momentLocalizer(moment)
const myEventsList2 = [
    {
        start: new Date(2023, 0, 15, 10, 0),
        end: new Date(2023, 0, 15, 12, 0),
        title: "Meeting with John"
    },
    {
        start: new Date(2023, 2, 18, 14, 0),
        end: new Date(2023, 2, 18, 16, 0),
        title: "Lunch with Mary"
    },
    {
        start: new Date(2023, 2, 22, 9, 0),
        end: new Date(2023, 2, 22, 10, 0),
        title: "Phone call with Bob"
    }
];
const CustomCalendar = (props) => {
    const { appStore, setAppStore,baseUrl } = props;
    const navigate = useNavigate();
    const location = useLocation();
    let [formAdd, setForm] = useState({description:"",date_debut:"",date_fin:"" , commercial:""});
    let [events, setEvents] = useState([]);
    let handleChange = (e) => {
        console.log(e.target.value)
        setForm({ ...formAdd, [e.target.name]: e.target.value });
    }
    let handleAddRdv = () => {
        let data = {...formAdd}
        qs.stringify(data)
        axios.post(`${baseUrl}/addrdv`,data).then((res)=>{
               console.log(res.data)
            getEvents()
        });
    }
    let getEvents = () => {
        axios.get(`${baseUrl}/listrdv`).then((res)=>{
            console.log(res.data)
            res.data.listRdv.map((item)=>{
                setEvents([...events,{
                      start: new Date(item.date_debut),
                        end: new Date(item.date_fin),
                        title: item.description
                }])
            })
        });
    }
    let getCommercialCalendar = () => {
        axios.get(`${baseUrl}/commercials`).then((res) => {
            console.log(res.data)
            setAppStore({...appStore,commercials:res.data.listCommercials})
            setForm({...formAdd,commercial:res.data.listCommercials[0]._id})
            console.log(res.data.listCommercials[0]._id)
        });
    }
    useEffect(() => {
        getCommercialCalendar()
        getEvents()
    }, []);
    useEffect(() => {
        console.log(formAdd)

    }, [formAdd,appStore]);

    return(
        <div>
            <div className="d-flex justify-content-around">
                <div className="mb-3">
                    <h1>commercials list</h1>
                    {appStore.commercials.map((commercial,index)=>{
                        return(
                            <div key={index} className="d-flex justify-content-between">
                                <div>{commercial.firstname}</div>
                                <div>{commercial.lastname}</div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className="mb-3">
                    <h1>Add an appointement</h1>
                    <form className={"d-flex flex-column"}>
                        <select id="commercial" name="commercial" value={formAdd.commercial} onChange={ (event)=>handleChange(event)} >
                            {appStore.commercials.map((commercial,index)=>{
                                    return(
                                        <option key={index} value={commercial.id}>
                                            {commercial.firstname} {commercial.lastname}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <input id="description" name="description" type="text" onChange={(event)=>handleChange(event)} value={formAdd.description} placeholder="description"/>
                        <input id="date_debut" name="date_debut" type="datetime-local" onChange={(event)=>handleChange(event)} value={formAdd.start} placeholder="date debut"/>
                        <input id="date_fin" name="date_fin" type="datetime-local" onChange={(event)=>handleChange(event)}  value={formAdd.end} placeholder="date fin"/>
                        <button type="button" className="btn btn-primary" onClick={()=>handleAddRdv()}>Ajouter</button>
                    </form>
                </div>
            </div>
            <div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 500}}
                />
            </div>
        </div>
    )
}
export default CustomCalendar;
