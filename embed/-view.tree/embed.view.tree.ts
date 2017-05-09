namespace $ { export class $mol_embed extends $mol_view {

	/// dom_name \object
	dom_name() {
		return "object"
	}

	/// uri \
	uri() {
		return ""
	}

	/// mime \
	mime() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	data <= uri 
	/// 	type <= mime
	attr() {
		return ({
			...super.attr() ,
			"data" :  this.uri() ,
			"type" :  this.mime() ,
		})
	}

	/// open_label @ \Open
	open_label() {
		return $mol_locale.text( this.locale_contexts() , "open_label" )
	}

	/// Open $mol_link 
	/// 	uri <= uri 
	/// 	title <= open_label
	@ $mol_mem()
	Open() {
		return new $mol_link().setup( obj => { 
			obj.uri = () => this.uri()
			obj.title = () => this.open_label()
		} )
	}

	/// sub / <= Open
	sub() {
		return [].concat( this.Open() )
	}

} }

