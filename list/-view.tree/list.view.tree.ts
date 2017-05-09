namespace $ { export class $mol_list extends $mol_view {

	/// style * 
	/// 	^ 
	/// 	minHeight <= minimal_height
	style() {
		return ({
			...super.style() ,
			"minHeight" :  this.minimal_height() ,
		})
	}

	/// rows /
	rows() {
		return [] as any[]
	}

	/// sub <= rows
	sub() {
		return this.rows()
	}

	/// Empty null
	Empty() {
		return <any> null
	}

} }

