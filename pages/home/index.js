import router from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomeIndex = () => {
    const type = useSelector(state => state.mainReducer.loggedInUser.userData.type)

    useEffect(async () => {
        if (type == "teacher") {
            router.replace("/home/openLibrary")
        }
        else {
            router.replace("/home/level")
        }
        return () => {

        }
    }, [])
    return (

        <div>


        </div>

    )
}
HomeIndex.layout = "In";

export default HomeIndex;