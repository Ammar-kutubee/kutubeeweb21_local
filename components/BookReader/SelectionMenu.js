import React from 'react'
import DrawingMenu from './DrawingMenu'
import HighlightMenu from './HighlightMenu'
// import DrawingMenu from './DrawingMenu'
// import HighlightMenu from './HighlightMenu'

export default function SelectionMenu({ onDeleteVocabulary,stopDrawingRecorder,allowMic,stream, onSelectionMenuLayout, book, bookId, popup, popupType, showSelectionMenu, addNewHighlight, shared, addNewVocabularies, deletePolygon, selectedPolygonId, selectedPolygonPage, currentPage, currentOrientation, savePolygonAudio, selectionPopupShareBtnEnable, selectionPopupHaveShareBtn, showVocabularies, selectionPopupHavePlayBtn, enableVocabulary, enableHighlight, polygonAudio, onPolygonShare, userType }) {
    const renderMenu = () => {
        console.log("popupType",popupType);
        if (popupType == 'text' || popupType == 'vocabulary') {

            return <HighlightMenu onDeleteVocabulary={onDeleteVocabulary} addNewHighlight={addNewHighlight} shared={shared} addNewVocabularies={addNewVocabularies} showVocabularies={showVocabularies} selectionPopupShareBtnEnable={selectionPopupShareBtnEnable} popupType={popupType} enableVocabulary={enableVocabulary} enableHighlight={enableHighlight} />
        } else {
            return <DrawingMenu stopDrawingRecorder={stopDrawingRecorder} allowMic={allowMic} stream={stream} userType={userType} onPolygonShare={onPolygonShare} polygonAudio={polygonAudio} selectionPopupShareBtnEnable={selectionPopupShareBtnEnable} selectionPopupHavePlayBtn={selectionPopupHavePlayBtn} savePolygonAudio={savePolygonAudio} bookId={bookId} book={book} deletePolygon={deletePolygon} shared={shared} selectedPolygonId={selectedPolygonId} selectedPolygonPage={selectedPolygonPage} currentPage={currentPage} currentOrientation={currentOrientation} />
        }
    }
    return (
        <div
            pointerEvents={showSelectionMenu ? 'auto' : 'none'}
            className="selectionMenu"
            style={
                {
                    top: popup.y,
                    left: popup.x,
                    width: popupType == 'text' || popupType == 'vocabulary' ? 126 : 150,
                    opacity: showSelectionMenu ? 1 : 0,
                    position: 'absolute',
                }
            } >
            {renderMenu()}
            <div className={`${popup.arrow == 'top' ? 'selectionMenuArrowTop' : 'selectionMenuArrow'}`}>

            </div>
        </div>


    )
}
