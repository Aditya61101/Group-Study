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
        if (status === 'loading') {
            return;
        }

        if (!userData || !userData.user) {
            router.push('/login');
        }

        console.log(userData)
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
            <div className="profile-container d-flex items-center mt-5 justify-content-around">
                <div className='d-flex align-items-center justify-content-center flex-column'>

                    <img
                        src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Face-Profile-User-Man-Boy-Person-Avatar-512.png"
                        alt="Profile"
                        className="rounded-circle mb-3"
                        width="150"
                    />
                    <h3 className="profile-title">{userData?.user?.name}</h3>
                    <span>{userData?.user?.email}</span>
                </div>
                <div style={{ margin: '0 0 ' }} className={styles.formWrap}>
                
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
        </>
    )
}
