import Header from '../components/Header'
import "../styles/JobListPage.css"
import { Box, Card } from "@mui/material"
import { useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from './JobForm';

import personImage from "../assets/person.svg"
import onsite from "../assets/onsite.svg"
import lpa from "../assets/lpa.svg"

import getCompanyLogo from '../services/logoMapper';


const JobListPage = () => {

    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        jobType: '',
        salaryRange: [0, 90000]
    });

    //------------- Handler to update filters
    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleClose = () => setShowForm(false);

    const fetchJobs = () => {
        axios.get('http://localhost:5000/api/jobs')
        // axios.get('https://job-management-backend-qpo9.onrender.com/api/jobs')
            .then((res) => setJobs(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchJobs();
    }, []);


    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesLocation = filters.location ? job.location === filters.location : true;
        const matchesJobType = filters.jobType ? job.job_type === filters.jobType : true;
        const matchesSalary =
            Number(job.salary_min) >= filters.salaryRange[0] &&
            Number(job.salary_max) <= filters.salaryRange[1];

        return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
    });
    
    return (
        <>
            <div className="main-container">
                <div style={{ position: "static" }} >
                    <Header
                        handleOpen={() => setShowForm(true)}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "15px 10px",
                    width: "1440px",
                    padding: "50px 65px"
                }} >
                    {filteredJobs.map((job) => {
                        const descriptionLines = job.description.split('\n');
                        return (
                            <Card key={job.id} sx={{
                                width: "315px",
                                height: "360px",
                                borderRadius: "13px",
                            }} >

                                <div className="company-image">
                                    <div className="logo-image">
                                        <img
                                            src={getCompanyLogo(job.company)}
                                            alt={`${job.company} logo`}
                                            style={{ width: '65px', height: '65px' }}
                                        />
                                    </div>
                                    <div className="timing">
                                        <p>24h Ago</p>
                                    </div>
                                </div>
                                <div className="role">
                                    <p>
                                        {job.title}
                                    </p>
                                </div>
                                <div className="job-details">
                                    <span>
                                        <img src={personImage}/>&nbsp;1-3 yr Exp
                                    </span>
                                    <span>
                                        <img src={onsite}/>&nbsp;OnSite
                                    </span>
                                    <span>
                                        <img src={lpa}/>&nbsp;12LPA
                                    </span>
                                </div>
                                <div className="description-area">
                                    <ul>
                                        {
                                            descriptionLines.map((line, index) => (
                                                <li key={index}>{line.replace(/^•\s*/, '')}</li>
                                            ))}
                                    </ul>

                                </div>
                                <div className="btn-section">
                                    <button className='apply-btn' >Apply Now</button>
                                </div>

                            </Card>
                        )
                    })}
                </Box>
            </div>
            <Box sx={{
                background: "#0000006e",
                position: "absolute",
                display: showForm ? "block" : "none",
                width: "1440px",
                height:"1050px",
                top: 0,
            }} >
                <JobForm handleClose={handleClose} refreshJobs={fetchJobs} />
            </Box>
        </>
    )
}

export default JobListPage
