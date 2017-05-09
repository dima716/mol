namespace $ { export class $mol_app_supplies_root extends $mol_book {

	/// entered?val false
	@ $mol_mem()
	entered( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// enter $mol_app_supplies_enter entered?val <=> entered?val
	@ $mol_mem()
	enter() {
		return new $mol_app_supplies_enter().setup( obj => { 
			obj.entered = ( val? : any ) => this.entered( val )
		} )
	}

	/// supplies /
	supplies() {
		return [] as any[]
	}

	/// search_query?val \
	@ $mol_mem()
	search_query( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// lister $mol_app_supplies_list 
	/// 	minimal_width 400 
	/// 	supplies <= supplies 
	/// 	search_query?val <=> search_query?val
	@ $mol_mem()
	lister() {
		return new $mol_app_supplies_list().setup( obj => { 
			obj.minimal_width = () => 400
			obj.supplies = () => this.supplies()
			obj.search_query = ( val? : any ) => this.search_query( val )
		} )
	}

	/// supply null
	supply() {
		return <any> null
	}

	/// detailer $mol_app_supplies_detail 
	/// 	minimal_width 400 
	/// 	supply <= supply
	@ $mol_mem()
	detailer() {
		return new $mol_app_supplies_detail().setup( obj => { 
			obj.minimal_width = () => 400
			obj.supply = () => this.supply()
		} )
	}

	/// placeholder $mol_book_placeholder title <= title
	@ $mol_mem()
	placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.title = () => this.title()
		} )
	}

} }

