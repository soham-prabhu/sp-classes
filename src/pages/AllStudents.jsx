import React, { useEffect, useState } from 'react'
import { getAllStudents } from '../services/studentService'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function AllStudents() {
    const [students, setStudents] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("All")
    const [selectedFees, setSelectedFees] = useState('All')
    const navigate = useNavigate()

    useEffect(() => {
        loadStudents()
    }, [])

    const uniqueFees = [...new Set(students.map(s => s.fees))]

    const loadStudents = async () => {
        const result = await getAllStudents()
        if (result.status === 'success') {
            setStudents(result.data)
        } else {
            toast.error("Failed to load Students")
        }
    }

  

    const uniqueCourses = ["All", ...new Set(students.map(s => String(s.course_name)))];

// 👇 REPLACE HERE
const filteredStudents = students.filter(student => {

  const paymentStatus =
    student.reg_no % 2 === 0 ? "PAID" : "UNPAID";

  return (
    (selectedCourse === "All" ||
      student.course_name === selectedCourse) &&

    (selectedFees === "All" ||
      paymentStatus === selectedFees)
  );
});

const exportToExcel = () => {

  const headers = [
    "Reg No",
    "Student Name",
    "Email",
    "Course Name",
    "Mobile No",
    "Fees Status"
  ];

  const rows = filteredStudents.map(student => [
    student.reg_no,
    student.name,
    student.email,
    student.course_name,
   `="${student.mobile_no}"`,
    student.reg_no % 2 === 0 ? "PAID" : "UNPAID"
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "students.csv");

  document.body.appendChild(link);
  link.click();
};
    return (
     
        <div className="container py-4">
            <h2 className="text-center my-4 fw-bold" style={{ color: '#333' }}>
                All <span style={{ color: '#6f42c1' }}>Students</span>
            </h2>

           <div className="mb-4 row">
  <div className="col-md-4">

    <style>
      {`
        .custom-select:focus {
          border-color: #6f42c1 !important;
          box-shadow: 0 0 0 0.25rem rgba(111, 66, 193, 0.25) !important;
        }
        .custom-select:hover {
          background-color: #f3eaff;
          border-color: #6f42c1 !important;
        }
      `}
    </style>

    <label className="form-label fw-bold" style={{ color: '#6f42c1' }}>
      Filter by Course
    </label>

    {/* COURSE FILTER */}
    <select
      className="form-select border-2 custom-select mb-2"
      style={{ borderColor: '#6f42c1', borderRadius: '8px' }}
      value={selectedCourse}
      onChange={(e) => setSelectedCourse(e.target.value)}
    >
      {uniqueCourses.map(course => (
        <option key={course} value={course}>{course}</option>
      ))}
    </select>

    {/* FEES FILTER */}
    <select
  className="form-select border-2 custom-select"
  value={selectedFees}
  onChange={(e) => setSelectedFees(e.target.value)}
>
  <option value="All">Filter by Fees</option>
  <option value="PAID">PAID</option>
  <option value="UNPAID">UNPAID</option>
</select>
<button
  onClick={exportToExcel}
  style={{
    backgroundColor: "#6f42c1",
    border: "none",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "8px",
    transition: "all 0.2s ease"
  }}
>
  Export to Excel
</button>
  </div>
</div>
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th className="py-3 border-0 ps-3 text-white" style={{ backgroundColor: '#6f42c1' }}>Reg No.</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Student Name</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Email</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Course Name</th>
                            <th className="py-3 border-0 text-white pe-3" style={{ backgroundColor: '#6f42c1' }}>Mob No.</th>
                             <th className="py-3 border-0 text-white pe-3" style={{ backgroundColor: '#6f42c1' }}>FEES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredStudents.map(student => (
                            <tr key={student.reg_no}>
                                <td className="fw-bold ps-3">{student.reg_no}</td>
                                <td className="fw-semibold">{student.name}</td>
                                <td className="text-muted">{student.email}</td>
                                
                                
                                <td>
                                    <span className="fw-normal px-3" style={{ color: '#6f42c1' }}>
                                        {student.course_name}
                                    </span>
                                </td>
                                <td className="pe-3">{student.mobile_no}</td>
                               <td className="pe-3">
                                <span
                                 className={`fees-badge ${
                                 student.reg_no % 2 === 0 ? "paid" : "unpaid"
                                  }`}
                                >
                                 {student.reg_no % 2 === 0 ? "PAID" : "UNPAID"}
                                </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllStudents
