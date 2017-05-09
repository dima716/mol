namespace $ { export class $mol_svg extends $mol_view {

	/// dom_name \svg
	dom_name() {
		return "svg"
	}

	/// dom_name_space \http://www.w3.org/2000/svg
	dom_name_space() {
		return "http://www.w3.org/2000/svg"
	}

} }

namespace $ { export class $mol_svg_root extends $mol_svg {

	/// dom_name \svg
	dom_name() {
		return "svg"
	}

	/// view_box \0 0 100 100
	view_box() {
		return "0 0 100 100"
	}

	/// aspect \
	aspect() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	viewBox <= view_box 
	/// 	preserveAspectRatio <= aspect
	attr() {
		return ({
			...super.attr() ,
			"viewBox" :  this.view_box() ,
			"preserveAspectRatio" :  this.aspect() ,
		})
	}

} }

namespace $ { export class $mol_svg_group extends $mol_svg {

	/// dom_name \g
	dom_name() {
		return "g"
	}

} }

namespace $ { export class $mol_svg_line extends $mol_svg {

	/// dom_name \line
	dom_name() {
		return "line"
	}

	/// from /
	from() {
		return [] as any[]
	}

	/// to /
	to() {
		return [] as any[]
	}

	/// pos / 
	/// 	<= from 
	/// 	<= to
	pos() {
		return [].concat( this.from() , this.to() )
	}

	/// from_x \
	from_x() {
		return ""
	}

	/// from_y \
	from_y() {
		return ""
	}

	/// to_x \
	to_x() {
		return ""
	}

	/// to_y \
	to_y() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	x1 <= from_x 
	/// 	y1 <= from_y 
	/// 	x2 <= to_x 
	/// 	y2 <= to_y
	attr() {
		return ({
			...super.attr() ,
			"x1" :  this.from_x() ,
			"y1" :  this.from_y() ,
			"x2" :  this.to_x() ,
			"y2" :  this.to_y() ,
		})
	}

} }

namespace $ { export class $mol_svg_path extends $mol_svg {

	/// dom_name \path
	dom_name() {
		return "path"
	}

	/// geometry \
	geometry() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	d <= geometry
	attr() {
		return ({
			...super.attr() ,
			"d" :  this.geometry() ,
		})
	}

} }

namespace $ { export class $mol_svg_circle extends $mol_svg {

	/// dom_name \circle
	dom_name() {
		return "circle"
	}

	/// pos /
	pos() {
		return [] as any[]
	}

	/// radius \.5%
	radius() {
		return ".5%"
	}

	/// pos_x \
	pos_x() {
		return ""
	}

	/// pos_y \
	pos_y() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	r <= radius 
	/// 	cx <= pos_x 
	/// 	cy <= pos_y
	attr() {
		return ({
			...super.attr() ,
			"r" :  this.radius() ,
			"cx" :  this.pos_x() ,
			"cy" :  this.pos_y() ,
		})
	}

} }

namespace $ { export class $mol_svg_text extends $mol_svg {

	/// dom_name \text
	dom_name() {
		return "text"
	}

	/// pos /
	pos() {
		return [] as any[]
	}

	/// pos_x \
	pos_x() {
		return ""
	}

	/// pos_y \
	pos_y() {
		return ""
	}

	/// align \middle
	align() {
		return "middle"
	}

	/// attr * 
	/// 	^ 
	/// 	x <= pos_x 
	/// 	y <= pos_y 
	/// 	text-anchor <= align
	attr() {
		return ({
			...super.attr() ,
			"x" :  this.pos_x() ,
			"y" :  this.pos_y() ,
			"text-anchor" :  this.align() ,
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

