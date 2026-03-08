import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../services/config';
import { getCourse } from '../services/studentServices';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

export const CourseDetails = () =>
{
    const navigate = useNavigate()
    const { id } = useParams()
    const [ course, setCourse ] = useState( null )

    useEffect( () =>
    {
        // Fetching data
        const fetchCourse = async () =>
        {

            const result = await getCourse( id );
            if ( result.status == 'success' )
            {
                console.log( result.data );

                setCourse( result.data[ 0 ] );
            }
        }
        fetchCourse()
    }, [ id ] );

    //  Course not found
    if ( !course )
    {
        return <div className="container p-5">Course not found</div>;
    }

    return (
        <>
        <Header/>
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center w-100">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 overflow-hidden">
                        {/* Top Accent Bar */ }
                        <div style={ { height: '8px', backgroundColor: '#6f42c1' } }></div>

                        <div className="card-body p-5">
                            <h1 className="display-6 fw-bold text-dark mb-3">
                                { course.course_name }
                            </h1>

                            <p className="text-secondary mb-4" style={ { fontSize: '1.1rem', lineHeight: '1.6' } }>
                                { course.description }
                            </p>

                            <hr className="my-4 opacity-25" />

                            <div className="row g-3 mb-4">
                                <div className="col-sm-6">
                                    <div className="p-3 border rounded bg-light text-center">
                                        <small className="text-uppercase text-muted fw-bold d-block">Starts</small>
                                        <span className="fw-semibold">{ new Date( course.start_date ).toDateString() }</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="p-3 border rounded bg-light text-center">
                                        <small className="text-uppercase text-muted fw-bold d-block">Ends</small>
                                        <span className="fw-semibold">{ new Date( course.end_date ).toDateString() }</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-4">
                                <h2 className="fw-bold" style={ { color: '#6f42c1' } }>
                                    Fees: ₹{ course.fees }
                                </h2>
                            </div>

                            <div className="d-grid px-4">
                                <button
                                    className="btn btn-lg text-white py-3 shadow-sm"
                                    style={ { backgroundColor: '#6f42c1', borderRadius: '10px' } }
                                    onClick={ () => navigate( `/register/${ course.course_id }`, { state: { course } } ) }
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CourseDetails;