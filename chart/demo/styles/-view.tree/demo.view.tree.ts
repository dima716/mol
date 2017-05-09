namespace $ { export class $mol_chart_demo_styles extends $mol_chart {

	/// title @ \Chart with various styles of graphs.
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// energy_title @ \kJ
	energy_title() {
		return $mol_locale.text( this.locale_contexts() , "energy_title" )
	}

	/// Energy $mol_plot_ruler_vert title <= energy_title
	@ $mol_mem()
	Energy() {
		return new $mol_plot_ruler_vert().setup( obj => { 
			obj.title = () => this.energy_title()
		} )
	}

	/// day_title @ \Day
	day_title() {
		return $mol_locale.text( this.locale_contexts() , "day_title" )
	}

	/// series_1 /
	series_1() {
		return [] as any[]
	}

	/// Day $mol_plot_ruler_hor 
	/// 	title <= day_title 
	/// 	series <= series_1
	@ $mol_mem()
	Day() {
		return new $mol_plot_ruler_hor().setup( obj => { 
			obj.title = () => this.day_title()
			obj.series = () => this.series_1()
		} )
	}

	/// receipts_title @ \Receipts
	receipts_title() {
		return $mol_locale.text( this.locale_contexts() , "receipts_title" )
	}

	/// series_2 /
	series_2() {
		return [] as any[]
	}

	/// Receipts $mol_plot_bar 
	/// 	title <= receipts_title 
	/// 	series <= series_2
	@ $mol_mem()
	Receipts() {
		return new $mol_plot_bar().setup( obj => { 
			obj.title = () => this.receipts_title()
			obj.series = () => this.series_2()
		} )
	}

	/// receipts_confirmed_title @ \Confirmed receipts
	receipts_confirmed_title() {
		return $mol_locale.text( this.locale_contexts() , "receipts_confirmed_title" )
	}

	/// series_3 /
	series_3() {
		return [] as any[]
	}

	/// Receipts_confirmed $mol_plot_bar 
	/// 	title <= receipts_confirmed_title 
	/// 	series <= series_3
	@ $mol_mem()
	Receipts_confirmed() {
		return new $mol_plot_bar().setup( obj => { 
			obj.title = () => this.receipts_confirmed_title()
			obj.series = () => this.series_3()
		} )
	}

	/// maximum_title @ \Maximum
	maximum_title() {
		return $mol_locale.text( this.locale_contexts() , "maximum_title" )
	}

	/// Maximum $mol_plot_dot 
	/// 	title <= maximum_title 
	/// 	series <= series_1
	@ $mol_mem()
	Maximum() {
		return new $mol_plot_dot().setup( obj => { 
			obj.title = () => this.maximum_title()
			obj.series = () => this.series_1()
		} )
	}

	/// waste_title @ \Waste
	waste_title() {
		return $mol_locale.text( this.locale_contexts() , "waste_title" )
	}

	/// series_4 /
	series_4() {
		return [] as any[]
	}

	/// Waste $mol_plot_line 
	/// 	type \dashed
	/// 	title <= waste_title 
	/// 	series <= series_4
	@ $mol_mem()
	Waste() {
		return new $mol_plot_line().setup( obj => { 
			obj.type = () => "dashed"
			obj.title = () => this.waste_title()
			obj.series = () => this.series_4()
		} )
	}

	/// purchases_title @ \Purchases
	purchases_title() {
		return $mol_locale.text( this.locale_contexts() , "purchases_title" )
	}

	/// series_5 /
	series_5() {
		return [] as any[]
	}

	/// Purchases_fill $mol_plot_fill
	@ $mol_mem()
	Purchases_fill() {
		return new $mol_plot_fill()
	}

	/// Purchases_line $mol_plot_line
	@ $mol_mem()
	Purchases_line() {
		return new $mol_plot_line()
	}

	/// Purchases_dots $mol_plot_dot
	@ $mol_mem()
	Purchases_dots() {
		return new $mol_plot_dot()
	}

	/// Purchases $mol_plot_group 
	/// 	title <= purchases_title 
	/// 	series <= series_5 
	/// 	graphs / 
	/// 		<= Purchases_fill 
	/// 		<= Purchases_line 
	/// 		<= Purchases_dots
	@ $mol_mem()
	Purchases() {
		return new $mol_plot_group().setup( obj => { 
			obj.title = () => this.purchases_title()
			obj.series = () => this.series_5()
			obj.graphs = () => [].concat( this.Purchases_fill() , this.Purchases_line() , this.Purchases_dots() )
		} )
	}

	/// taxes_title @ \Taxes
	taxes_title() {
		return $mol_locale.text( this.locale_contexts() , "taxes_title" )
	}

	/// series_6 /
	series_6() {
		return [] as any[]
	}

	/// Taxes_fill $mol_plot_fill
	@ $mol_mem()
	Taxes_fill() {
		return new $mol_plot_fill()
	}

	/// Taxes_line $mol_plot_line type \dashed
	@ $mol_mem()
	Taxes_line() {
		return new $mol_plot_line().setup( obj => { 
			obj.type = () => "dashed"
		} )
	}

	/// Taxes_dots $mol_plot_dot
	@ $mol_mem()
	Taxes_dots() {
		return new $mol_plot_dot()
	}

	/// Taxes $mol_plot_group 
	/// 	title <= taxes_title 
	/// 	series <= series_6 
	/// 	graphs / 
	/// 		<= Taxes_fill 
	/// 		<= Taxes_line 
	/// 		<= Taxes_dots
	@ $mol_mem()
	Taxes() {
		return new $mol_plot_group().setup( obj => { 
			obj.title = () => this.taxes_title()
			obj.series = () => this.series_6()
			obj.graphs = () => [].concat( this.Taxes_fill() , this.Taxes_line() , this.Taxes_dots() )
		} )
	}

	/// graphs / 
	/// 	<= Energy 
	/// 	<= Day 
	/// 	<= Receipts 
	/// 	<= Receipts_confirmed 
	/// 	<= Maximum 
	/// 	<= Waste 
	/// 	<= Purchases 
	/// 	<= Taxes
	graphs() {
		return [].concat( this.Energy() , this.Day() , this.Receipts() , this.Receipts_confirmed() , this.Maximum() , this.Waste() , this.Purchases() , this.Taxes() )
	}

	/// count?val 15
	@ $mol_mem()
	count( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 15
	}

	/// Count $mol_number value?val <=> count?val
	@ $mol_mem()
	Count() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.count( val )
		} )
	}

	/// sub / 
	/// 	<= Plot 
	/// 	<= Legend 
	/// 	<= Count
	sub() {
		return [].concat( this.Plot() , this.Legend() , this.Count() )
	}

} }

