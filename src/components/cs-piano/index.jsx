import React, { Component } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import SoundfontProvider from './soundfont-provider';
import 'react-piano/dist/styles.css';

import Tone from 'tone';

class CSPiano extends Component {
	constructor(props) {
		super(props);

		// webkitAudioContext fallback needed to support Safari
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

		this.synth = new Tone.Synth().toMaster();
	}

	state = {};
	render() {
		const firstNote = MidiNumbers.fromNote('c3');
		const lastNote = MidiNumbers.fromNote('f5');
		const keyboardShortcuts = KeyboardShortcuts.create({
			firstNote: firstNote,
			lastNote: lastNote,
			keyboardConfig: KeyboardShortcuts.HOME_ROW
		});

		return (
			<SoundfontProvider
				instrumentName="acoustic_grand_piano"
				audioContext={this.audioContext}
				hostname={this.soundfontHostname}
				render={({ isLoading, playNote, stopNote }) => (
					<Piano
						noteRange={{ first: firstNote, last: lastNote }}
						playNote={playNote}
						stopNote={stopNote}
						width={1000}
						disabled={isLoading}
						keyboardShortcuts={keyboardShortcuts}
					/>
				)}
			/>
		);
	}
}

export default CSPiano;
