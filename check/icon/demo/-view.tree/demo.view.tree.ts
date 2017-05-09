namespace $ { export class $mol_check_icon_demo extends $mol_row {

	/// title @ \Iconic checkboxes in various states
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Base_icon $mol_icon_microphone
	@ $mol_mem()
	Base_icon() {
		return new $mol_icon_microphone()
	}

	/// base_checked?val false
	@ $mol_mem()
	base_checked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// Base $mol_check_icon 
	/// 	Icon <= Base_icon 
	/// 	checked?val <=> base_checked?val
	@ $mol_mem()
	Base() {
		return new $mol_check_icon().setup( obj => { 
			obj.Icon = () => this.Base_icon()
			obj.checked = ( val? : any ) => this.base_checked( val )
		} )
	}

	/// Checked_icon $mol_icon_microphone
	@ $mol_mem()
	Checked_icon() {
		return new $mol_icon_microphone()
	}

	/// checked_checked?val true
	@ $mol_mem()
	checked_checked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/// Checked $mol_check_icon 
	/// 	Icon <= Checked_icon 
	/// 	checked?val <=> checked_checked?val
	@ $mol_mem()
	Checked() {
		return new $mol_check_icon().setup( obj => { 
			obj.Icon = () => this.Checked_icon()
			obj.checked = ( val? : any ) => this.checked_checked( val )
		} )
	}

	/// Disabled_icon $mol_icon_microphone
	@ $mol_mem()
	Disabled_icon() {
		return new $mol_icon_microphone()
	}

	/// Disabled $mol_check_box 
	/// 	Icon <= Disabled_icon 
	/// 	checked true 
	/// 	enabled false
	@ $mol_mem()
	Disabled() {
		return new $mol_check_box().setup( obj => { 
			obj.Icon = () => this.Disabled_icon()
			obj.checked = () => true
			obj.enabled = () => false
		} )
	}

	/// sub / 
	/// 	<= Base 
	/// 	- 
	/// 	<= Checked 
	/// 	- 
	/// 	<= Disabled
	sub() {
		return [].concat( this.Base() , this.Checked() , this.Disabled() )
	}

} }

