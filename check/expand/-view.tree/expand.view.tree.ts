namespace $ { export class $mol_check_expand extends $mol_check {

	/// Icon $mol_icon_chevron
	@ $mol_mem()
	Icon() {
		return new $mol_icon_chevron()
	}

	/// sub / 
	/// 	<= Icon 
	/// 	<= Label
	sub() {
		return [].concat( this.Icon() , this.Label() )
	}

	/// level 0
	level() {
		return 0
	}

	/// level_style \0px
	level_style() {
		return "0px"
	}

	/// style * 
	/// 	^ 
	/// 	paddingLeft <= level_style
	style() {
		return ({
			...super.style() ,
			"paddingLeft" :  this.level_style() ,
		})
	}

	/// expanded?val false
	@ $mol_mem()
	expanded( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// checked?val <=> expanded?val
	@ $mol_mem()
	checked( val? : any , force? : $mol_atom_force ) {
		return this.expanded( val )
	}

	/// expandable false
	expandable() {
		return false
	}

	/// enabled <= expandable
	enabled() {
		return this.expandable()
	}

} }

