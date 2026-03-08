import axios from 'axios'
import config from './config';

export async function getAllCourses() {
    const URL = `${config.BASE_URL}/course/admin/all-courses`
    const token = localStorage.getItem("token")
    const headers = {
        token
    }
    const response = await axios.get(URL, { headers })
    return response.data
}

export async function deleteCourse(course_id) {
    const URL = `${config.BASE_URL}/course/delete`;
    const token = localStorage.getItem("token");

    const headers = {
        "token": token,
        "course_id": course_id
    };
    const response = await axios.delete(URL, { headers });
    return response.data;
}

export async function updateCourse(course_id, courseData) {
    const URL = `${config.BASE_URL}/course/update/${course_id}`;
    const token = localStorage.getItem("token");
    const headers = { token };
    const response = await axios.put(URL, courseData, { headers });
    return response.data;
}

export async function addCourse(courseData) {
    const URL = `${config.BASE_URL}/course/add`
    const token = localStorage.getItem("token")
    const headers = {
        token
    }
    const response = await axios.post(URL, courseData, { headers });
    return response.data;
}