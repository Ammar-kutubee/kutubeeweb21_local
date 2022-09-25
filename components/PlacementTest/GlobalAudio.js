import React, { useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function GlobalAudio({ onEnd, onLoad, paused, onVideoRef, audioLink, onProgress }) {
	let player = useRef(null);
	const onRef = (ref) => {
		onVideoRef && onVideoRef(ref);
		player = tref; //TODO is this a typo error?
	};
	return <ReactAudioPlayer src={audioLink} ref={player} paused={paused} onEnded={onEnd} autoPlay />;
}
