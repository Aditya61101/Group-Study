import { useEffect, useContext, useState } from 'react'

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { StudySessionContext } from "@/context/StudySessionContextProvider";

export default function profile() {

    const [sessions, setSessions] = useState([]);
    const sessionCtx = useContext(StudySessionContext);
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      sessionCtx.getSessions();
    }, []);

    useEffect(() => {
      setSessions(sessionCtx.upSessions);
      findSessions();
    }, [sessionCtx.upSessions]);
    
    const findSessions = () => {
      const userSessions = sessions.filter((ses) => ses.user === userData?.user?.id);
      setCount(userSessions.length);
    };
  
    const router = useRouter();
    const session = useSession();
    const { status, data: userData } = useSession();
  
    useEffect(() => {
      if (status === 'loading') {
        return;
      }
  
      if (!userData || !userData.user) {
        router.push('/login');
      } else {
        findSessions();
      }
    }, [status, userData, router]);
  
    if (session?.status === 'loading') {
      return <LoadingSpinner />;
    }
  
    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className=" d-flex items-center mt-5 justify-content-around flex-wrap md:flex-col">
                <div className='d-flex align-items-center justify-content-center flex-column md:mb-5'>

                    <img
                        src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Face-Profile-User-Man-Boy-Person-Avatar-512.png"
                        alt="Profile"
                        className="rounded-circle mb-3"
                        width="150"
                    />
                    <h3 className="profile-title">{userData?.user?.name}</h3>
                    <span>{userData?.user?.email}</span>
                </div>
                <div style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} className='p-5 rounded mt-4'>

                    <p className="profile-text">
                        <strong>Registered Email:</strong> {userData?.user?.email}
                    </p>
                    <p className="profile-text">
                        <strong>College:</strong> {userData?.user?.college}
                    </p>
                    <p className="profile-text">
                        <strong>Sessions Created:</strong> {count}
                    </p>
                    <p className="profile-text">
                        <strong>Age:</strong> {userData?.user?.age}
                    </p>
                    <p className="profile-text">
                        <strong>Address:</strong> {userData?.user?.address}
                    </p>
                    <p className="profile-text">
                        <strong>Member Since:</strong> {formatDate(userData?.user?.createdAt)}
                    </p>
                </div>
            </div>

        </>
    )
}
