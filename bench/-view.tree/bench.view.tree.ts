namespace $ { export class $mol_bench extends $mol_grid {

	/// result null
	result() {
		return <any> null
	}

	/// result_sorted null
	result_sorted() {
		return <any> null
	}

	/// records <= result_sorted
	records() {
		return this.result_sorted()
	}

	/// col_sort?val \
	@ $mol_mem()
	col_sort( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// event_sort_toggle!id?val null
	@ $mol_mem_key()
	event_sort_toggle( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// col_head_label!id /
	col_head_label( id : any ) {
		return [] as any[]
	}

	/// Col_head_sort!id $mol_icon_sort_asc
	@ $mol_mem_key()
	Col_head_sort( id : any ) {
		return new $mol_icon_sort_asc()
	}

	/// col_head_content!id / 
	/// 	<= col_head_label!id 
	/// 	<= Col_head_sort!id
	col_head_content( id : any ) {
		return [].concat( this.col_head_label(id) , this.Col_head_sort(id) )
	}

	/// Col_head!id $mol_bench_head 
	/// 	event_click?val <=> event_sort_toggle!id?val 
	/// 	sub <= col_head_content!id
	@ $mol_mem_key()
	Col_head( id : any ) {
		return new $mol_bench_head().setup( obj => { 
			obj.event_click = ( val? : any ) => this.event_sort_toggle(id , val )
			obj.sub = () => this.col_head_content(id)
		} )
	}

	/// result_value!id \
	result_value( id : any ) {
		return ""
	}

	/// result_portion!id 0
	result_portion( id : any ) {
		return 0
	}

	/// Result_portion!id $mol_portion portion <= result_portion!id
	@ $mol_mem_key()
	Result_portion( id : any ) {
		return new $mol_portion().setup( obj => { 
			obj.portion = () => this.result_portion(id)
		} )
	}

	/// cell_content_number!id / 
	/// 	<= result_value!id 
	/// 	<= Result_portion!id
	cell_content_number( id : any ) {
		return [].concat( this.result_value(id) , this.Result_portion(id) )
	}

} }

namespace $ { export class $mol_bench_head extends $mol_float {

	/// event_click?val null
	@ $mol_mem()
	event_click( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event * 
	/// 	^ 
	/// 	click?val <=> event_click?val
	event() {
		return ({
			...super.event() ,
			"click" :  ( val? : any )=>  this.event_click( val ) ,
		})
	}

	/// hint @ \Click to sort by this column
	hint() {
		return $mol_locale.text( this.locale_contexts() , "hint" )
	}

	/// attr * 
	/// 	^ 
	/// 	title <= hint
	attr() {
		return ({
			...super.attr() ,
			"title" :  this.hint() ,
		})
	}

} }

