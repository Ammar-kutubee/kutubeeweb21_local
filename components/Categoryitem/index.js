import React, { useEffect, useState } from 'react'
import GridItem from './GridItem'

export default function GridItemindex({ lastItem,containerWidth, title, index, categories, objecttype, hideTitle, onItemPressed, selectedItem, selectMultiple, home, wrapperStyle, language }) {

    const [wrapperWidth, setWrapperWidth] = useState(0)
    const [type, setType] = useState("")

    // const [itemWidth, setItemWidtrh] = useState(0)
    console.log("indexxx", index)

    useEffect(() => {
        // console.log("index", index)

        if (index == 0) {
            setType("subjects")
        }
        if (index == 1) {
            setType("PYP")
        }
        if (index == 2) {
            setType("level")
        }
        else if (index == 3) {
            setType("age")
        }
        return () => {

        }
    }, [type])
    const itemMargin = 15
    const isSelected = (category, index) => {
        // console.log('category', category, 'index', index)
        if (selectMultiple) {
            let findSelected = selectedItem.find(selected => {
                return selected._id == category._id
            })
            console.log('findSelected', findSelected)
            return findSelected != undefined
        } else {
            return selectedItem == index
        }
    }


    // let items = 
    return (
        <div className="wrapperStyle">
            <div className="bookSectionTitle">{title}</div>
            <div className="gridwrapper" style={lastItem !== undefined?{marginBottom:130}:{}}>
                {categories?.map((category, index) => {

                    return <GridItem objecttype={objecttype} home={home} type={type} selected={isSelected(category, index)} hideTitle={hideTitle} category={category} itemMargin={itemMargin} index={index} onItemPressed={onItemPressed} />
                })}


            </div>

        </div>
    )
}
