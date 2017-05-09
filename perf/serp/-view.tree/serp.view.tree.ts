namespace $ { export class $mol_perf_serp extends $mol_view {

	/// size_target 25
	size_target() {
		return 25
	}

	/// elapsed?val 0
	@ $mol_mem()
	elapsed( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// transform \
	transform() {
		return ""
	}

	/// style * transform <= transform
	style() {
		return ({
			"transform" :  this.transform() ,
		})
	}

	/// left!id 0
	left( id : any ) {
		return 0
	}

	/// top!id 0
	top( id : any ) {
		return 0
	}

	/// size!id 25
	size( id : any ) {
		return 25
	}

	/// text \
	text() {
		return ""
	}

	/// Dot!id $mol_perf_serp_dot 
	/// 	left <= left!id 
	/// 	top <= top!id 
	/// 	size <= size!id 
	/// 	text <= text
	@ $mol_mem_key()
	Dot( id : any ) {
		return new $mol_perf_serp_dot().setup( obj => { 
			obj.left = () => this.left(id)
			obj.top = () => this.top(id)
			obj.size = () => this.size(id)
			obj.text = () => this.text()
		} )
	}

} }

namespace $ { export class $mol_perf_serp_dot extends $mol_view {

	/// size 25
	size() {
		return 25
	}

	/// hover?val false
	@ $mol_mem()
	hover( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// text \
	text() {
		return ""
	}

	/// sub / <= text
	sub() {
		return [].concat( this.text() )
	}

	/// width <= size
	width() {
		return this.size()
	}

	/// height <= size
	height() {
		return this.size()
	}

	/// left 0
	left() {
		return 0
	}

	/// top 0
	top() {
		return 0
	}

	/// radius <= size
	radius() {
		return this.size()
	}

	/// color \
	color() {
		return ""
	}

	/// style * 
	/// 	width <= width 
	/// 	height <= height 
	/// 	left <= left 
	/// 	top <= top 
	/// 	borderRadius <= radius 
	/// 	lineHeight <= height 
	/// 	background <= color
	style() {
		return ({
			"width" :  this.width() ,
			"height" :  this.height() ,
			"left" :  this.left() ,
			"top" :  this.top() ,
			"borderRadius" :  this.radius() ,
			"lineHeight" :  this.height() ,
			"background" :  this.color() ,
		})
	}

	/// enter?val null
	@ $mol_mem()
	enter( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// leave?val null
	@ $mol_mem()
	leave( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event * 
	/// 	mouseenter?val <=> enter?val 
	/// 	mouseleave?val <=> leave?val
	event() {
		return ({
			"mouseenter" :  ( val? : any )=>  this.enter( val ) ,
			"mouseleave" :  ( val? : any )=>  this.leave( val ) ,
		})
	}

} }

