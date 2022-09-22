import React, { useEffect, useState } from 'react'
import TopHeader from '../TopHeader'
import BlueSide from '../BlueSide'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Insidelayout({ children }) {
    const router = useRouter()
    const mainReducer = useSelector(state => state.mainReducer)
    const [roleType,setRoleType] = useState("student");

    useEffect(() => {
        if(mainReducer.loggedInUser !== undefined) {

            if(mainReducer.loggedInUser.userData !== undefined) {
                if(mainReducer.loggedInUser.userData.type === "teacher") {
                    setRoleType("teacher");
                }
            }
            
        }
        return () => {

        }
    }, [])
    return (
        <>

            <div className="inside-page-wrapper">
                <TopHeader></TopHeader>
                <div className={`inside-page-content ${router.pathname == "/profile" ? "nogap" : ""}`}>
                    
                    {roleType !== "teacher" && <BlueSide />}
                    <main style={roleType !== "teacher"?{}:{marginRight:"2vw"}}>{children}</main>
                </div>
            </div>
        </>
    )
}
