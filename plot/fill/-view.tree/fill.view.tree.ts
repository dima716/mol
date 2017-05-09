namespace $ { export class $mol_plot_fill extends $mol_plot_graph {

	/// front /
	front() {
		return [] as any[]
	}

	/// curve \
	curve() {
		return ""
	}

	/// Curve $mol_svg_path geometry <= curve
	@ $mol_mem()
	Curve() {
		return new $mol_svg_path().setup( obj => { 
			obj.geometry = () => this.curve()
		} )
	}

	/// sub / <= Curve
	sub() {
		return [].concat( this.Curve() )
	}

	/// Sample $mol_plot_graph_sample color <= color
	@ $mol_mem()
	Sample() {
		return new $mol_plot_graph_sample().setup( obj => { 
			obj.color = () => this.color()
		} )
	}

} }

