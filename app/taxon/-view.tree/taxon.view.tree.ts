namespace $ { export class $mol_app_taxon extends $mol_page {

	/// title @ \Big hierarchical table demo
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// hierarchy null
	hierarchy() {
		return <any> null
	}

	/// hierarchy_field \Butxt
	hierarchy_field() {
		return "Butxt"
	}

	/// record!id null
	record( id : any ) {
		return <any> null
	}

	/// Grid $mol_grid 
	/// 	hierarchy <= hierarchy 
	/// 	hierarchy_col <= hierarchy_field 
	/// 	record!id <= record!id
	@ $mol_mem()
	Grid() {
		return new $mol_grid().setup( obj => { 
			obj.hierarchy = () => this.hierarchy()
			obj.hierarchy_col = () => this.hierarchy_field()
			obj.record = ( id : any ) => this.record(id)
		} )
	}

	/// Body <= Grid
	Body() {
		return this.Grid()
	}

} }

