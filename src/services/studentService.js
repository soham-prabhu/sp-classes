import axios from 'axios'
import config from './config';

export async function registerCourse(name, email, mobile_no, course_id) {

    const URL = `${config.BASE_URL}/student/register-to-course`

    const body = {
        name,
        email,
        mobile_no,
        course_id
    }

    console.log("SENDING BODY:", body)

    const response = await axios.post(URL, body)

    return response.data
}

export async function getCourse(course_id) {
    const URL = `${config.BASE_URL}/course/${course_id}`
    const response = await axios.get(URL)
    return response.data
}

export async function getAllStudents() {
    const URL = `${config.BASE_URL}/admin/all-enrolled-students`
    const token = localStorage.getItem("token")
    const headers = {
        token
    }
    const response = await axios.get(URL, { headers })
    return response.data
}
