namespace $ { export class $mol_app_bench_list_mol extends $mol_scroll {

	/// sample \
	sample() {
		return ""
	}

	/// Head $mol_view sub / <= sample
	@ $mol_mem()
	Head() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.sample() )
		} )
	}

	/// rows /
	rows() {
		return [] as any[]
	}

	/// List $mol_list rows / 
	/// 	<= Head 
	/// 	<= rows
	@ $mol_mem()
	List() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => [].concat( this.Head() , this.rows() )
		} )
	}

	/// sub / <= List
	sub() {
		return [].concat( this.List() )
	}

	/// row_selected!id?val false
	@ $mol_mem_key()
	row_selected( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// row_title!id \
	row_title( id : any ) {
		return ""
	}

	/// row_content!id \
	row_content( id : any ) {
		return ""
	}

	/// Row!id $mol_app_bench_list_mol_row 
	/// 	checked?val <=> row_selected!id?val 
	/// 	title <= row_title!id 
	/// 	content <= row_content!id
	@ $mol_mem_key()
	Row( id : any ) {
		return new $mol_app_bench_list_mol_row().setup( obj => { 
			obj.checked = ( val? : any ) => this.row_selected(id , val )
			obj.title = () => this.row_title(id)
			obj.content = () => this.row_content(id)
		} )
	}

} }

namespace $ { export class $mol_app_bench_list_mol_row extends $mol_check {

	/// selected?val false
	@ $mol_mem()
	selected( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// minimal_height 56
	minimal_height() {
		return 56
	}

	/// title \
	title() {
		return ""
	}

	/// Title $mol_view sub / <= title
	@ $mol_mem()
	Title() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.title() )
		} )
	}

	/// content \
	content() {
		return ""
	}

	/// Content $mol_view sub / <= content
	@ $mol_mem()
	Content() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.content() )
		} )
	}

	/// sub / 
	/// 	<= Title 
	/// 	<= Content
	sub() {
		return [].concat( this.Title() , this.Content() )
	}

} }

