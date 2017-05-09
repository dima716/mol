namespace $ { export class $mol_expander extends $mol_list {

	/// expanded?val false
	@ $mol_mem()
	expanded( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// label / <= title
	label() {
		return [].concat( this.title() )
	}

	/// Label $mol_check_expand 
	/// 	minimal_height 40 
	/// 	checked?val <=> expanded?val 
	/// 	label <= label
	@ $mol_mem()
	Label() {
		return new $mol_check_expand().setup( obj => { 
			obj.minimal_height = () => 40
			obj.checked = ( val? : any ) => this.expanded( val )
			obj.label = () => this.label()
		} )
	}

	/// content /
	content() {
		return [] as any[]
	}

	/// Content $mol_view sub <= content
	@ $mol_mem()
	Content() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.content()
		} )
	}

	/// rows / 
	/// 	<= Label 
	/// 	<= Content
	rows() {
		return [].concat( this.Label() , this.Content() )
	}

} }

