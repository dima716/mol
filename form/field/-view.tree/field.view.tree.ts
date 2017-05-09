namespace $ { export class $mol_form_field extends $mol_labeler {

	/// name \
	name() {
		return ""
	}

	/// errors /
	errors() {
		return [] as any[]
	}

	/// Bid $mol_view sub <= errors
	@ $mol_mem()
	Bid() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.errors()
		} )
	}

	/// label / 
	/// 	<= name 
	/// 	<= Bid
	label() {
		return [].concat( this.name() , this.Bid() )
	}

	/// control null
	control() {
		return <any> null
	}

	/// Content <= control
	Content() {
		return this.control()
	}

} }

