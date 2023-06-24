import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuestionDesine from '../Engine/QuestionDesine';
import "../styles/fonts.scss"

const Test = () => {
    useEffect(() => {
        fetchTestApi(param.qCode);
    }, [])

    const param = useParams();
    const [qSetData, setQSetData] = useState()
    const fetchTestApi = async (code) => {
        try {
            const token = await localStorage.getItem('quizer-auth-token')

            let response = await fetch(`http://localhost:5001/quiz/join/${code}`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                }
            })

            let data = await response.json();
            setQSetData(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    const [digiSign, setDigiSign] = useState("");
    const handleonChange = (e) => {
        setDigiSign({...digiSign, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className="container py-5">

                <div className="col col-12 d-flex flex-wrap align-items-center">
                    <div className="col col-8 header-2">
                        <p className='text-white d-flex align-items-center'>
                            <span className="theamText">B</span>est of&nbsp;<span className="theamText">L</span>uck
                            <div className='ms-3'>
                                <span className="theamText">"</span>
                                {
                                    qSetData && qSetData.userData.fName
                                }
                                <span className="theamText">"</span>
                            </div>
                        </p>
                    </div>

                    <div className="col col-4 text-white user-select-none">
                        <div className='ml-auto d-flex' style={{ width: 'fit-content' }}>
                            <span className="text-white fs-3">
                                Time Remaining -&nbsp;
                            </span>
                            <p className='text-white fs-3'>
                                {
                                    "Timer"
                                }
                            </p>
                        </div>
                    </div>

                    <hr className='theamText mb-4 mt-0' width="100%" />

                    <div className="row mx-0 col-12">
                        {
                            qSetData && <QuestionDesine data={qSetData.quizeSet.questions} qSet_Id={qSetData.quizeSet._id} edit={false} />
                        }
                    </div>

                    <div className="row mx-0 mb-5">
                        <p className='text-white fs-4 ff-nunito mb-4'>I hearby declarare that i response all question with my full knowledge and not attempting any vulnarable activity. If i founded any permeable activity test organizer can take action on me and he can also punish me as he want.</p>
                        <form>
                            <div className="d-flex align-items-center gap-4">
                                <div className="col-3">
                                    <input type="text" name="digitalSign" className='custom-input-2' placeholder='Your digital signature' style={{ boxShadow: 'none' }}  onChange={handleonChange}/>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-primary fs-5" type='submit' style={{ padding: '.6rem 1.5rem' }} disabled={ !digiSign.digitalSign } >Submit Response</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test
