namespace $ { export class $mol_row extends $mol_view {

	/// style * 
	/// 	^ 
	/// 	minHeight <= minimal_height
	style() {
		return ({
			...super.style() ,
			"minHeight" :  this.minimal_height() ,
		})
	}

} }

namespace $ { export class $mol_row_sub extends $mol_view {

} }

