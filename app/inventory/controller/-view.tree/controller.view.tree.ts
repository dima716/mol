namespace $ { export class $mol_app_inventory_controller extends $mol_page {

	/// domain $mol_app_inventory_domain
	@ $mol_mem()
	domain() {
		return new $mol_app_inventory_domain()
	}

	/// position_rows /
	position_rows() {
		return [] as any[]
	}

	/// body <= position_rows
	body() {
		return this.position_rows()
	}

	/// position!id null
	position( id : any ) {
		return <any> null
	}

	/// Position_row!id $mol_app_inventory_position 
	/// 	count_editable false 
	/// 	position <= position!id
	@ $mol_mem_key()
	Position_row( id : any ) {
		return new $mol_app_inventory_position().setup( obj => { 
			obj.count_editable = () => false
			obj.position = () => this.position(id)
		} )
	}

	/// event_sweep?event null
	@ $mol_mem()
	event_sweep( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// submit_label @ \Sweep approved
	submit_label() {
		return $mol_locale.text( this.locale_contexts() , "submit_label" )
	}

	/// Sweep $mol_button_major 
	/// 	event_click?event <=> event_sweep?event 
	/// 	sub / <= submit_label
	@ $mol_mem()
	Sweep() {
		return new $mol_button_major().setup( obj => { 
			obj.event_click = ( event? : any ) => this.event_sweep( event )
			obj.sub = () => [].concat( this.submit_label() )
		} )
	}

	/// Controls_row $mol_row sub / <= Sweep
	@ $mol_mem()
	Controls_row() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Sweep() )
		} )
	}

	/// foot / <= Controls_row
	foot() {
		return [].concat( this.Controls_row() )
	}

} }

