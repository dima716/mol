namespace $ { export class $mol_page_demo extends $mol_page {

	/// title @ \Page with header, body and footer
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Button $mol_button title \Toolbar Button
	@ $mol_mem()
	Button() {
		return new $mol_button().setup( obj => { 
			obj.title = () => "Toolbar Button"
		} )
	}

	/// tools / <= Button
	tools() {
		return [].concat( this.Button() )
	}

	/// Text $mol_filler
	@ $mol_mem()
	Text() {
		return new $mol_filler()
	}

	/// Content $mol_row sub / <= Text
	@ $mol_mem()
	Content() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Text() )
		} )
	}

	/// body / <= Content
	body() {
		return [].concat( this.Content() )
	}

	/// Foot_text $mol_view sub / \Footer
	@ $mol_mem()
	Foot_text() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( "Footer" )
		} )
	}

	/// Foot_content $mol_row sub / <= Foot_text
	@ $mol_mem()
	Foot_content() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Foot_text() )
		} )
	}

	/// foot / <= Foot_content
	foot() {
		return [].concat( this.Foot_content() )
	}

} }

