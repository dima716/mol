namespace $ { export class $mol_grid extends $mol_scroll {

	/// row_ids /
	row_ids() {
		return [] as any[]
	}

	/// row_id!index null
	row_id( index : any ) {
		return <any> null
	}

	/// col_ids /
	col_ids() {
		return [] as any[]
	}

	/// records *
	records() {
		return ({
		})
	}

	/// record!id null
	record( id : any ) {
		return <any> null
	}

	/// hierarchy null
	hierarchy() {
		return <any> null
	}

	/// hierarchy_col \
	hierarchy_col() {
		return ""
	}

	/// gap_top 0
	gap_top() {
		return 0
	}

	/// rows_visible /
	rows_visible() {
		return [] as any[]
	}

	/// Table $mol_grid_table 
	/// 	offset <= gap_top 
	/// 	sub / <= rows_visible
	@ $mol_mem()
	Table() {
		return new $mol_grid_table().setup( obj => { 
			obj.offset = () => this.gap_top()
			obj.sub = () => [].concat( this.rows_visible() )
		} )
	}

	/// height 0
	height() {
		return 0
	}

	/// Gap $mol_grid_gap offset <= height
	@ $mol_mem()
	Gap() {
		return new $mol_grid_gap().setup( obj => { 
			obj.offset = () => this.height()
		} )
	}

	/// sub / 
	/// 	<= Table 
	/// 	<= Gap
	sub() {
		return [].concat( this.Table() , this.Gap() )
	}

	/// rows /
	rows() {
		return [] as any[]
	}

	/// row_height 40
	row_height() {
		return 40
	}

	/// head_cells /
	head_cells() {
		return [] as any[]
	}

	/// Head $mol_grid_row 
	/// 	height <= row_height 
	/// 	cells <= head_cells
	@ $mol_mem()
	Head() {
		return new $mol_grid_row().setup( obj => { 
			obj.height = () => this.row_height()
			obj.cells = () => this.head_cells()
		} )
	}

	/// cells!id /
	cells( id : any ) {
		return [] as any[]
	}

	/// Row!id $mol_grid_row 
	/// 	height <= row_height 
	/// 	cells <= cells!id
	@ $mol_mem_key()
	Row( id : any ) {
		return new $mol_grid_row().setup( obj => { 
			obj.height = () => this.row_height()
			obj.cells = () => this.cells(id)
		} )
	}

	/// cell!id null
	cell( id : any ) {
		return <any> null
	}

	/// cell_content!id /
	cell_content( id : any ) {
		return [] as any[]
	}

	/// cell_content_text!id <= cell_content!id
	cell_content_text( id : any ) {
		return this.cell_content(id)
	}

	/// Cell_text!id $mol_grid_cell sub / <= cell_content_text!id
	@ $mol_mem_key()
	Cell_text( id : any ) {
		return new $mol_grid_cell().setup( obj => { 
			obj.sub = () => [].concat( this.cell_content_text(id) )
		} )
	}

	/// cell_content_number!id <= cell_content!id
	cell_content_number( id : any ) {
		return this.cell_content(id)
	}

	/// Cell_number!id $mol_grid_number sub / <= cell_content_number!id
	@ $mol_mem_key()
	Cell_number( id : any ) {
		return new $mol_grid_number().setup( obj => { 
			obj.sub = () => [].concat( this.cell_content_number(id) )
		} )
	}

	/// col_head_content!id /
	col_head_content( id : any ) {
		return [] as any[]
	}

	/// Col_head!id $mol_float sub / <= col_head_content!id
	@ $mol_mem_key()
	Col_head( id : any ) {
		return new $mol_float().setup( obj => { 
			obj.sub = () => [].concat( this.col_head_content(id) )
		} )
	}

	/// cell_level!id 0
	cell_level( id : any ) {
		return 0
	}

	/// cell_expanded!id?val false
	@ $mol_mem_key()
	cell_expanded( id : any , val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// Cell_branch!id $mol_check_expand 
	/// 	level <= cell_level!id 
	/// 	label <= cell_content!id 
	/// 	expanded?val <=> cell_expanded!id?val
	@ $mol_mem_key()
	Cell_branch( id : any ) {
		return new $mol_check_expand().setup( obj => { 
			obj.level = () => this.cell_level(id)
			obj.label = () => this.cell_content(id)
			obj.expanded = ( val? : any ) => this.cell_expanded(id , val )
		} )
	}

	/// needle \
	needle() {
		return ""
	}

	/// cell_value!id \
	cell_value( id : any ) {
		return ""
	}

	/// Cell_dimmer!id $mol_dimmer 
	/// 	needle <= needle 
	/// 	haystack <= cell_value!id
	@ $mol_mem_key()
	Cell_dimmer( id : any ) {
		return new $mol_dimmer().setup( obj => { 
			obj.needle = () => this.needle()
			obj.haystack = () => this.cell_value(id)
		} )
	}

	/// Cell_content!id / <= Cell_dimmer!id
	Cell_content( id : any ) {
		return [].concat( this.Cell_dimmer(id) )
	}

} }

namespace $ { export class $mol_grid_table extends $mol_view {

	/// dom_name \table
	dom_name() {
		return "table"
	}

	/// offset 0
	offset() {
		return 0
	}

	/// style * 
	/// 	^ 
	/// 	top <= offset
	style() {
		return ({
			...super.style() ,
			"top" :  this.offset() ,
		})
	}

} }

namespace $ { export class $mol_grid_gap extends $mol_view {

	/// offset 0
	offset() {
		return 0
	}

	/// style * 
	/// 	^ 
	/// 	top <= offset
	style() {
		return ({
			...super.style() ,
			"top" :  this.offset() ,
		})
	}

} }

namespace $ { export class $mol_grid_row extends $mol_view {

	/// dom_name \tr
	dom_name() {
		return "tr"
	}

	/// height 40
	height() {
		return 40
	}

	/// style * 
	/// 	^ 
	/// 	height <= height
	style() {
		return ({
			...super.style() ,
			"height" :  this.height() ,
		})
	}

	/// cells /
	cells() {
		return [] as any[]
	}

	/// sub <= cells
	sub() {
		return this.cells()
	}

} }

namespace $ { export class $mol_grid_cell extends $mol_view {

	/// dom_name \td
	dom_name() {
		return "td"
	}

} }

namespace $ { export class $mol_grid_number extends $mol_grid_cell {

} }

