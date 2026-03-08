import axios from 'axios'
import config from './config';

export async function registerCourse(name,email,mobile_no,course_id) {
    const URL = `${config.BASE_URL}/student/register-to-course`
    const body = {name,email,mobile_no,course_id}
    const response = await axios.post(URL,body)
    return response.data
}

export async function getCourse(course_id) {
    const URL = `${config.BASE_URL}/course/info/${course_id}`
    const response = await axios.get(URL)
    return response.data
}

export async function getMyCourses(token) {
    const URL = `${config.BASE_URL}/student/my-courses`
    const headers = {token}
    const response =await axios.get(URL,{headers})
    return response.data
}

export async function getCourseVideos(course_id,token) {
    const URL = `${config.BASE_URL}/student/my-course-with-videos/${course_id}`
    const headers = {token}
    const response =await axios.get(URL,{headers})
    console.log(response.data);
    
    return response.data
}

export async function updateNewPass(passwords,token) {
    const URL = `${config.BASE_URL}/student/change-password`
    const headers = {token}
    const response =await axios.put(URL,passwords,{headers})
    console.log(response.data);
    return response.data
}