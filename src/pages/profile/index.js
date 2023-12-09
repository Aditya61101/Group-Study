import { useEffect, useState } from 'react'

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import LoadingSpinner from "@/components/LoadingSpinner";

import styles from "@/styles/form.module.css";

export default function profile() {

    const router = useRouter();
    const session = useSession();
    const { status, data: userData } = useSession();

    useEffect(() => {
        console.log(userData)
        if (status === 'loading') {
            return;
        }

        if (!userData || !userData.user) {
            router.push('/login');
        }
    }, [status, userData, router]);

    if (session?.status === "loading") {
        return <LoadingSpinner />;
    }

    const user = {
        Name: 'Pooranjoy Bhattacharya',
        dateCreated: 'December 9, 2023',
        sessionsCreated: 5,
        numberOfSessions: 10,
        dateOfBirth: 'January 31, 2001',
        college: 'Manipal Institute of Technology',
        age: 33,
        address: '123 St, City, India',
    };
    return (
        <>
            <div className="profile-container d-flex items-center mt-5 justify-content-around">
                <div className='d-flex align-items-center justify-content-center flex-column'>

                    <img
                        src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Face-Profile-User-Man-Boy-Person-Avatar-512.png"
                        alt="Profile"
                        className="rounded-circle mb-3"
                        width="150"
                    />
                    <h3 className="profile-title">{user.Name}</h3>
                    <span>User since 2023</span>
                </div>
                <div style={{margin: '0 0 '}} className={styles.formWrap}>

                    <p className="profile-text">
                        <strong>Registered Email:</strong> {userData?.user?.email}
                    </p>
                    <p className="profile-text">
                        <strong>Date Created:</strong> {user.dateCreated}
                    </p>
                    <p className="profile-text">
                        <strong>Sessions Created:</strong> {user.sessionsCreated}
                    </p>
                    <p className="profile-text">
                        <strong>Number of Attended:</strong> {user.numberOfSessions}
                    </p>
                    <p className="profile-text">
                        <strong>Date of Birth:</strong> {user.dateOfBirth}
                    </p>
                    <p className="profile-text">
                        <strong>College:</strong> {user.college}
                    </p>
                    <p className="profile-text">
                        <strong>Age:</strong> {user.age}
                    </p>
                    <p className="profile-text">
                        <strong>Address:</strong> {user.address}
                    </p>
                </div>
            </div>
        </>
    )
}
