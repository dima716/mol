namespace $ { export class $mol_plot_ruler_vert extends $mol_plot_graph {

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

	/// title_pos_x \36px
	title_pos_x() {
		return "36px"
	}

	/// title_pos_y \14px
	title_pos_y() {
		return "14px"
	}

	/// title_pos / 
	/// 	<= title_pos_x 
	/// 	<= title_pos_y
	title_pos() {
		return [].concat( this.title_pos_x() , this.title_pos_y() )
	}

	/// Title $mol_svg_text 
	/// 	pos <= title_pos 
	/// 	align \end
	/// 	sub / <= title
	@ $mol_mem()
	Title() {
		return new $mol_svg_text().setup( obj => { 
			obj.pos = () => this.title_pos()
			obj.align = () => "end"
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

	/// label_pos_x!index <= title_pos_x
	label_pos_x( index : any ) {
		return this.title_pos_x()
	}

	/// label_pos_y!index \
	label_pos_y( index : any ) {
		return ""
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
	/// 	align \end
	/// 	text <= label_text!index
	@ $mol_mem_key()
	Label( index : any ) {
		return new $mol_svg_text().setup( obj => { 
			obj.pos = () => this.label_pos(index)
			obj.align = () => "end"
			obj.text = () => this.label_text(index)
		} )
	}

} }

