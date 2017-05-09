namespace $ { export class $mol_chart extends $mol_view {

	/// graphs /
	graphs() {
		return [] as any[]
	}

	/// hue_base 140
	hue_base() {
		return 140
	}

	/// hue_shift 111
	hue_shift() {
		return 111
	}

	/// Plot $mol_plot_pane 
	/// 	graphs <= graphs 
	/// 	gap_hor 48 
	/// 	gap_vert 24 
	/// 	hue_base?val <= hue_base 
	/// 	hue_shift?val <= hue_shift
	@ $mol_mem()
	Plot() {
		return new $mol_plot_pane().setup( obj => { 
			obj.graphs = () => this.graphs()
			obj.gap_hor = () => 48
			obj.gap_vert = () => 24
			obj.hue_base = ( val? : any ) => this.hue_base()
			obj.hue_shift = ( val? : any ) => this.hue_shift()
		} )
	}

	/// Legend $mol_chart_legend graphs <= graphs
	@ $mol_mem()
	Legend() {
		return new $mol_chart_legend().setup( obj => { 
			obj.graphs = () => this.graphs()
		} )
	}

	/// sub / 
	/// 	<= Plot 
	/// 	<= Legend
	sub() {
		return [].concat( this.Plot() , this.Legend() )
	}

} }

