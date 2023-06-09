import React, { useEffect, useContext, useState } from 'react';
import DataContext from './DataContext'
import UtilityContext from '../utility/UtilityContext';

const DataState = (props) => {

    const utilContext = useContext(UtilityContext);
    const { setLogin } = utilContext;

    const [userData, setUserData] = useState();

    const defaultImg = "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg";

    const loadData_inst = async (token) => {
        try {
            const response = await fetch(`http://localhost:5001/api/getDetails/inst`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            localStorage.setItem('userProfileData', JSON.stringify(data))
            setLogin(true)
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`);
        }
    }

    const loadData_stu = async (token) => {
        try {
            const response = await fetch(`http://localhost:5001/api/getDetails/stu`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            localStorage.setItem('userProfileData', JSON.stringify(data))
            setLogin(true)
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('quizer-auth-token')
        return async () => {
            if (token) {
                await loadData_inst(token).then(async (e) => {
                    if (e !== null) {
                        localStorage.setItem('userProfileData', JSON.stringify(e))
                        let data = localStorage.getItem('userProfileData');
                        data = await JSON.parse(data);
                        setUserData(data)
                        setLogin(true)
                    } else {
                        await loadData_stu(token).then(async (e) => {
                            if (e !== null) {
                                localStorage.setItem('userProfileData', JSON.stringify(e))
                                let data = localStorage.getItem('userProfileData');
                                data = await JSON.parse(data);
                                setUserData(data)
                                setLogin(true)
                            } else {
                                console.log('No authentication key found');
                            }
                        })
                    }
                })
            } else {
                return;
            }
        }
    }, [])

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
            return data

        } catch (error) {
            console.log(error);
        }
    }

    const generateCode = (id) => {
        if (id) {
            let temp = String(Math.floor(10000 + Math.random() * 10000))
            let code = temp.slice(0, 4) + id.slice(0, 4);
            return code;
        } else {
            return -1;
        }
    }

    return (
        <DataContext.Provider value={{ loadData_inst, loadData_stu, userData, defaultImg, generateCode, fetchTestApi, qSetData }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState;