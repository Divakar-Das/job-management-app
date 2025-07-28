import {
    Box, FormControl, MenuItem, Select, styled
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "../styles/JobForm.css";

import minmaxSalary from "../assets/minsalary.svg"
import calendar from "../assets/calendar.svg"
import savedraft from "../assets/savedraft.svg"
import publish from "../assets/publish.svg"


const CustomDropdownIcon = () => (
    <KeyboardArrowDownIcon sx={{
        fontSize: '32px',
        color: '#222222',
        marginRight: '-7px',
        marginTop: "-4px",
        fontFamily: "inherit",
        fontWeight: "100",
        cursor: "pointer"
    }} />
);

const CustomMenuItem = styled(MenuItem)(() => ({
    listStyle: 'none',
    marginLeft: "-5px"
}));

//----------- Yup Schema
const schema = yup.object({
    title: yup.string().required("Job title is required"),
    company: yup.string().required("Company name is required"),
    location: yup.string().required("Location is required"),
    jobType: yup.string().required("Job type is required"),
    salaryMin: yup.number().typeError("Enter minimum salary").required(),
    salaryMax: yup.number().typeError("Enter maximum salary").required(),
    deadline: yup.string().required("Application deadline is required"),
    description: yup.string().required("Description is required")
});

const JobForm = ({ handleClose, refreshJobs }) => {
    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            company: '',
            location: '',
            jobType: '',
            salaryMin: '',
            salaryMax: '',
            deadline: '',
            description: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            // await axios.post("http://localhost:5000/api/jobs", data);
            await axios.post("https://job-management-backend-qpo9.onrender.com", data);
            alert("Job published successfully");
            reset();
            refreshJobs();
            handleClose();
        } catch (err) {
            alert("Error publishing job");
            console.error(err);
        }
    };

    return (
        <Box sx={{
            background: "white",
            position: "relative",
            width: "848px",
            height: "779px",
            borderRadius: "16px",
            top: "117px",
            left: "296px"
        }}>
            <form onSubmit={
                handleSubmit(onSubmit)}
            >
                <div className="form-title">
                    <h2>Create Job Opening</h2>
                </div>

                <div className="title-name">
                    <div className="input-content">
                        <label htmlFor="title">Job Title</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <input
                                style={{ marginTop: "3px" }}
                                {...field} placeholder="Enter job Title" />}
                        />
                    </div>
                    <div className="input-content">
                        <label htmlFor="company">Company Name</label>
                        <Controller
                            name="company"
                            control={control}
                            render={({ field }) => <input
                                className="custom-placeholder"
                                style={{ marginTop: "3px" }}
                                {...field}
                                placeholder="Amazon, Microsoft, Swiggy" />}
                        />
                    </div>
                </div>

                <div className="location-jobtype">
                    <FormControl sx={{ width: 376 }}>
                        <label htmlFor="location">Location</label>
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    IconComponent={CustomDropdownIcon}
                                    displayEmpty
                                    sx={{
                                        marginTop: '8px',
                                        borderRadius: '10px',
                                        height: '58px',
                                        border: '1px solid #BCBCBC',
                                        padding: '5px 16px 0px 0',
                                        fontSize: '18px',
                                        fontFamily: "inherit",
                                        fontWeight: "600",
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                                        '&.Mui-focused': {
                                            boxShadow: 'none',
                                            border: '1px solid black'
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                borderRadius: '10px',
                                                boxShadow: '0px 0px 14px 0px #93939340',
                                            },
                                        },
                                    }}
                                >
                                    <CustomMenuItem sx={{ display: "none" }} disabled value="">
                                        <em style={{
                                            color: "grey", fontStyle: "normal", fontFamily: "inherit", fontSize: "16px",
                                            fontWeight: "500"
                                        }}>
                                            Choose Preferred Location
                                        </em>
                                    </CustomMenuItem>
                                    <CustomMenuItem value="Chennai">Chennai</CustomMenuItem>
                                    <CustomMenuItem value="Bengaluru">Bengaluru</CustomMenuItem>
                                    <CustomMenuItem value="Coimbatore">Coimbatore</CustomMenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>

                    <FormControl sx={{ width: 376 }}>
                        <label htmlFor="jobType">Job Type</label>
                        <Controller
                            name="jobType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    IconComponent={CustomDropdownIcon}
                                    displayEmpty
                                    sx={{
                                        marginTop: '8px',
                                        borderRadius: '10px',
                                        height: '58px',
                                        border: '1px solid #BCBCBC',
                                        padding: '5px 16px 0px 0',
                                        fontSize: '18px',
                                        fontFamily: "inherit",
                                        fontWeight: "600",
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid black' },
                                        '&.Mui-focused': {
                                            boxShadow: 'none',
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                borderRadius: '10px',
                                                boxShadow: '0px 0px 14px 0px #93939340',
                                            },
                                        },
                                    }}
                                >
                                    <CustomMenuItem sx={{ display: "none" }} disabled value="">
                                        <em style={{
                                            color: "grey", fontStyle: "normal", fontFamily: "inherit", fontSize: "16px",
                                            fontWeight: "500"
                                        }} >FullTime</em>
                                    </CustomMenuItem>
                                    <CustomMenuItem value="Internship">Internship</CustomMenuItem>
                                    <CustomMenuItem value="Full Time">Full Time</CustomMenuItem>
                                    <CustomMenuItem value="Part Time">Parttime</CustomMenuItem>
                                    <CustomMenuItem value="Contract">Contract</CustomMenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </div>

                <div className="salary-deadline">
                    <div className="input-content">
                        <label htmlFor="salaryMin">Salary Range</label>
                        <div style={{ display: "flex" }}>
                            <div className="salary-input" >
                                <img src={minmaxSalary} alt="₹" style={{ width: "16px", marginRight: "2px" }} />
                                <Controller
                                    name="salaryMin"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            placeholder="₹0"
                                            style={{
                                                fontFamily: "inherit",
                                                fontWeight: "600",
                                                border: "none",
                                                outline: "none",
                                                width: "100%",
                                                fontSize: "16px",
                                            }}
                                        />
                                    )}
                                />
                            </div>



                            <div className="salary-input2" >
                                <img src={minmaxSalary} alt="₹" style={{ width: "14px", marginRight: "2px" }} />
                                <Controller
                                    name="salaryMax"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            placeholder="₹12,00,000"
                                            style={{
                                                fontFamily: "inherit",
                                                border: "none",
                                                fontWeight: "600",
                                                outline: "none",
                                                width: "100%",
                                                fontSize: "16px"
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-content">
                        <label htmlFor="deadline">Application Deadline</label>

                        <div style={{ position: "relative", width: "100%" }}>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="date"
                                        ref={field.ref}
                                        className="deadline-input"
                                        style={{
                                            color: field.value ? 'black' : 'transparent',
                                        }}
                                    />
                                )}
                            />

                            {/*  Custom Calendar Icon */}
                            <img
                                src={calendar}
                                alt="calendar"
                                onClick={() => document.querySelector('input[type="date"]').showPicker?.()}
                                style={{
                                    position: 'absolute',
                                    right: '17px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '18px',
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="job-description">
                    <label>Job Description</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="textarea-input"
                                placeholder="Please share a description to let the candidate know more about the job role"
                            />
                        )}
                    />
                </div>

                <div className="form-buttons">
                    <button className="save-draft" onClick={handleClose} type="button">
                        Save Draft
                        <img src={savedraft} style={{ width: "12px", marginLeft: "10px" }} />
                    </button>
                    <button className="save-draft" type="submit">
                        Publish
                        <img src={publish} style={{ width: "12px", marginLeft: "10px" }} />
                    </button>
                </div>
            </form>
        </Box >
    );
};

export default JobForm;