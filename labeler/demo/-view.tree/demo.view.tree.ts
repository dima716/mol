namespace $ { export class $mol_labeler_demo extends $mol_row {

	/// title @ \Labeled content of some types
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Provider $mol_labeler 
	/// 	title \Provider
	/// 	content \ACME Provider Inc.
	@ $mol_mem()
	Provider() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => "Provider"
			obj.content = () => "ACME Provider Inc."
		} )
	}

	/// user_name?val \
	@ $mol_mem()
	user_name( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Name_control $mol_string 
	/// 	hint \Jack Sparrow
	/// 	value?val <=> user_name?val
	@ $mol_mem()
	Name_control() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => "Jack Sparrow"
			obj.value = ( val? : any ) => this.user_name( val )
		} )
	}

	/// Name $mol_labeler 
	/// 	title \User name
	/// 	Content <= Name_control
	@ $mol_mem()
	Name() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => "User name"
			obj.Content = () => this.Name_control()
		} )
	}

	/// sub / 
	/// 	<= Provider 
	/// 	<= Name
	sub() {
		return [].concat( this.Provider() , this.Name() )
	}

} }

