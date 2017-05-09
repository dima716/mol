namespace $ { export class $mol_search extends $mol_bar {

	/// query?val \
	@ $mol_mem()
	query( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// suggest_selected?val \
	@ $mol_mem()
	suggest_selected( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// hint \Search...
	hint() {
		return "Search..."
	}

	/// suggests_showed false
	suggests_showed() {
		return false
	}

	/// suggests /
	suggests() {
		return [] as any[]
	}

	/// Suggest $mol_search_suggest 
	/// 	value?val <=> suggest_selected?val 
	/// 	filter_hint <= hint 
	/// 	filter_pattern?val <=> query?val 
	/// 	options_showed <= suggests_showed 
	/// 	options <= suggests
	@ $mol_mem()
	Suggest() {
		return new $mol_search_suggest().setup( obj => { 
			obj.value = ( val? : any ) => this.suggest_selected( val )
			obj.filter_hint = () => this.hint()
			obj.filter_pattern = ( val? : any ) => this.query( val )
			obj.options_showed = () => this.suggests_showed()
			obj.options = () => this.suggests()
		} )
	}

	/// Clear_icon $mol_icon_cross
	@ $mol_mem()
	Clear_icon() {
		return new $mol_icon_cross()
	}

	/// event_clear?val null
	@ $mol_mem()
	event_clear( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Clear $mol_button_minor 
	/// 	sub / <= Clear_icon 
	/// 	event_click?val <=> event_clear?val
	@ $mol_mem()
	Clear() {
		return new $mol_button_minor().setup( obj => { 
			obj.sub = () => [].concat( this.Clear_icon() )
			obj.event_click = ( val? : any ) => this.event_clear( val )
		} )
	}

	/// sub / 
	/// 	<= Suggest 
	/// 	<= Clear
	sub() {
		return [].concat( this.Suggest() , this.Clear() )
	}

} }

namespace $ { export class $mol_search_suggest extends $mol_select {

	/// trigger_content <= filter_content
	trigger_content() {
		return this.filter_content()
	}

	/// bubble_content <= option_rows
	bubble_content() {
		return this.option_rows()
	}

	/// clearable false
	clearable() {
		return false
	}

} }

