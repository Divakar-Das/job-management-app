import "../styles/Header.css"
import logo from "../assets/logo.png"
import location from "../assets/location.png"
import search from "../assets/search.png"
import people from "../assets/people.png"
import Slider from '@mui/material/Slider';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import { FormControl, MenuItem, Select, styled } from "@mui/material"


const CustomDropdownIcon = () => (
    <KeyboardArrowDownIcon sx={{
        fontSize: '26px',
        color: '#686868',
        fontWeight: 300,
        cursor: "pointer",
        marginRight: "-8px"
    }} />
);

const CustomMenuItem = styled(MenuItem)(() => ({
    listStyle: 'none',
    marginLeft: "-5px",
    color:"black"
}));

const Header = ({ handleOpen, filters, onFilterChange }) => {
    const [value, setValue] = useState([10, 90000]);

    const handleSliderChange = (e, newValue) => {
        setValue(newValue);
        onFilterChange("salaryRange", newValue);
    };
    const formatSalary = (num) => {
        return num >= 1000 ? `${Math.floor(num / 1000)}k` : num;
    };

    return (
        <>
            <div className="header-container">
                <nav>
                    <div className="navbar-container">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>

                        <div className="links">
                            <li><a href="#">Home</a></li>
                            <li>
                                <a href="#">Find Jobs</a>
                            </li>
                            <li >
                                <a href="#">Find Talents</a>
                            </li>
                            <li >
                                <a href="#">About us</a>
                            </li>
                            <li >
                                <a href="#">Testimonials</a>
                            </li>
                        </div>

                        <div className="button-tag">
                            <button className="create-btn" onClick={() => {
                                console.log("bbutton clicked");
                                handleOpen();
                            }}  >Create Jobs</button>
                        </div>
                    </div>
                </nav>


                <div className="filter-container">
                    <div className="filter-box" 
                    style={{ 
                        borderRight: "2px solid #EAEAEA",
                        top:"-4px",
                        left:"6.5px",
                        width:"315px"
                        }} >
                        <img src={search} 
                        style={{ 
                            position:"relative",
                            top:"-2px",
                            width: "20px", 
                            height: "20px",
                            marginLeft:"-8px",
                            marginRight:"16px",
                            }} />
                        <input
                            type="text"
                            placeholder="Search By Job Title, Role"
                            value={filters.search}
                            onChange={(e) => onFilterChange('search', e.target.value)}
                        />
                    </div>

                    <div className="filter-box" 
                    style={{ 
                        borderRight: "2px solid #EAEAEA",
                        top:"-4px",
                        left:"8px",
                        width:"265px",
                        height:"51px"
                        }} >
                        <img src={location} 
                        style={{ 
                            position:"relative",
                            width: "18px", 
                            height: "23px",
                            marginLeft:"-45px",
                            left:"-2px"
                            }} />
                        <FormControl sx={{ width: '200px' }}>
                            <Select
                                value={filters.location}
                                onChange={(e) => onFilterChange('location', e.target.value)}
                                IconComponent={CustomDropdownIcon}
                                displayEmpty
                                sx={{
                                    width:"248px",
                                    borderRadius: '10px',
                                    height: '50px',
                                    border: 'none',
                                    fontSize: '16px',
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&.Mui-focused': { boxShadow: 'none' },
                                    padding: "5px 0px 5px 10px"
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            borderRadius: '10px',
                                            boxShadow: '0px 0px 14px 0px #93939340',
                                        }
                                    }
                                }}
                            >
                                <CustomMenuItem value="">All Locations</CustomMenuItem>
                                <CustomMenuItem value="" selected 
                                sx={{display:"none"}}>
                                <em style={{color:"grey",fontStyle:"normal"}} >Preferred Location</em>
                                </CustomMenuItem>
                                <CustomMenuItem value="Chennai">Chennai</CustomMenuItem>
                                <CustomMenuItem value="Coimbatore">Coimbatore</CustomMenuItem>
                                <CustomMenuItem value="Bengaluru">Bengaluru</CustomMenuItem>
                            </Select>
                        </FormControl>

                    </div>

                    <div className="filter-box" 
                    style={{ 
                        borderRight: "2px solid #EAEAEA",
                        top:"-6px",
                        left:"17px",
                        width:"255px",
                        height:"51px",
                        }} >
                        <img src={people} 
                        style={{ 
                            width: "21px", 
                            height: "19px",
                            marginLeft:"-51px"
                            }} />
                        <FormControl sx={{ width: '200px' }}>
                            <Select
                                value={filters.jobType}
                                onChange={(e) => onFilterChange('jobType', e.target.value)}
                                IconComponent={CustomDropdownIcon}
                                displayEmpty
                                sx={{
                                position:"relative",
                                left:"3px",
                                    width:"250px",
                                    borderRadius: '10px',
                                    height: '50px',
                                    border: 'none',
                                    fontSize: '16px',
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    '&.Mui-focused': { boxShadow: 'none' },
                                    padding: "4px 2px 0px 7px"
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            borderRadius: '10px',
                                            boxShadow: '0px 0px 14px 0px #93939340',
                                        }
                                    }
                                }}
                            >
                                <CustomMenuItem value="">All Job Types</CustomMenuItem>
                                <CustomMenuItem value="" selected sx={{
                                    display:"none"
                                }} >
                                <em style={{color:"grey",fontStyle:"normal"}} >
                                Job Type
                                </em>
                                </CustomMenuItem>
                                <CustomMenuItem value="Full Time">Full Time</CustomMenuItem>
                                <CustomMenuItem value="Internship">Internship</CustomMenuItem>
                                <CustomMenuItem value="Part Time">Part Time</CustomMenuItem>
                                <CustomMenuItem value="Contract">Contract</CustomMenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="filter-box" style={{ flexDirection: "column" }} >
                        <div style={{
                            display: "flex",
                            gap:"48px",
                            width: "300px",
                            position:"relative",
                            top:"-18px",
                            left:"-9px",
                        }} >
                            <span>Salary Per Month</span>
                            <span>
                                ₹{formatSalary(value[0])} -₹{formatSalary(value[1])}
                            </span>
                        </div>
                        <Slider
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={90000}
                            step={1}
                            sx={{
                                position:"relative",
                                left:"-20px",
                                top:"-9px",
                                color: 'black',
                                width:"250px",
                                bottom:"7px",
                                '& .MuiSlider-thumb': {
                                    backgroundColor: 'white',
                                    border: '5px solid black',
                                    width: 15,
                                    height: 15,
                                    boxShadow: 'none',
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.16)',
                                    },
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: 'black',
                                    height: 3,
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#eee',
                                    height: 3,
                                },
                                '& .MuiSlider-valueLabel': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
                                },
                            }}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
