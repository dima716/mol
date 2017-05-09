namespace $ { export class $mol_status extends $mol_view {

	/// status null
	status() {
		return <any> null
	}

	/// message \
	message() {
		return ""
	}

	/// sub / <= message
	sub() {
		return [].concat( this.message() )
	}

} }

