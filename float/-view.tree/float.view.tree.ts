namespace $ { export class $mol_float extends $mol_view {

	/// shiftStyle \
	shiftStyle() {
		return ""
	}

	/// style * 
	/// 	^ 
	/// 	transform <= shiftStyle
	style() {
		return ({
			...super.style() ,
			"transform" :  this.shiftStyle() ,
		})
	}

	/// scrolling false
	scrolling() {
		return false
	}

	/// attr * 
	/// 	^ 
	/// 	mol_float_scrolling <= scrolling
	attr() {
		return ({
			...super.attr() ,
			"mol_float_scrolling" :  this.scrolling() ,
		})
	}

} }

