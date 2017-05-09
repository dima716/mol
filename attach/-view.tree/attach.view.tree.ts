namespace $ { export class $mol_attach extends $mol_card {

	/// items?val /
	@ $mol_mem()
	items( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [] as any[]
	}

	/// attach_new?val \
	@ $mol_mem()
	attach_new( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Add $mol_attach_add file_new?val <=> attach_new?val
	@ $mol_mem()
	Add() {
		return new $mol_attach_add().setup( obj => { 
			obj.file_new = ( val? : any ) => this.attach_new( val )
		} )
	}

	/// content / 
	/// 	<= items?val 
	/// 	<= Add
	content() {
		return [].concat( this.items() , this.Add() )
	}

	/// Content $mol_tiler items <= content
	@ $mol_mem()
	Content() {
		return new $mol_tiler().setup( obj => { 
			obj.items = () => this.content()
		} )
	}

	/// attach_title \
	attach_title() {
		return ""
	}

	/// Item!id $mol_attach_item title <= attach_title
	@ $mol_mem_key()
	Item( id : any ) {
		return new $mol_attach_item().setup( obj => { 
			obj.title = () => this.attach_title()
		} )
	}

} }

namespace $ { export class $mol_attach_item extends $mol_link {

	/// url_thumb?val \
	@ $mol_mem()
	url_thumb( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// url_load?val \
	@ $mol_mem()
	url_load( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// uri?val <=> url_load?val
	@ $mol_mem()
	uri( val? : any , force? : $mol_atom_force ) {
		return this.url_load( val )
	}

	/// style_bg \
	style_bg() {
		return ""
	}

	/// style * 
	/// 	^ 
	/// 	backgroundImage <= style_bg
	style() {
		return ({
			...super.style() ,
			"backgroundImage" :  this.style_bg() ,
		})
	}

	/// title \
	title() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	download <= title
	attr() {
		return ({
			...super.attr() ,
			"download" :  this.title() ,
		})
	}

} }

namespace $ { export class $mol_attach_add extends $mol_button {

	/// minimal_height 60
	minimal_height() {
		return 60
	}

	/// file_new?val \
	@ $mol_mem()
	file_new( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Icon $mol_icon_attach
	@ $mol_mem()
	Icon() {
		return new $mol_icon_attach()
	}

	/// event_capture?val null
	@ $mol_mem()
	event_capture( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event_picked?val null
	@ $mol_mem()
	event_picked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Input $mol_attach_add_input 
	/// 	event_capture?val <=> event_capture?val 
	/// 	event_picked?val <=> event_picked?val
	@ $mol_mem()
	Input() {
		return new $mol_attach_add_input().setup( obj => { 
			obj.event_capture = ( val? : any ) => this.event_capture( val )
			obj.event_picked = ( val? : any ) => this.event_picked( val )
		} )
	}

	/// sub / 
	/// 	<= Icon 
	/// 	<= Input
	sub() {
		return [].concat( this.Icon() , this.Input() )
	}

} }

namespace $ { export class $mol_attach_add_input extends $mol_view {

	/// dom_name \input
	dom_name() {
		return "input"
	}

	/// type \file
	type() {
		return "file"
	}

	/// accept \image/*;capture=camera
	accept() {
		return "image/*;capture=camera"
	}

	/// multiple true
	multiple() {
		return true
	}

	/// attr * 
	/// 	^ 
	/// 	type <= type 
	/// 	accept <= accept 
	/// 	multiple <= multiple
	attr() {
		return ({
			...super.attr() ,
			"type" :  this.type() ,
			"accept" :  this.accept() ,
			"multiple" :  this.multiple() ,
		})
	}

	/// event_capture?val null
	@ $mol_mem()
	event_capture( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event_click?val <=> event_capture?val
	@ $mol_mem()
	event_click( val? : any , force? : $mol_atom_force ) {
		return this.event_capture( val )
	}

	/// event_picked?val null
	@ $mol_mem()
	event_picked( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// event * 
	/// 	^ 
	/// 	change?val <=> event_picked?val
	event() {
		return ({
			...super.event() ,
			"change" :  ( val? : any )=>  this.event_picked( val ) ,
		})
	}

} }

