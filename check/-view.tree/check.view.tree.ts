namespace $ { export class $mol_check extends $mol_button {

	/// checked?val false
	@ $mol_mem()
	checked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// attr * 
	/// 	^ 
	/// 	mol_check_checked <= checked?val 
	/// 	aria-checked <= checked?val 
	/// 	role \checkbox
	attr() {
		return ({
			...super.attr() ,
			"mol_check_checked" :  this.checked() ,
			"aria-checked" :  this.checked() ,
			"role" :  "checkbox" ,
		})
	}

	/// Icon null
	Icon() {
		return <any> null
	}

	/// label /
	label() {
		return [] as any[]
	}

	/// Label $mol_view sub / <= label
	@ $mol_mem()
	Label() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.label() )
		} )
	}

	/// sub / 
	/// 	<= Icon 
	/// 	<= Label
	sub() {
		return [].concat( this.Icon() , this.Label() )
	}

} }

