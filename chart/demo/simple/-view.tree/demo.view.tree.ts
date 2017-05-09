namespace $ { export class $mol_chart_demo_simple extends $mol_chart {

	/// title @ \Simple chart with hadcoded series
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// vert_title @ \pcs
	vert_title() {
		return $mol_locale.text( this.locale_contexts() , "vert_title" )
	}

	/// Vert_ruler $mol_plot_ruler_vert title <= vert_title
	@ $mol_mem()
	Vert_ruler() {
		return new $mol_plot_ruler_vert().setup( obj => { 
			obj.title = () => this.vert_title()
		} )
	}

	/// hor_title @ \Month
	hor_title() {
		return $mol_locale.text( this.locale_contexts() , "hor_title" )
	}

	/// hor_label_text!key \
	hor_label_text( key : any ) {
		return ""
	}

	/// Hor_ruler $mol_plot_ruler_hor 
	/// 	title <= hor_title 
	/// 	series <= plan 
	/// 	label_text!key <= hor_label_text!key
	@ $mol_mem()
	Hor_ruler() {
		return new $mol_plot_ruler_hor().setup( obj => { 
			obj.title = () => this.hor_title()
			obj.series = () => this.plan()
			obj.label_text = ( key : any ) => this.hor_label_text(key)
		} )
	}

	/// plan_title @ \Plan
	plan_title() {
		return $mol_locale.text( this.locale_contexts() , "plan_title" )
	}

	/// plan * 
	/// 	january 10 
	/// 	february 20 
	/// 	march 30 
	/// 	april 40
	plan() {
		return ({
			"january" :  10 ,
			"february" :  20 ,
			"march" :  30 ,
			"april" :  40 ,
		})
	}

	/// Plan $mol_plot_bar 
	/// 	title <= plan_title 
	/// 	series <= plan
	@ $mol_mem()
	Plan() {
		return new $mol_plot_bar().setup( obj => { 
			obj.title = () => this.plan_title()
			obj.series = () => this.plan()
		} )
	}

	/// fact_title @ \Fact
	fact_title() {
		return $mol_locale.text( this.locale_contexts() , "fact_title" )
	}

	/// fact * 
	/// 	january 5 
	/// 	february 10 
	/// 	march 30
	fact() {
		return ({
			"january" :  5 ,
			"february" :  10 ,
			"march" :  30 ,
		})
	}

	/// Fact_line $mol_plot_line
	@ $mol_mem()
	Fact_line() {
		return new $mol_plot_line()
	}

	/// Fact_dots $mol_plot_dot
	@ $mol_mem()
	Fact_dots() {
		return new $mol_plot_dot()
	}

	/// Fact $mol_plot_group 
	/// 	title <= fact_title 
	/// 	series <= fact 
	/// 	graphs / 
	/// 		<= Fact_line 
	/// 		<= Fact_dots
	@ $mol_mem()
	Fact() {
		return new $mol_plot_group().setup( obj => { 
			obj.title = () => this.fact_title()
			obj.series = () => this.fact()
			obj.graphs = () => [].concat( this.Fact_line() , this.Fact_dots() )
		} )
	}

	/// graphs / 
	/// 	<= Vert_ruler 
	/// 	<= Hor_ruler 
	/// 	<= Plan 
	/// 	<= Fact
	graphs() {
		return [].concat( this.Vert_ruler() , this.Hor_ruler() , this.Plan() , this.Fact() )
	}

} }

