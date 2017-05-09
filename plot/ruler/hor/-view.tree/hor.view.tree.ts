namespace $ { export class $mol_plot_ruler_hor extends $mol_plot_graph {

	/// front /
	front() {
		return [] as any[]
	}

	/// color null
	color() {
		return <any> null
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

	/// labels /
	labels() {
		return [] as any[]
	}

	/// title_pos_x \0
	title_pos_x() {
		return "0"
	}

	/// title_pos_y \100%
	title_pos_y() {
		return "100%"
	}

	/// title_pos / 
	/// 	<= title_pos_x 
	/// 	<= title_pos_y
	title_pos() {
		return [].concat( this.title_pos_x() , this.title_pos_y() )
	}

	/// Title $mol_svg_text 
	/// 	pos <= title_pos 
	/// 	align \start
	/// 	sub / <= title
	@ $mol_mem()
	Title() {
		return new $mol_svg_text().setup( obj => { 
			obj.pos = () => this.title_pos()
			obj.align = () => "start"
			obj.sub = () => [].concat( this.title() )
		} )
	}

	/// sub / 
	/// 	<= Curve 
	/// 	<= labels 
	/// 	<= Title
	sub() {
		return [].concat( this.Curve() , this.labels() , this.Title() )
	}

	/// label_pos_x!index \
	label_pos_x( index : any ) {
		return ""
	}

	/// label_pos_y!index <= title_pos_y
	label_pos_y( index : any ) {
		return this.title_pos_y()
	}

	/// label_pos!index / 
	/// 	<= label_pos_x!index 
	/// 	<= label_pos_y!index
	label_pos( index : any ) {
		return [].concat( this.label_pos_x(index) , this.label_pos_y(index) )
	}

	/// label_text!index \
	label_text( index : any ) {
		return ""
	}

	/// Label!index $mol_svg_text 
	/// 	pos <= label_pos!index 
	/// 	text <= label_text!index
	@ $mol_mem_key()
	Label( index : any ) {
		return new $mol_svg_text().setup( obj => { 
			obj.pos = () => this.label_pos(index)
			obj.text = () => this.label_text(index)
		} )
	}

} }

