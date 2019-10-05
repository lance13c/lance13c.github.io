import React, { Component } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import 'react-piano/dist/styles.css';

import './index.scss';

import Tone from 'tone';

const midiToKeyMap = new Map([
	[ '96', 'C7' ],
	[ '95', 'B6' ],
	[ '94', 'Bb6' ],
	[ '93', 'A6' ],
	[ '92', 'Ab6' ],
	[ '91', 'G6' ],
	[ '90', 'Gb6' ],
	[ '89', 'F6' ],
	[ '88', 'E6' ],
	[ '87', 'Eb6' ],
	[ '86', 'D6' ],
	[ '85', 'Db6' ],
	[ '84', 'C6' ],
	[ '83', 'B5' ],
	[ '82', 'Bb5' ],
	[ '81', 'A5' ],
	[ '80', 'Ab5' ],
	[ '79', 'G5' ],
	[ '78', 'Gb5' ],
	[ '77', 'F5' ],
	[ '76', 'E5' ],
	[ '75', 'Eb5' ],
	[ '74', 'D5' ],
	[ '73', 'Db5' ],
	[ '72', 'C5' ],
	[ '71', 'B5' ]
]);

class CSPiano extends Component {
	constructor(props) {
		super(props);

		this.state = {
			attack: 0.02,
			decay: 0.1,
			sustain: 0.2,
			release: 0.9
		};

		this.handleOnAttackChange = this.handleOnAttackChange.bind(this);

		const tremolo = new Tone.Tremolo(9, 0.2).toMaster().start();
		var pingPong = new Tone.PingPongDelay('4n', 0.2).toMaster();
		var phaser = new Tone.Phaser({
			frequency: 5,
			octaves: 1,
			baseFrequency: 1000
		}).toMaster();

		const vibrato = new Tone.Vibrato(5, 0.1).toMaster();
		const reverb = new Tone.Reverb(2).toMaster();
		var dist = new Tone.Distortion(1).toMaster();
		this.synth = new Tone.FMSynth({
			harmonicity: 8,
			modulationIndex: 1,
			detune: 0,
			oscillator: {
				type: 'sine'
			},
			envelope: {
				attack: 0.0001,
				decay: 0.001,
				sustain: 1,
				release: 3
			},
			modulation: {
				type: 'sawtooth'
			},
			modulationEnvelope: {
				attack: 0.0001,
				decay: 0.0001,
				sustain: 0.0001,
				release: 0.0001
			}
		})
			// .connect(pingPong)
			.connect(tremolo)
			// .connect(reverb)
			// .connect(phaser)
			// .connect(vibrato)
			.toMaster();
	}

	handleOnAttackChange(e, val) {
		this.setState((preState) => {
			return Object.assign(preState, {
				attack: val
			});
		});
	}

	render() {
		const firstNote = MidiNumbers.fromNote('c5');
		const lastNote = MidiNumbers.fromNote('c7');
		const keyboardShortcuts = KeyboardShortcuts.create({
			firstNote: firstNote,
			lastNote: lastNote,
			keyboardConfig: KeyboardShortcuts.HOME_ROW
		});

		return (
			<div className="cs-piano_wrapper">
				<Piano
					noteRange={{ first: firstNote, last: lastNote }}
					playNote={(midiNumber) => {
						// Play a given note - see notes below
						const note = midiToKeyMap.get(String(midiNumber));
						console.log(midiNumber, note);
						this.synth.triggerAttack(note, '4n');

						// this.synth.triggerAttack(midiNumber, '8n');
					}}
					stopNote={(midiNumber) => {
						// Stop playing a given note - see notes below
						console.log(midiNumber);
						this.synth.triggerRelease();
					}}
					width={1000}
					keyboardShortcuts={keyboardShortcuts}
				/>
				<div>
					<Typography id="discrete-slider" gutterBottom>
						Attack
					</Typography>

					<Slider
						className="cs-slider"
						defaultValue={this.state.attack}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="auto"
						onChange={this.handleOnAttackChange}
						step={0.01}
						marks
						min={0.01}
						max={1}
					/>
				</div>
			</div>
		);
	}
}

export default CSPiano;
