namespace $ { export class $mol_code extends $mol_view {

	/// value?val \
	@ $mol_mem()
	value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// format \
	format() {
		return ""
	}

	/// hint <= format
	hint() {
		return this.format()
	}

	/// Manual $mol_search 
	/// 	query?val <=> value?val 
	/// 	hint <= hint
	@ $mol_mem()
	Manual() {
		return new $mol_search().setup( obj => { 
			obj.query = ( val? : any ) => this.value( val )
			obj.hint = () => this.hint()
		} )
	}

	/// event_scan?val null
	@ $mol_mem()
	event_scan( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// scan_label @ \Scan
	scan_label() {
		return $mol_locale.text( this.locale_contexts() , "scan_label" )
	}

	/// Scan $mol_button 
	/// 	event_click?val <=> event_scan?val 
	/// 	sub / <= scan_label
	@ $mol_mem()
	Scan() {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( val? : any ) => this.event_scan( val )
			obj.sub = () => [].concat( this.scan_label() )
		} )
	}

	/// sub / 
	/// 	<= Manual 
	/// 	<= Scan
	sub() {
		return [].concat( this.Manual() , this.Scan() )
	}

} }

