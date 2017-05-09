namespace $ { export class $mol_attach_demo extends $mol_view {

	/// title @ \Attach files an show them
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// empty_items?val /
	@ $mol_mem()
	empty_items( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [] as any[]
	}

	/// Empty $mol_attach items?val <=> empty_items?val
	@ $mol_mem()
	Empty() {
		return new $mol_attach().setup( obj => { 
			obj.items = ( val? : any ) => this.empty_items( val )
		} )
	}

	/// Item1 $mol_attach_item 
	/// 	url_thumb \logo/logo.svg
	/// 	url_load \logo/logo.svg
	@ $mol_mem()
	Item1() {
		return new $mol_attach_item().setup( obj => { 
			obj.url_thumb = () => "logo/logo.svg"
			obj.url_load = () => "logo/logo.svg"
		} )
	}

	/// Item2 $mol_attach_item 
	/// 	url_thumb \logo/logo.svg
	/// 	url_load \logo/logo.svg
	@ $mol_mem()
	Item2() {
		return new $mol_attach_item().setup( obj => { 
			obj.url_thumb = () => "logo/logo.svg"
			obj.url_load = () => "logo/logo.svg"
		} )
	}

	/// Item3 $mol_attach_item 
	/// 	url_thumb \logo/logo.svg
	/// 	url_load \logo/logo.svg
	@ $mol_mem()
	Item3() {
		return new $mol_attach_item().setup( obj => { 
			obj.url_thumb = () => "logo/logo.svg"
			obj.url_load = () => "logo/logo.svg"
		} )
	}

	/// filled_items?val / 
	/// 	<= Item1 
	/// 	<= Item2 
	/// 	<= Item3
	@ $mol_mem()
	filled_items( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [].concat( this.Item1() , this.Item2() , this.Item3() )
	}

	/// Filled $mol_attach items?val <=> filled_items?val
	@ $mol_mem()
	Filled() {
		return new $mol_attach().setup( obj => { 
			obj.items = ( val? : any ) => this.filled_items( val )
		} )
	}

	/// sub / 
	/// 	<= Empty 
	/// 	<= Filled
	sub() {
		return [].concat( this.Empty() , this.Filled() )
	}

} }

