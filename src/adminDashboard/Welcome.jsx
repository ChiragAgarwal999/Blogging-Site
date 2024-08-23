import React, { useContext, useEffect, useState } from 'react';
import { UserEmailContext } from '../components/UserEmailProvider';
import axios from 'axios';

function Welcome() {
    const {email} = useContext(UserEmailContext);
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/${email}`);
                setAdmin(res.data);
            } catch (err) {
                console.log(err.message);
            }
        };

        if (email) {
            fetchAdmin();
        }
    }, [email]);

    return (
        <>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'80vh'}}>
            <div className='fs-5 text-primary'>{admin.email}</div>
            <div className='fs-1'>Welcome {admin.name} !</div>
        </div>
        </>
    );
}

export default Welcome;
