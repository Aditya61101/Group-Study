import { useEffect, useContext, useState, useMemo, useCallback } from 'react'

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { UpcomingSessionItem } from '@/components/UpcomingSessionItem';
import { StudySessionContext } from "@/context/StudySessionContextProvider";

export default function profile() {

    const [sessions, setSessions] = useState([])
    const sessionCtx = useContext(StudySessionContext);

    useMemo(
        () => {
            setSessions(sessionCtx.upSessions)
        },
        [sessionCtx.upSessions]
    );

    const router = useRouter();
    const session = useSession();
    const { status, data: userData } = useSession();

    useEffect(() => {
        if (status === 'loading') {
            sessionCtx.getSessions();
            return;
        }

        if (!userData || !userData.user) {
            router.push('/login');
        }

    }, [status, userData, router]);

    if (session?.status === "loading") {
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

            {sessions ? <>
                <div className="d-flex items-center mt-5 justify-content-around flex-wrap fw-bold" style={{
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <span>Sessions Created by {userData?.user?.name}</span>

                    {sessions?.map((ses) => {
                        return (
                            <>
                                {
                                    ses.user === userData?.user?.id ?
                                        <>
                                            <div className='d-flex ' key={ses._id}>
                                                <UpcomingSessionItem
                                                    sessionId={ses._id}
                                                    createdById={ses.user}
                                                    title={ses.title}
                                                    subject={ses.subject}
                                                    start_date={ses.startDate.substr(0, 10)}
                                                    start_time={ses.startTime}
                                                    end_date={ses.endDate.substr(0, 10)}
                                                    end_time={ses.endTime}
                                                    max_students={ses.maxStudents}
                                                />
                                            </div>
                                        </>
                                        :
                                        <></>
                                }

                            </>
                        );
                    })}
                </div>

            </> : <>
                <div className='d-flex align-items-center justify-content-center text-center fw-bold mt-4'>
                    No sessions Created.
                    <br />
                    Create some sessions to them here :)
                </div>
            </>}

        </>
    )
}
