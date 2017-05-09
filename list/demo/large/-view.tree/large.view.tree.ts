namespace $ { export class $mol_list_demo_large extends $mol_scroll {

	/// title @ \Large list of rows with dynamic content
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// rows /
	rows() {
		return [] as any[]
	}

	/// lister $mol_list rows <= rows
	@ $mol_mem()
	lister() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.rows()
		} )
	}

	/// sub / <= lister
	sub() {
		return [].concat( this.lister() )
	}

	/// row_text!id \
	row_text( id : any ) {
		return ""
	}

	/// Content!id $mol_filler
	@ $mol_mem_key()
	Content( id : any ) {
		return new $mol_filler()
	}

	/// Row!id $mol_expander 
	/// 	title <= row_text!id 
	/// 	content / <= Content!id
	@ $mol_mem_key()
	Row( id : any ) {
		return new $mol_expander().setup( obj => { 
			obj.title = () => this.row_text(id)
			obj.content = () => [].concat( this.Content(id) )
		} )
	}

} }

