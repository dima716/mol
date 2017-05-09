namespace $ { export class $mol_app_supplies_list extends $mol_page {

	/// supplies /
	supplies() {
		return [] as any[]
	}

	/// title @ \Supplies
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// search_hint @ \Search by bar code
	search_hint() {
		return $mol_locale.text( this.locale_contexts() , "search_hint" )
	}

	/// search_query?val \
	@ $mol_mem()
	search_query( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Search $mol_code 
	/// 	hint <= search_hint 
	/// 	value?val <=> search_query?val
	@ $mol_mem()
	Search() {
		return new $mol_code().setup( obj => { 
			obj.hint = () => this.search_hint()
			obj.value = ( val? : any ) => this.search_query( val )
		} )
	}

	/// tools / <= Search
	tools() {
		return [].concat( this.Search() )
	}

	/// supply_rows /
	supply_rows() {
		return [] as any[]
	}

	/// Supply_rows $mol_list rows <= supply_rows
	@ $mol_mem()
	Supply_rows() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.supply_rows()
		} )
	}

	/// body / <= Supply_rows
	body() {
		return [].concat( this.Supply_rows() )
	}

} }

