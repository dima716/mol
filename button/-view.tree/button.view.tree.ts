namespace $ { export class $mol_button extends $mol_view {

	/// enabled true
	enabled() {
		return true
	}

	/// event_click?event null
	@ $mol_mem()
	event_click( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event_activate?event <=> event_click?event
	@ $mol_mem()
	event_activate( event? : any , force? : $mol_atom_force ) {
		return this.event_click( event )
	}

	/// evenet_key_press?event null
	@ $mol_mem()
	evenet_key_press( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event * 
	/// 	^ 
	/// 	click?event <=> event_activate?event 
	/// 	keypress?event <=> evenet_key_press?event
	event() {
		return ({
			...super.event() ,
			"click" :  ( event? : any )=>  this.event_activate( event ) ,
			"keypress" :  ( event? : any )=>  this.evenet_key_press( event ) ,
		})
	}

	/// disabled false
	disabled() {
		return false
	}

	/// tab_index \0
	tab_index() {
		return "0"
	}

	/// attr * 
	/// 	^ 
	/// 	disabled <= disabled 
	/// 	role \button
	/// 	tabindex <= tab_index
	attr() {
		return ({
			...super.attr() ,
			"disabled" :  this.disabled() ,
			"role" :  "button" ,
			"tabindex" :  this.tab_index() ,
		})
	}

	/// sub / <= title
	sub() {
		return [].concat( this.title() )
	}

} }

