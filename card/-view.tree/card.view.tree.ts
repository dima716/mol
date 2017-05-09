namespace $ { export class $mol_card extends $mol_list {

	/// status \
	status() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	mol_card_status_type <= status
	attr() {
		return ({
			...super.attr() ,
			"mol_card_status_type" :  this.status() ,
		})
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

	/// status_text <= status
	status_text() {
		return this.status()
	}

	/// Status $mol_view 
	/// 	minimal_height 30 
	/// 	sub / <= status_text
	@ $mol_mem()
	Status() {
		return new $mol_view().setup( obj => { 
			obj.minimal_height = () => 30
			obj.sub = () => [].concat( this.status_text() )
		} )
	}

	/// rows / 
	/// 	<= Content 
	/// 	<= Status
	rows() {
		return [].concat( this.Content() , this.Status() )
	}

} }

