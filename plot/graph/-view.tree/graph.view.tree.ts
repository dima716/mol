namespace $ { export class $mol_plot_graph extends $mol_svg_group {

	/// series *
	series() {
		return ({
		})
	}

	/// points_raw /
	points_raw() {
		return [] as any[]
	}

	/// points_scaled <= points_raw
	points_scaled() {
		return this.points_raw()
	}

	/// points <= points_scaled
	points() {
		return this.points_scaled()
	}

	/// threshold 4
	threshold() {
		return 4
	}

	/// shift / 
	/// 	0 
	/// 	0
	shift() {
		return [].concat( 0 , 0 )
	}

	/// scale / 
	/// 	1 
	/// 	1
	scale() {
		return [].concat( 1 , 1 )
	}

	/// dimensions / 
	/// 	/ 
	/// 	/
	dimensions() {
		return [].concat( [] as any[] , [] as any[] )
	}

	/// dimensions_expanded <= dimensions
	dimensions_expanded() {
		return this.dimensions()
	}

	/// hue 0
	hue() {
		return 0
	}

	/// type \solid
	type() {
		return "solid"
	}

	/// attr * 
	/// 	^ 
	/// 	mol_plot_graph_type <= type
	attr() {
		return ({
			...super.attr() ,
			"mol_plot_graph_type" :  this.type() ,
		})
	}

	/// color \black
	color() {
		return "black"
	}

	/// style * 
	/// 	^ 
	/// 	color <= color
	style() {
		return ({
			...super.style() ,
			"color" :  this.color() ,
		})
	}

	/// Sample null
	Sample() {
		return <any> null
	}

	/// front /
	front() {
		return [] as any[]
	}

	/// back /
	back() {
		return [] as any[]
	}

} }

namespace $ { export class $mol_plot_graph_sample extends $mol_view {

	/// type \solid
	type() {
		return "solid"
	}

	/// attr * 
	/// 	^ 
	/// 	mol_plot_graph_type <= type
	attr() {
		return ({
			...super.attr() ,
			"mol_plot_graph_type" :  this.type() ,
		})
	}

	/// color \black
	color() {
		return "black"
	}

	/// style * 
	/// 	^ 
	/// 	color <= color
	style() {
		return ({
			...super.style() ,
			"color" :  this.color() ,
		})
	}

} }

