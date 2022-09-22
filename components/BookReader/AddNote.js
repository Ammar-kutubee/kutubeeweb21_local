import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal, TextArea } from 'semantic-ui-react'
import CustomButton from '../../components/CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
export default function AddNote({ userType, onAddNoteClose, save, currentTheme, language, onSaveNote, onShareNote, open, onNoteClose, note, onNoteTextChange }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });

    return (
        <Modal className={` addNote ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
            open={open}
            size="big"
            onClose={() => {
                onNoteClose()
            }}
            onOpen={() => {

            }}
        >
            <Modal.Header> <div className={`sectionTitle ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`} style={{
                paddingBottom:0
            }}>
                {t('bookComponent.addNote', { lng: language })}

            </div>
                <Modal.Actions>
                    <Button class="ui icon button" onClick={() => {
                        onNoteClose()
                    }} primary>
                        <i class="bluek large icon icon-close"></i>
                    </Button>
                </Modal.Actions>
            </Modal.Header>

            <Modal.Content>
                {console.log('note.mainNote', note.mainNote)}
                {note.mainNote &&
                    <TextArea style={{
                        marginTop:'-2rem'
                    }} value={note.mainNote.text ? note.mainNote.text : ''} onChange={onNoteTextChange} rows={7} className="add-note-text" placeholder={t('bookComponent.typeNoteHere', { lng: language })} />
                }

                <Modal.Actions>
                    <div
                        class="buttons-wrapper"
                        style={{
                            display: 'flex',
                            flexDirection: 'none'
                        }}>
                        <CustomButton onPress={onShareNote} text={t('bookComponent.share', { lng: language })} />
                        <CustomButton onPress={onSaveNote} text={t('bookComponent.save', { lng: language })} />
                    </div>
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    )
}