import axios from "axios";
import config from "./config";

 export async function getAllActiveCourses() {
    const URL = config.BASE_URL + '/course/all-active-courses'
    const response = await axios.get(URL)
    return response.data
}

export async function loginUser(email,password,role){
    const URL = config.BASE_URL + '/user/login'
    const body = {email,password,role}
    const response = await  axios.post(URL,body)
    return response.data
}