namespace $ { export class $mol_speech_demo extends $mol_view {

	/// Toggle_icon $mol_icon_microphone
	@ $mol_mem()
	Toggle_icon() {
		return new $mol_icon_microphone()
	}

	/// listening?val false
	@ $mol_mem()
	listening( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// Toggle $mol_check_icon 
	/// 	Icon <= Toggle_icon 
	/// 	checked?val <=> listening?val
	@ $mol_mem()
	Toggle() {
		return new $mol_check_icon().setup( obj => { 
			obj.Icon = () => this.Toggle_icon()
			obj.checked = ( val? : any ) => this.listening( val )
		} )
	}

	/// message \
	message() {
		return ""
	}

	/// Message $mol_view sub / <= message
	@ $mol_mem()
	Message() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.message() )
		} )
	}

	/// sub / 
	/// 	<= Toggle 
	/// 	<= Message
	sub() {
		return [].concat( this.Toggle() , this.Message() )
	}

} }

