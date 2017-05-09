namespace $ { export class $mol_section_demo extends $mol_scroll {

	/// title @ \Section with header
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Section $mol_section 
	/// 	head \Section header
	/// 	Content $mol_filler
	@ $mol_mem()
	Section() {
		return new $mol_section().setup( obj => { 
			obj.head = () => "Section header"
			obj.Content = () => new $mol_filler()
		} )
	}

	/// Article $mol_row sub / <= Section
	@ $mol_mem()
	Article() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Section() )
		} )
	}

	/// sub / <= Article
	sub() {
		return [].concat( this.Article() )
	}

} }

