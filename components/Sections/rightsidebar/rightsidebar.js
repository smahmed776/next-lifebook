import React, { useEffect } from 'react';

const RightSideBar = () => {

    // const request = async()=>{
    //     const req = await fetch("/api");
    //     const res = req.json();
    //     console.log(res)
    // }

    // useEffect(() => {
    //     request();
    // }, [])

    return (
        <section className="rightbar-container position-absolute px-3">
            <h4>Group conversations</h4>
            <div>
                <p>

                <span className="bi bi-plus me-2 bg-light border p-1 rounded-pill"></span> Create New Group
                </p>
            </div>
        </section>
    )
}

export default RightSideBar
