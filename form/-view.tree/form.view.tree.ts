namespace $ { export class $mol_form extends $mol_view {

	/// submit_blocked false
	submit_blocked() {
		return false
	}

	/// form_fields /
	form_fields() {
		return [] as any[]
	}

	/// Bar_fields $mol_view sub <= form_fields
	@ $mol_mem()
	Bar_fields() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.form_fields()
		} )
	}

	/// buttons /
	buttons() {
		return [] as any[]
	}

	/// Bar_buttons $mol_row sub <= buttons
	@ $mol_mem()
	Bar_buttons() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => this.buttons()
		} )
	}

	/// sub / 
	/// 	<= Bar_fields 
	/// 	<= Bar_buttons
	sub() {
		return [].concat( this.Bar_fields() , this.Bar_buttons() )
	}

} }

