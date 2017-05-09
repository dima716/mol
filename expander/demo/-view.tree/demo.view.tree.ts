namespace $ { export class $mol_expander_demo extends $mol_scroll {

	/// title @ \Simple spoiler
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Expander $mol_expander 
	/// 	label / \Lorem Ipsum
	/// 	Content $mol_filler
	@ $mol_mem()
	Expander() {
		return new $mol_expander().setup( obj => { 
			obj.label = () => [].concat( "Lorem Ipsum" )
			obj.Content = () => new $mol_filler()
		} )
	}

	/// sub / <= Expander
	sub() {
		return [].concat( this.Expander() )
	}

} }

