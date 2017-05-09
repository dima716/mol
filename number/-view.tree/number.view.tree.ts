namespace $ { export class $mol_number extends $mol_bar {

	/// precision 1
	precision() {
		return 1
	}

	/// precision_view <= precision
	precision_view() {
		return this.precision()
	}

	/// precision_change <= precision
	precision_change() {
		return this.precision()
	}

	/// value?val null
	@ $mol_mem()
	value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event_wheel?val null
	@ $mol_mem()
	event_wheel( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event_async * 
	/// 	^ 
	/// 	wheel?val <=> event_wheel?val
	event_async() {
		return ({
			...super.event_async() ,
			"wheel" :  ( val? : any )=>  this.event_wheel( val ) ,
		})
	}

	/// event_dec?val null
	@ $mol_mem()
	event_dec( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// enabled true
	enabled() {
		return true
	}

	/// dec_enabled <= enabled
	dec_enabled() {
		return this.enabled()
	}

	/// dec_icon $mol_icon_minus
	@ $mol_mem()
	dec_icon() {
		return new $mol_icon_minus()
	}

	/// Dec $mol_button 
	/// 	event_click?val <=> event_dec?val 
	/// 	enabled <= dec_enabled 
	/// 	sub / <= dec_icon
	@ $mol_mem()
	Dec() {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( val? : any ) => this.event_dec( val )
			obj.enabled = () => this.dec_enabled()
			obj.sub = () => [].concat( this.dec_icon() )
		} )
	}

	/// value_string?val \
	@ $mol_mem()
	value_string( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// hint \
	hint() {
		return ""
	}

	/// string_enabled <= enabled
	string_enabled() {
		return this.enabled()
	}

	/// String $mol_string 
	/// 	type \number
	/// 	value?val <=> value_string?val 
	/// 	hint <= hint 
	/// 	enabled <= string_enabled
	@ $mol_mem()
	String() {
		return new $mol_string().setup( obj => { 
			obj.type = () => "number"
			obj.value = ( val? : any ) => this.value_string( val )
			obj.hint = () => this.hint()
			obj.enabled = () => this.string_enabled()
		} )
	}

	/// event_inc?val null
	@ $mol_mem()
	event_inc( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// inc_enabled <= enabled
	inc_enabled() {
		return this.enabled()
	}

	/// inc_icon $mol_icon_plus
	@ $mol_mem()
	inc_icon() {
		return new $mol_icon_plus()
	}

	/// Inc $mol_button 
	/// 	event_click?val <=> event_inc?val 
	/// 	enabled <= inc_enabled 
	/// 	sub / <= inc_icon
	@ $mol_mem()
	Inc() {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( val? : any ) => this.event_inc( val )
			obj.enabled = () => this.inc_enabled()
			obj.sub = () => [].concat( this.inc_icon() )
		} )
	}

	/// sub / 
	/// 	<= Dec 
	/// 	<= String 
	/// 	<= Inc
	sub() {
		return [].concat( this.Dec() , this.String() , this.Inc() )
	}

} }

