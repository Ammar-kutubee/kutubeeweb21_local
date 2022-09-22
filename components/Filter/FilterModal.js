import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import Filter from '../../components/Filter/Filter'
import { useTranslation, withTranslation, Trans } from 'react-i18next';

export default function FilterModal({ currentLanguage, type,filterResult }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    // const currentLanguage = "en"

    const [open, setOpen] = React.useState(false)


    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Modal
                className="filterModal"
                mountNode={document.querySelector('.themewrapper')}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={<Button className="icon-filters"></Button>}
            >
                <Modal.Header> <div className={`sectionTitle ${currentLanguage == "ar" ? 'rtlDir' : 'ltrDir'}`}>{t('filter.filter', { lng: currentLanguage })}</div>
                    <Modal.Actions className={`${currentLanguage == "ar" ? 'rtlDir' : 'ltrDir'}`}>
                        <Button class="ui icon button" onClick={() => setOpen(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content scrolling>

                    <Modal.Description>
                        <Filter filterResult={filterResult} setOpen={setOpen} currentLanguage={currentLanguage} type={type}></Filter>
                    </Modal.Description>

                </Modal.Content>

            </Modal>

        </div >
    )
}
