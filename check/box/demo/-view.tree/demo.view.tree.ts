namespace $ { export class $mol_check_box_demo extends $mol_row {

	/// title @ \Checkboxes in various states
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// base_checked?val false
	@ $mol_mem()
	base_checked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// c1Label @ \Base
	c1Label() {
		return $mol_locale.text( this.locale_contexts() , "c1Label" )
	}

	/// Labeled_base $mol_check_box 
	/// 	checked?val <=> base_checked?val 
	/// 	label / <= c1Label
	@ $mol_mem()
	Labeled_base() {
		return new $mol_check_box().setup( obj => { 
			obj.checked = ( val? : any ) => this.base_checked( val )
			obj.label = () => [].concat( this.c1Label() )
		} )
	}

	/// c2Label @ \Checked
	c2Label() {
		return $mol_locale.text( this.locale_contexts() , "c2Label" )
	}

	/// checked_checked?val true
	@ $mol_mem()
	checked_checked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/// Labeled_checked $mol_check_box 
	/// 	label / <= c2Label 
	/// 	checked?val <=> checked_checked?val
	@ $mol_mem()
	Labeled_checked() {
		return new $mol_check_box().setup( obj => { 
			obj.label = () => [].concat( this.c2Label() )
			obj.checked = ( val? : any ) => this.checked_checked( val )
		} )
	}

	/// c6Label @ \Disabled
	c6Label() {
		return $mol_locale.text( this.locale_contexts() , "c6Label" )
	}

	/// Labeled_disabled $mol_check_box 
	/// 	label / <= c6Label 
	/// 	checked true 
	/// 	enabled false
	@ $mol_mem()
	Labeled_disabled() {
		return new $mol_check_box().setup( obj => { 
			obj.label = () => [].concat( this.c6Label() )
			obj.checked = () => true
			obj.enabled = () => false
		} )
	}

	/// Alone_base $mol_check_box checked?val <=> base_checked?val
	@ $mol_mem()
	Alone_base() {
		return new $mol_check_box().setup( obj => { 
			obj.checked = ( val? : any ) => this.base_checked( val )
		} )
	}

	/// Alone_checked $mol_check_box checked?val <=> checked_checked?val
	@ $mol_mem()
	Alone_checked() {
		return new $mol_check_box().setup( obj => { 
			obj.checked = ( val? : any ) => this.checked_checked( val )
		} )
	}

	/// Alone_disabled $mol_check_box 
	/// 	checked true 
	/// 	enabled false
	@ $mol_mem()
	Alone_disabled() {
		return new $mol_check_box().setup( obj => { 
			obj.checked = () => true
			obj.enabled = () => false
		} )
	}

	/// sub / 
	/// 	<= Labeled_base 
	/// 	- 
	/// 	<= Labeled_checked 
	/// 	- 
	/// 	<= Labeled_disabled 
	/// 	- 
	/// 	<= Alone_base 
	/// 	- 
	/// 	<= Alone_checked 
	/// 	- 
	/// 	<= Alone_disabled
	sub() {
		return [].concat( this.Labeled_base() , this.Labeled_checked() , this.Labeled_disabled() , this.Alone_base() , this.Alone_checked() , this.Alone_disabled() )
	}

} }

