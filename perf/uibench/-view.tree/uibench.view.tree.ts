namespace $ { export class $mol_perf_uibench extends $mol_scroll {

	/// page null
	page() {
		return <any> null
	}

	/// sub / <= page
	sub() {
		return [].concat( this.page() )
	}

	/// stateTable null
	stateTable() {
		return <any> null
	}

	/// table $mol_perf_uibench_table state <= stateTable
	@ $mol_mem()
	table() {
		return new $mol_perf_uibench_table().setup( obj => { 
			obj.state = () => this.stateTable()
		} )
	}

	/// stateAnim null
	stateAnim() {
		return <any> null
	}

	/// anim $mol_perf_uibench_anim state <= stateAnim
	@ $mol_mem()
	anim() {
		return new $mol_perf_uibench_anim().setup( obj => { 
			obj.state = () => this.stateAnim()
		} )
	}

	/// stateTree null
	stateTree() {
		return <any> null
	}

	/// tree $mol_perf_uibench_tree state <= stateTree
	@ $mol_mem()
	tree() {
		return new $mol_perf_uibench_tree().setup( obj => { 
			obj.state = () => this.stateTree()
		} )
	}

} }

namespace $ { export class $mol_perf_uibench_table extends $mol_list {

	/// state null
	state() {
		return <any> null
	}

	/// dom_name \table
	dom_name() {
		return "table"
	}

	/// attr * 
	/// 	^ 
	/// 	class \Table
	attr() {
		return ({
			...super.attr() ,
			"class" :  "Table" ,
		})
	}

} }

namespace $ { export class $mol_perf_uibench_table_row extends $mol_view {

	/// state null
	state() {
		return <any> null
	}

	/// minimal_height 18
	minimal_height() {
		return 18
	}

	/// dom_name \tr
	dom_name() {
		return "tr"
	}

	/// className \TableRow
	className() {
		return "TableRow"
	}

	/// id 0
	id() {
		return 0
	}

	/// attr * 
	/// 	^ 
	/// 	class <= className 
	/// 	data-id <= id
	attr() {
		return ({
			...super.attr() ,
			"class" :  this.className() ,
			"data-id" :  this.id() ,
		})
	}

	/// headerText \
	headerText() {
		return ""
	}

	/// header $mol_perf_uibench_table_cell text <= headerText
	@ $mol_mem()
	header() {
		return new $mol_perf_uibench_table_cell().setup( obj => { 
			obj.text = () => this.headerText()
		} )
	}

	/// cells /
	cells() {
		return [] as any[]
	}

	/// sub / 
	/// 	<= header 
	/// 	<= cells
	sub() {
		return [].concat( this.header() , this.cells() )
	}

} }

namespace $ { export class $mol_perf_uibench_table_cell extends $mol_view {

	/// dom_name \td
	dom_name() {
		return "td"
	}

	/// text \
	text() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	class \TableCell
	/// 	data-text <= text
	attr() {
		return ({
			...super.attr() ,
			"class" :  "TableCell" ,
			"data-text" :  this.text() ,
		})
	}

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

	/// sub / <= text
	sub() {
		return [].concat( this.text() )
	}

} }

namespace $ { export class $mol_perf_uibench_anim extends $mol_view {

	/// state null
	state() {
		return <any> null
	}

	/// attr * 
	/// 	^ 
	/// 	class \Anim
	attr() {
		return ({
			...super.attr() ,
			"class" :  "Anim" ,
		})
	}

	/// items /
	items() {
		return [] as any[]
	}

	/// sub <= items
	sub() {
		return this.items()
	}

} }

namespace $ { export class $mol_perf_uibench_anim_box extends $mol_view {

	/// id \
	id() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	class \AnimBox
	/// 	data-id <= id
	attr() {
		return ({
			...super.attr() ,
			"class" :  "AnimBox" ,
			"data-id" :  this.id() ,
		})
	}

	/// styleRadius \
	styleRadius() {
		return ""
	}

	/// styleColor \
	styleColor() {
		return ""
	}

	/// style * 
	/// 	^ 
	/// 	borderRadius <= styleRadius 
	/// 	background <= styleColor
	style() {
		return ({
			...super.style() ,
			"borderRadius" :  this.styleRadius() ,
			"background" :  this.styleColor() ,
		})
	}

	/// items /
	items() {
		return [] as any[]
	}

	/// sub <= items
	sub() {
		return this.items()
	}

} }

namespace $ { export class $mol_perf_uibench_tree extends $mol_view {

	/// state null
	state() {
		return <any> null
	}

	/// attr * 
	/// 	^ 
	/// 	class \Tree
	attr() {
		return ({
			...super.attr() ,
			"class" :  "Tree" ,
		})
	}

	/// stateRoot null
	stateRoot() {
		return <any> null
	}

	/// root $mol_perf_uibench_tree_branch state <= stateRoot
	@ $mol_mem()
	root() {
		return new $mol_perf_uibench_tree_branch().setup( obj => { 
			obj.state = () => this.stateRoot()
		} )
	}

	/// sub / <= root
	sub() {
		return [].concat( this.root() )
	}

} }

namespace $ { export class $mol_perf_uibench_tree_branch extends $mol_list {

	/// state null
	state() {
		return <any> null
	}

	/// dom_name \ul
	dom_name() {
		return "ul"
	}

	/// attr * 
	/// 	^ 
	/// 	class \TreeNode
	attr() {
		return ({
			...super.attr() ,
			"class" :  "TreeNode" ,
		})
	}

} }

namespace $ { export class $mol_perf_uibench_tree_leaf extends $mol_view {

	/// minimal_height 23
	minimal_height() {
		return 23
	}

	/// dom_name \li
	dom_name() {
		return "li"
	}

	/// attr * 
	/// 	^ 
	/// 	class \TreeLeaf
	attr() {
		return ({
			...super.attr() ,
			"class" :  "TreeLeaf" ,
		})
	}

	/// text \
	text() {
		return ""
	}

	/// sub / <= text
	sub() {
		return [].concat( this.text() )
	}

} }

