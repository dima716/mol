namespace $ { export class $mol_book_demo extends $mol_book {

	/// title @ \Adaprive layout for various sizes of screen
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Placeholder $mol_book_placeholder 
	/// 	minimal_width 200 
	/// 	sub / \ Placeholder
	@ $mol_mem()
	Placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.minimal_width = () => 200
			obj.sub = () => [].concat( " Placeholder" )
		} )
	}

	/// Addon $mol_view 
	/// 	minimal_width 250 
	/// 	sub / \ Addon
	@ $mol_mem()
	Addon() {
		return new $mol_view().setup( obj => { 
			obj.minimal_width = () => 250
			obj.sub = () => [].concat( " Addon" )
		} )
	}

	/// Main $mol_view 
	/// 	minimal_width 400 
	/// 	sub / \ Main
	@ $mol_mem()
	Main() {
		return new $mol_view().setup( obj => { 
			obj.minimal_width = () => 400
			obj.sub = () => [].concat( " Main" )
		} )
	}

	/// pages / 
	/// 	<= Placeholder 
	/// 	<= Addon 
	/// 	<= Main
	pages() {
		return [].concat( this.Placeholder() , this.Addon() , this.Main() )
	}

} }

