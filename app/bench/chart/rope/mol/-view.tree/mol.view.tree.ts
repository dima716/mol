namespace $ { export class $mol_app_bench_chart_rope_mol extends $mol_view {

	/// Vert $mol_plot_ruler_vert title \Val
	@ $mol_mem()
	Vert() {
		return new $mol_plot_ruler_vert().setup( obj => { 
			obj.title = () => "Val"
		} )
	}

	/// hor_series /
	hor_series() {
		return [] as any[]
	}

	/// Hor $mol_plot_ruler_hor 
	/// 	title \Iter
	/// 	series <= hor_series
	@ $mol_mem()
	Hor() {
		return new $mol_plot_ruler_hor().setup( obj => { 
			obj.title = () => "Iter"
			obj.series = () => this.hor_series()
		} )
	}

	/// graphs /
	graphs() {
		return [] as any[]
	}

	/// Chart $mol_chart graphs / 
	/// 	<= Vert 
	/// 	<= Hor 
	/// 	<= graphs
	@ $mol_mem()
	Chart() {
		return new $mol_chart().setup( obj => { 
			obj.graphs = () => [].concat( this.Vert() , this.Hor() , this.graphs() )
		} )
	}

	/// sub / <= Chart
	sub() {
		return [].concat( this.Chart() )
	}

	/// graph_title!id \
	graph_title( id : any ) {
		return ""
	}

	/// series!id /
	series( id : any ) {
		return [] as any[]
	}

	/// Line!id $mol_plot_line
	@ $mol_mem_key()
	Line( id : any ) {
		return new $mol_plot_line()
	}

	/// Dots!id $mol_plot_dot
	@ $mol_mem_key()
	Dots( id : any ) {
		return new $mol_plot_dot()
	}

	/// Graph!id $mol_plot_group 
	/// 	title <= graph_title!id 
	/// 	series <= series!id 
	/// 	graphs / 
	/// 		<= Line!id 
	/// 		<= Dots!id
	@ $mol_mem_key()
	Graph( id : any ) {
		return new $mol_plot_group().setup( obj => { 
			obj.title = () => this.graph_title(id)
			obj.series = () => this.series(id)
			obj.graphs = () => [].concat( this.Line(id) , this.Dots(id) )
		} )
	}

} }

