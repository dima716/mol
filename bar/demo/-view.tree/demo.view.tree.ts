namespace $ { export class $mol_bar_demo extends $mol_row {

	/// title @ \Group of controls as one control
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// value?val \
	@ $mol_mem()
	value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Two_mail $mol_string 
	/// 	hint \E-mail
	/// 	value?val <=> value?val
	@ $mol_mem()
	Two_mail() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => "E-mail"
			obj.value = ( val? : any ) => this.value( val )
		} )
	}

	/// Two_submit $mol_button sub / \submit
	@ $mol_mem()
	Two_submit() {
		return new $mol_button().setup( obj => { 
			obj.sub = () => [].concat( "submit" )
		} )
	}

	/// Two $mol_bar sub / 
	/// 	<= Two_mail 
	/// 	<= Two_submit
	@ $mol_mem()
	Two() {
		return new $mol_bar().setup( obj => { 
			obj.sub = () => [].concat( this.Two_mail() , this.Two_submit() )
		} )
	}

	/// Three_mail $mol_string 
	/// 	hint \E-mail
	/// 	value?val <=> value?val
	@ $mol_mem()
	Three_mail() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => "E-mail"
			obj.value = ( val? : any ) => this.value( val )
		} )
	}

	/// Three_confirm $mol_check_box label / \Confirm
	@ $mol_mem()
	Three_confirm() {
		return new $mol_check_box().setup( obj => { 
			obj.label = () => [].concat( "Confirm" )
		} )
	}

	/// Three_submit $mol_button sub / \submit
	@ $mol_mem()
	Three_submit() {
		return new $mol_button().setup( obj => { 
			obj.sub = () => [].concat( "submit" )
		} )
	}

	/// Tree $mol_bar sub / 
	/// 	<= Three_mail 
	/// 	<= Three_confirm 
	/// 	<= Three_submit
	@ $mol_mem()
	Tree() {
		return new $mol_bar().setup( obj => { 
			obj.sub = () => [].concat( this.Three_mail() , this.Three_confirm() , this.Three_submit() )
		} )
	}

	/// sub / 
	/// 	<= Two 
	/// 	<= Tree
	sub() {
		return [].concat( this.Two() , this.Tree() )
	}

} }

