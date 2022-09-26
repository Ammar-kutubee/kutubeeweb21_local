import axios from 'axios';
import router from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Confirm, Header, Icon, Modal } from 'semantic-ui-react';
import CustomButton from '../../components/CustomButton';

export default function ConfirmationMessage({
	userId,
	confirmationMessage,
	confirmationType,
	type,
	setOpen,
	open,
	onConfirmationYes,
	currentLanguage,
}) {
	const [submitted, setSubmit] = React.useState(false);

	const { t, i18n } = useTranslation([], { useSuspense: false });
	const dispatch = useDispatch();
	const language = i18n.language;

	useEffect(async () => {
		return () => {};
	}, [submitted]);
	const submitAssignment = () => {};

	const goBack = () => {
		router.back();
	};
	return (
		<Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} size='tiny'>
			<Modal.Content>
				<div className='flex-wrapper-col flex-center align-center'>
					<div className='section-title' style={{ textAlign: 'center' }}>
						{confirmationMessage}
					</div>
					<div style={{ width: '55%', marginTop: '25px' }}>
						{console.log('skkkkk', confirmationType.includes('delete'))}
						<CustomButton
							text={
								confirmationType.includes('delete')
									? t('bookComponent.yesDelete', { lng: currentLanguage })
									: t('bookComponent.yesShare', { lng: currentLanguage })
							}
							onPress={() => {
								onConfirmationYes();
								console.log('tyyyype', confirmationType);
							}}
						/>
					</div>
					<div className='whitebtn' style={{ width: '55%', marginTop: '25px' }}>
						<CustomButton onPress={() => setOpen(false)} text={t('bookComponent.cancel', { lng: currentLanguage })} />
					</div>
				</div>
			</Modal.Content>
		</Modal>
	);
}
