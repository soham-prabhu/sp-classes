import { useState } from 'react';
import { useNavigate } from "react-router"
import { registerUser } from '../services/studentService';
import { toast } from "react-toastify"

function Register(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile_no,setMobile_no] = useState('')
    const [course_no, setCourse_no] = useState('')

    const navigate = useNavigate()

    const signup = async ()=>{
        if(name == '')
            toast.warn('name must be entered')
        else if (email == '')
            toast.warn('email must be entered')
        else if (mobile_no == '')
            toast.warn('password must be entered')
        else{
            
            const result = await registerUser(name,email,mobile_no)
            if(result.status == 'success'){
                navigate('/')
                toast.success('User registered successfully')
            }
            else{
                toast.error(result.error)
            }
        }
    }

    return(
        <div className='container w-50'>
            <div className=" mt-3 mb-3">
                <label for="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter name" onChange={e=>setName(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label for="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}  required />
            </div>

            <div className="mb-3">
                <label for="inputMobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="inputMobile" placeholder="Enter Mobile number" onChange={e=>setMobile_no(e.target.value)} required />
            </div>

            <div className="mb-3">
                <button className="btn btn-success" onClick={signup}>Signup</button>
            </div>

            <div>
                Already have an account? then to login <Link to='/' >Click Here</Link>
            </div>
        </div>
    )
}

export default Register
