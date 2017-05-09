namespace $ { export class $mol_deck extends $mol_list {

	/// items /
	items() {
		return [] as any[]
	}

	/// current?val \0
	@ $mol_mem()
	current( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "0"
	}

	/// switch_options *
	switch_options() {
		return ({
		})
	}

	/// Switch $mol_switch 
	/// 	value?val <=> current?val 
	/// 	options <= switch_options
	@ $mol_mem()
	Switch() {
		return new $mol_switch().setup( obj => { 
			obj.value = ( val? : any ) => this.current( val )
			obj.options = () => this.switch_options()
		} )
	}

	/// Content null
	Content() {
		return <any> null
	}

	/// rows / 
	/// 	<= Switch 
	/// 	<= Content
	rows() {
		return [].concat( this.Switch() , this.Content() )
	}

} }

namespace $ { export class $mol_deck_item extends $mol_object {

	/// title \
	title() {
		return ""
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

} }

