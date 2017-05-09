namespace $ { export class $mol_number_demo extends $mol_row {

	/// title @ \Number input control with various configuration
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// zero $mol_number
	@ $mol_mem()
	zero() {
		return new $mol_number()
	}

	/// year?val null
	@ $mol_mem()
	year( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// one $mol_number value?val <=> year?val
	@ $mol_mem()
	one() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
		} )
	}

	/// two $mol_number 
	/// 	value?val <=> year?val 
	/// 	hint \2016
	@ $mol_mem()
	two() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
			obj.hint = () => "2016"
		} )
	}

	/// age?val 32
	@ $mol_mem()
	age( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 32
	}

	/// three $mol_number 
	/// 	value?val <=> age?val 
	/// 	hint \18-99
	/// 	enabled false
	@ $mol_mem()
	three() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.age( val )
			obj.hint = () => "18-99"
			obj.enabled = () => false
		} )
	}

	/// four $mol_number 
	/// 	value?val <=> year?val 
	/// 	string_enabled false
	@ $mol_mem()
	four() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
			obj.string_enabled = () => false
		} )
	}

	/// five $mol_number 
	/// 	value?val <=> age?val 
	/// 	dec_enabled false
	@ $mol_mem()
	five() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.age( val )
			obj.dec_enabled = () => false
		} )
	}

	/// six $mol_number 
	/// 	value?val <=> year?val 
	/// 	inc_enabled false
	@ $mol_mem()
	six() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
			obj.inc_enabled = () => false
		} )
	}

	/// seven $mol_number 
	/// 	value?val <=> year?val 
	/// 	precision_change 10
	@ $mol_mem()
	seven() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
			obj.precision_change = () => 10
		} )
	}

	/// eight $mol_number 
	/// 	value?val <=> year?val 
	/// 	precision_view 0.01
	@ $mol_mem()
	eight() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
			obj.precision_view = () => 0.01
		} )
	}

	/// nine $mol_number 
	/// 	value?val <=> year?val 
	/// 	precision 1000
	@ $mol_mem()
	nine() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.year( val )
			obj.precision = () => 1000
		} )
	}

	/// sub / 
	/// 	<= zero 
	/// 	<= one 
	/// 	<= two 
	/// 	<= three 
	/// 	<= four 
	/// 	<= five 
	/// 	<= six 
	/// 	<= seven 
	/// 	<= eight 
	/// 	<= nine
	sub() {
		return [].concat( this.zero() , this.one() , this.two() , this.three() , this.four() , this.five() , this.six() , this.seven() , this.eight() , this.nine() )
	}

} }

