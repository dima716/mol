namespace $ { export class $mol_nav extends $mol_view {

	/// cycle?val false
	@ $mol_mem()
	cycle( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// keys_x?val /
	@ $mol_mem()
	keys_x( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [] as any[]
	}

	/// keys_y?val /
	@ $mol_mem()
	keys_y( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : [] as any[]
	}

	/// current_x?val \
	@ $mol_mem()
	current_x( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// current_y?val \
	@ $mol_mem()
	current_y( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// event_up?event null
	@ $mol_mem()
	event_up( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event_down?event null
	@ $mol_mem()
	event_down( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event_left?event null
	@ $mol_mem()
	event_left( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event_right?event null
	@ $mol_mem()
	event_right( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event_key?event null
	@ $mol_mem()
	event_key( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event * 
	/// 	^ 
	/// 	keydown?event <=> event_key?event
	event() {
		return ({
			...super.event() ,
			"keydown" :  ( event? : any )=>  this.event_key( event ) ,
		})
	}

	/// attr * 
	/// 	^ 
	/// 	mol_nav_x <= current_x 
	/// 	mol_nav_y <= current_y
	attr() {
		return ({
			...super.attr() ,
			"mol_nav_x" :  this.current_x() ,
			"mol_nav_y" :  this.current_y() ,
		})
	}

} }

