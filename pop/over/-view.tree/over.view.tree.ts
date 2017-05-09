namespace $ { export class $mol_pop_over extends $mol_pop {

	/// event_show?event null
	@ $mol_mem()
	event_show( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event_hide?event null
	@ $mol_mem()
	event_hide( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// event * 
	/// 	^ 
	/// 	mouseover?event <=> event_show?event 
	/// 	mouseout?event <=> event_hide?event
	event() {
		return ({
			...super.event() ,
			"mouseover" :  ( event? : any )=>  this.event_show( event ) ,
			"mouseout" :  ( event? : any )=>  this.event_hide( event ) ,
		})
	}

} }

