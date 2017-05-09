namespace $ { export class $mol_chart_legend extends $mol_scroll {

	/// graphs /
	graphs() {
		return [] as any[]
	}

	/// graph_legends /
	graph_legends() {
		return [] as any[]
	}

	/// sub <= graph_legends
	sub() {
		return this.graph_legends()
	}

	/// Graph_sample!id null
	Graph_sample( id : any ) {
		return <any> null
	}

	/// graph_title!id \
	graph_title( id : any ) {
		return ""
	}

	/// Graph_title!id $mol_view sub / <= graph_title!id
	@ $mol_mem_key()
	Graph_title( id : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.graph_title(id) )
		} )
	}

	/// Graph_legend!id $mol_view sub / 
	/// 	<= Graph_sample!id 
	/// 	<= Graph_title!id
	@ $mol_mem_key()
	Graph_legend( id : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Graph_sample(id) , this.Graph_title(id) )
		} )
	}

} }

