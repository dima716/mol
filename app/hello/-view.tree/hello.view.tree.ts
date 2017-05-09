namespace $ { export class $mol_app_hello extends $mol_view {

	/// name_hint \Name
	name_hint() {
		return "Name"
	}

	/// name?val \
	@ $mol_mem()
	name( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Name $mol_string 
	/// 	hint <= name_hint 
	/// 	value?val <=> name?val
	@ $mol_mem()
	Name() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.name_hint()
			obj.value = ( val? : any ) => this.name( val )
		} )
	}

	/// greeting \
	greeting() {
		return ""
	}

	/// Greeting $mol_view sub / <= greeting
	@ $mol_mem()
	Greeting() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.greeting() )
		} )
	}

	/// sub / 
	/// 	<= Name 
	/// 	<= Greeting
	sub() {
		return [].concat( this.Name() , this.Greeting() )
	}

} }

