import axios from 'axios'
import config from './config';

export async function getAllVideos() {
    const URL = `${config.BASE_URL}/video/all-videos`
    const token = localStorage.getItem("token")
    const headers = {
        token
    }
    const response = await axios.get(URL, { headers })
    return response.data
}

export async function deleteVideo(video_id) {
    const URL = `${config.BASE_URL}/video/delete/${video_id}`;
    const token = localStorage.getItem("token");
    const headers = {
        token
    };
    const response = await axios.delete(URL, { headers });
    return response.data;
}

export async function updateVideo(video_id, videoData) {
    const URL = `${config.BASE_URL}/video/update/${video_id}`;
    const token = localStorage.getItem("token");
    const headers = { token };
    const response = await axios.put(URL, videoData, { headers });
    return response.data;
}

export async function addVideo(videoData) {
    console.log(videoData)
    const URL = `${config.BASE_URL}/video/add`
    const token = localStorage.getItem("token")
    const headers = {
        token
    }
    const response = await axios.post(URL, videoData, { headers });
    return response.data;
}