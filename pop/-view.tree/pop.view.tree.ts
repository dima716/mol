namespace $ { export class $mol_pop extends $mol_view {

	/// showed?val false
	@ $mol_mem()
	showed( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// Anchor null
	Anchor() {
		return <any> null
	}

	/// align \bottom_center
	align() {
		return "bottom_center"
	}

	/// bubble_content /
	bubble_content() {
		return [] as any[]
	}

	/// height_max 9999
	height_max() {
		return 9999
	}

	/// Bubble $mol_pop_tip 
	/// 	align <= align 
	/// 	content <= bubble_content 
	/// 	height_max <= height_max
	@ $mol_mem()
	Bubble() {
		return new $mol_pop_tip().setup( obj => { 
			obj.align = () => this.align()
			obj.content = () => this.bubble_content()
			obj.height_max = () => this.height_max()
		} )
	}

	/// sub / 
	/// 	<= Anchor 
	/// 	<= Bubble
	sub() {
		return [].concat( this.Anchor() , this.Bubble() )
	}

} }

namespace $ { export class $mol_pop_tip extends $mol_scroll {

	/// content /
	content() {
		return [] as any[]
	}

	/// sub <= content
	sub() {
		return this.content()
	}

	/// height_max 9999
	height_max() {
		return 9999
	}

	/// style * 
	/// 	^ 
	/// 	maxHeight <= height_max
	style() {
		return ({
			...super.style() ,
			"maxHeight" :  this.height_max() ,
		})
	}

	/// align \
	align() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	mol_pop_align <= align
	attr() {
		return ({
			...super.attr() ,
			"mol_pop_align" :  this.align() ,
		})
	}

} }

