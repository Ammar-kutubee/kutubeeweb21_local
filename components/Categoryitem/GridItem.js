import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function GridItem({ home, category, itemWidth, itemMargin, index, type, onItemPressed, hideTitle, selected, currentLanguage, objecttype }) {




    return (

        <div
            key={category._id}
            className="gridWrapperShadow"
        >

            {
                home ?
                    <Link href={`/category/${category._id}?catname=${category.name}&type=${type}&objecttype=${objecttype}`}>

                        <div key={category._id} className="gridItem" >

                            {selected ?
                                <div className="selectedGridItem" />
                                :
                                null
                            }

                            <img src={category.coverUrl}
                            // style={{
                            //     width: hideTitle ? itemWidth - mScale(20) : itemWidth - mScale(40),
                            //     height: hideTitle ? getDynamicCategoryHeight(itemWidth - mScale(20)) : getDynamicCategoryHeight(itemWidth - mScale(40)),
                            // }}
                            />


                            <div className="categoryTitle">{category.name}</div>



                        </div>
                    </Link>
                    :

                    <div key={category._id} className="gridItem" onClick={() => {
                        onItemPressed(index, category)
                    }}>

                        {selected ?
                            <div className="selectedGridItem" />
                            :
                            null
                        }

                        <img src={category.coverUrl}
                        // style={{
                        //     width: hideTitle ? itemWidth - mScale(20) : itemWidth - mScale(40),
                        //     height: hideTitle ? getDynamicCategoryHeight(itemWidth - mScale(20)) : getDynamicCategoryHeight(itemWidth - mScale(40)),
                        // }}
                        />


                        <div className="categoryTitle">{category.name}</div>



                    </div>


            }
        </div >

    )
}
