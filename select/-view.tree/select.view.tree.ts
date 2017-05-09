namespace $ { export class $mol_select extends $mol_view {

	/// dictionary *
	dictionary() {
		return ({
		})
	}

	/// options /
	options() {
		return [] as any[]
	}

	/// value?val \
	@ $mol_mem()
	value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// searchable true
	searchable() {
		return true
	}

	/// search_breakpoint 7
	search_breakpoint() {
		return 7
	}

	/// clearable true
	clearable() {
		return true
	}

	/// event_select!id?event null
	@ $mol_mem_key()
	event_select( id : any , event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// option_label!id \
	option_label( id : any ) {
		return ""
	}

	/// filter_pattern?val \
	@ $mol_mem()
	filter_pattern( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Option_label!id $mol_dimmer 
	/// 	minimal_height 40 
	/// 	haystack <= option_label!id 
	/// 	needle <= filter_pattern?val
	@ $mol_mem_key()
	Option_label( id : any ) {
		return new $mol_dimmer().setup( obj => { 
			obj.minimal_height = () => 40
			obj.haystack = () => this.option_label(id)
			obj.needle = () => this.filter_pattern()
		} )
	}

	/// option_content!id / <= Option_label!id
	option_content( id : any ) {
		return [].concat( this.Option_label(id) )
	}

	/// option_content_super!id <= option_content!id
	option_content_super( id : any ) {
		return this.option_content(id)
	}

	/// Option_row!id $mol_button 
	/// 	event_click?event <=> event_select!id?event 
	/// 	sub <= option_content_super!id
	@ $mol_mem_key()
	Option_row( id : any ) {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( event? : any ) => this.event_select(id , event )
			obj.sub = () => this.option_content_super(id)
		} )
	}

	/// no_options_message @ \No options
	no_options_message() {
		return $mol_locale.text( this.locale_contexts() , "no_options_message" )
	}

	/// No_options $mol_view sub / <= no_options_message
	@ $mol_mem()
	No_options() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.no_options_message() )
		} )
	}

	/// clear_option_message @ \Clear
	clear_option_message() {
		return $mol_locale.text( this.locale_contexts() , "clear_option_message" )
	}

	/// Clear_icon $mol_icon_cross
	@ $mol_mem()
	Clear_icon() {
		return new $mol_icon_cross()
	}

	/// clear_option_content / 
	/// 	<= clear_option_message 
	/// 	<= Clear_icon
	clear_option_content() {
		return [].concat( this.clear_option_message() , this.Clear_icon() )
	}

	/// Сlear_option_content $mol_view sub <= clear_option_content
	@ $mol_mem()
	Сlear_option_content() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.clear_option_content()
		} )
	}

	/// nav_components / 
	/// 	<= Filter_string 
	/// 	<= option_rows
	nav_components() {
		return [].concat( this.Filter_string() , this.option_rows() )
	}

	/// option_focused?key \
	@ $mol_mem()
	option_focused( key? : any , force? : $mol_atom_force ) {
		return ( key !== void 0 ) ? key : ""
	}

	/// nav_cycle?val true
	@ $mol_mem()
	nav_cycle( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : true
	}

	/// Nav $mol_nav 
	/// 	keys_y <= nav_components 
	/// 	current_y?key <=> option_focused?key 
	/// 	cycle?val <=> nav_cycle?val
	@ $mol_mem()
	Nav() {
		return new $mol_nav().setup( obj => { 
			obj.keys_y = () => this.nav_components()
			obj.current_y = ( key? : any ) => this.option_focused( key )
			obj.cycle = ( val? : any ) => this.nav_cycle( val )
		} )
	}

	/// plugins / <= Nav
	plugins() {
		return [].concat( this.Nav() )
	}

	/// options_showed?val false
	@ $mol_mem()
	options_showed( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// options_align?val \bottom_right
	@ $mol_mem()
	options_align( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "bottom_right"
	}

	/// event_showed_toggle?event null
	@ $mol_mem()
	event_showed_toggle( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// Trigger_icon $mol_icon_chevron
	@ $mol_mem()
	Trigger_icon() {
		return new $mol_icon_chevron()
	}

	/// value_content /
	value_content() {
		return [] as any[]
	}

	/// trigger_content / 
	/// 	<= Trigger_icon 
	/// 	<= value_content
	trigger_content() {
		return [].concat( this.Trigger_icon() , this.value_content() )
	}

	/// Trigger $mol_button 
	/// 	event_click?event <=> event_showed_toggle?event 
	/// 	sub <= trigger_content
	@ $mol_mem()
	Trigger() {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( event? : any ) => this.event_showed_toggle( event )
			obj.sub = () => this.trigger_content()
		} )
	}

	/// filter_hint @ \Filter
	filter_hint() {
		return $mol_locale.text( this.locale_contexts() , "filter_hint" )
	}

	/// Filter_string $mol_string 
	/// 	value?val <=> filter_pattern?val 
	/// 	hint <= filter_hint
	@ $mol_mem()
	Filter_string() {
		return new $mol_string().setup( obj => { 
			obj.value = ( val? : any ) => this.filter_pattern( val )
			obj.hint = () => this.filter_hint()
		} )
	}

	/// filter_content / <= Filter_string
	filter_content() {
		return [].concat( this.Filter_string() )
	}

	/// option_rows /
	option_rows() {
		return [] as any[]
	}

	/// bubble_content / 
	/// 	<= filter_content 
	/// 	<= option_rows
	bubble_content() {
		return [].concat( this.filter_content() , this.option_rows() )
	}

	/// Bubble_content $mol_list rows <= bubble_content
	@ $mol_mem()
	Bubble_content() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.bubble_content()
		} )
	}

	/// Pop $mol_pop 
	/// 	showed?val <=> options_showed?val 
	/// 	align?val <=> options_align?val 
	/// 	Anchor <= Trigger 
	/// 	bubble_content / <= Bubble_content
	@ $mol_mem()
	Pop() {
		return new $mol_pop().setup( obj => { 
			obj.showed = ( val? : any ) => this.options_showed( val )
			obj.align = ( val? : any ) => this.options_align( val )
			obj.Anchor = () => this.Trigger()
			obj.bubble_content = () => [].concat( this.Bubble_content() )
		} )
	}

	/// sub / <= Pop
	sub() {
		return [].concat( this.Pop() )
	}

} }

