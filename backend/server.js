const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: ['http://localhost:5173','https://job-management-app.netlify.app'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}));


app.use(express.json());

//---------------------------------->>>>>>>> POST route to add a job
app.post('/api/jobs', async (req, res) => {
  const {
    title,
    company,
    location,
    jobType,
    salaryMin,
    salaryMax,
    description,
    deadline,
    logo_url
  } = req.body;

  
  const job_type = jobType;
  const salary_min = salaryMin;
  const salary_max = salaryMax;

  try {
    const newJob = await pool.query(
      `INSERT INTO jobs 
        (title, company, location, job_type, salary_min, salary_max, description, deadline, logo_url)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, company, location, job_type, salary_min, salary_max, description, deadline, logo_url]
    );

    res.status(201).json(newJob.rows[0]);
  } catch (err) {
    console.error("Error inserting job:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


//---------------------------------->>>>>>>> GET route to fetch all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const allJobs = await pool.query('SELECT * FROM jobs ORDER BY id ASC');
    res.status(200).json(allJobs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//---------------------------------->>>>>>>> DELETE DATA
app.delete('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//---------------------------------->>>>>>>> Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
