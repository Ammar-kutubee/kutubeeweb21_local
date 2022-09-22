import React, { useEffect, useState } from 'react'
import { getCategories } from '../../src/utils/apis';
import Layout from '../../components/layouts/Layout'
import GridItemindex from '../../components/Categoryitem/index'
import CustomButton from '../../components/CustomButton'
import withAuth from '../../src/utils/withAuth';

const Interests = () => {

    const onNext = () => {
        // navigation.navigate('Home')
    }
    const [categories, setCategories] = useState([])
    useEffect(async () => {
        let cats = await getCategories(3211, 'en')
        let catsdata = cats.children[0]

        setCategories(catsdata.children)


    }, [])

    return (
        < div >
            <div className="pageWrapper">
                <div className="boxWrapper">
                    <div className="loginboxWrapper avatar">
                        <div className="yellowText">Step 2
                        </div>
                        <div className="flex-wrapper-row text">Please Choose the
                            <div className="textBlack"> topics </div>
                            that you prefer to read
                        </div>
                        <GridItemindex home title={"interests"} categories={categories} language={"en"} />
                        <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-login-width">

                            <CustomButton
                                // disabled={selectedInterests.length <3 }
                                onPress={onNext}
                                text={'Done'}
                                buttonStyle={{
                                    // marginVertical: mScale(10)
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        </div >


    )
}

Interests.layout = "Out";

export default Interests;