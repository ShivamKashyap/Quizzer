import React from 'react'
import '../styles/customCard.scss'
import reportSvg from '../storyset/report.gif'
import ProfileModal from './ProfileModal'

const Reportbug = () => {
    return (
        <>
            <ProfileModal />

            <div className='container special-container height-80vh'>
                <div className='row d-flex flex-wrap justify-content-evenly' style={{ width: '100%' }} >
                    <div className="col-5 center-center flex-column">
                        <img src={reportSvg} alt="" height="75%" />
                        <span className='report-img-desc mt-5'>Small Correction give a better Improvement</span>
                    </div>

                    <div className="col-6 d-flex mx-5 d-flex align-items-center">
                        <div className="custom-card p-4 flex-column">
                            <div className="custom-card-header my-5">
                                <span className='text-white'>Hey! is there any</span>
                                <span className='text-white'>Problem</span>
                            </div>

                            <div className="report-desc my-3">
                                <span className='report-des-text'>We really want to help you with</span>
                                <span className='report-des-text'>Improved features of Us.</span>
                            </div>

                            <div className='report-form'>
                                <form action="" className='text-white'>
                                    <textarea name="reportdata" id="reportTextBox" cols="30" rows="7" placeholder='Please Describe problem shortly'></textarea>
                                    <button className='btn btn-custom m-2' type='submit'>Report</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reportbug
