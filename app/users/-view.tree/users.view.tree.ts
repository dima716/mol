namespace $ { export class $mol_app_users extends $mol_page {

	/// filter_hint @ \Search users on GitHub
	filter_hint() {
		return $mol_locale.text( this.locale_contexts() , "filter_hint" )
	}

	/// query?val \
	@ $mol_mem()
	query( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Filter $mol_string 
	/// 	hint <= filter_hint 
	/// 	value?val <=> query?val
	@ $mol_mem()
	Filter() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.filter_hint()
			obj.value = ( val? : any ) => this.query( val )
		} )
	}

	/// Head_row $mol_row sub / <= Filter
	@ $mol_mem()
	Head_row() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Filter() )
		} )
	}

	/// head / <= Head_row
	head() {
		return [].concat( this.Head_row() )
	}

	/// user_rows /
	user_rows() {
		return [] as any[]
	}

	/// List $mol_list rows <= user_rows
	@ $mol_mem()
	List() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.user_rows()
		} )
	}

	/// body / <= List
	body() {
		return [].concat( this.List() )
	}

	/// reload_label @ \Reload
	reload_label() {
		return $mol_locale.text( this.locale_contexts() , "reload_label" )
	}

	/// event_reload?val null
	@ $mol_mem()
	event_reload( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Reload $mol_button_minor 
	/// 	sub / <= reload_label 
	/// 	event_click?val <=> event_reload?val
	@ $mol_mem()
	Reload() {
		return new $mol_button_minor().setup( obj => { 
			obj.sub = () => [].concat( this.reload_label() )
			obj.event_click = ( val? : any ) => this.event_reload( val )
		} )
	}

	/// loaded false
	loaded() {
		return false
	}

	/// add_label @ \Add
	add_label() {
		return $mol_locale.text( this.locale_contexts() , "add_label" )
	}

	/// event_add?val null
	@ $mol_mem()
	event_add( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Add $mol_button_minor 
	/// 	enabled <= loaded 
	/// 	sub / <= add_label 
	/// 	event_click?val <=> event_add?val
	@ $mol_mem()
	Add() {
		return new $mol_button_minor().setup( obj => { 
			obj.enabled = () => this.loaded()
			obj.sub = () => [].concat( this.add_label() )
			obj.event_click = ( val? : any ) => this.event_add( val )
		} )
	}

	/// changed false
	changed() {
		return false
	}

	/// save_label @ \Save
	save_label() {
		return $mol_locale.text( this.locale_contexts() , "save_label" )
	}

	/// event_save?val null
	@ $mol_mem()
	event_save( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Save $mol_button_major 
	/// 	enabled <= changed 
	/// 	sub / <= save_label 
	/// 	event_click?val <=> event_save?val
	@ $mol_mem()
	Save() {
		return new $mol_button_major().setup( obj => { 
			obj.enabled = () => this.changed()
			obj.sub = () => [].concat( this.save_label() )
			obj.event_click = ( val? : any ) => this.event_save( val )
		} )
	}

	/// save_result null
	save_result() {
		return <any> null
	}

	/// Message $mol_status status <= save_result
	@ $mol_mem()
	Message() {
		return new $mol_status().setup( obj => { 
			obj.status = () => this.save_result()
		} )
	}

	/// Controller $mol_row sub / 
	/// 	<= Reload 
	/// 	<= Add 
	/// 	<= Save 
	/// 	<= Message
	@ $mol_mem()
	Controller() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Reload() , this.Add() , this.Save() , this.Message() )
		} )
	}

	/// foot / <= Controller
	foot() {
		return [].concat( this.Controller() )
	}

} }

namespace $ { export class $mol_app_users_row extends $mol_row {

	/// minimal_height 68
	minimal_height() {
		return 68
	}

	/// title?val \
	@ $mol_mem()
	title( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Title $mol_string value?val <=> title?val
	@ $mol_mem()
	Title() {
		return new $mol_string().setup( obj => { 
			obj.value = ( val? : any ) => this.title( val )
		} )
	}

	/// drop_label \Drop
	drop_label() {
		return "Drop"
	}

	/// event_drop?val null
	@ $mol_mem()
	event_drop( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Drop $mol_button_minor 
	/// 	sub / <= drop_label 
	/// 	event_click?val <=> event_drop?val
	@ $mol_mem()
	Drop() {
		return new $mol_button_minor().setup( obj => { 
			obj.sub = () => [].concat( this.drop_label() )
			obj.event_click = ( val? : any ) => this.event_drop( val )
		} )
	}

	/// sub / 
	/// 	<= Title 
	/// 	<= Drop
	sub() {
		return [].concat( this.Title() , this.Drop() )
	}

} }

