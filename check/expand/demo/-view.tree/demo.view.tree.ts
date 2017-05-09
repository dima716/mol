namespace $ { export class $mol_check_expand_demo extends $mol_row {

	/// title @ \Checkbox-expand in various states
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// base_expanded?val false
	@ $mol_mem()
	base_expanded( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// c1Label @ \Base
	c1Label() {
		return $mol_locale.text( this.locale_contexts() , "c1Label" )
	}

	/// Labeled_base $mol_check_expand 
	/// 	checked?val <=> base_expanded?val 
	/// 	label / <= c1Label
	@ $mol_mem()
	Labeled_base() {
		return new $mol_check_expand().setup( obj => { 
			obj.checked = ( val? : any ) => this.base_expanded( val )
			obj.label = () => [].concat( this.c1Label() )
		} )
	}

	/// c2Label @ \Expanded
	c2Label() {
		return $mol_locale.text( this.locale_contexts() , "c2Label" )
	}

	/// expanded_expanded?val true
	@ $mol_mem()
	expanded_expanded( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/// Labeled_expanded $mol_check_expand 
	/// 	label / <= c2Label 
	/// 	checked?val <=> expanded_expanded?val
	@ $mol_mem()
	Labeled_expanded() {
		return new $mol_check_expand().setup( obj => { 
			obj.label = () => [].concat( this.c2Label() )
			obj.checked = ( val? : any ) => this.expanded_expanded( val )
		} )
	}

	/// Empty_base $mol_check_expand checked?val <=> base_expanded?val
	@ $mol_mem()
	Empty_base() {
		return new $mol_check_expand().setup( obj => { 
			obj.checked = ( val? : any ) => this.base_expanded( val )
		} )
	}

	/// Empty_expanded $mol_check_expand checked?val <=> expanded_expanded?val
	@ $mol_mem()
	Empty_expanded() {
		return new $mol_check_expand().setup( obj => { 
			obj.checked = ( val? : any ) => this.expanded_expanded( val )
		} )
	}

	/// c5Label @ \Non expandable
	c5Label() {
		return $mol_locale.text( this.locale_contexts() , "c5Label" )
	}

	/// Disabled $mol_check_expand 
	/// 	label / <= c5Label 
	/// 	disabled true
	@ $mol_mem()
	Disabled() {
		return new $mol_check_expand().setup( obj => { 
			obj.label = () => [].concat( this.c5Label() )
			obj.disabled = () => true
		} )
	}

	/// sub / 
	/// 	<= Labeled_base 
	/// 	- 
	/// 	<= Labeled_expanded 
	/// 	- 
	/// 	<= Empty_base 
	/// 	- 
	/// 	<= Empty_expanded 
	/// 	- 
	/// 	<= Disabled
	sub() {
		return [].concat( this.Labeled_base() , this.Labeled_expanded() , this.Empty_base() , this.Empty_expanded() , this.Disabled() )
	}

} }

