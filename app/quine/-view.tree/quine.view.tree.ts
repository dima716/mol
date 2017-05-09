namespace $ { export class $mol_app_quine extends $mol_page {

	/// title @ \Quine - Application that prints self sources
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// content \
	content() {
		return ""
	}

	/// Text $mol_text text <= content
	@ $mol_mem()
	Text() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.content()
		} )
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

	/// paths / 
	/// 	\/mol/app/quine/quine.view.tree
	/// 	\/mol/app/quine/quine.view.ts
	/// 	\/mol/app/quine/index.html
	paths() {
		return [].concat( "/mol/app/quine/quine.view.tree" , "/mol/app/quine/quine.view.ts" , "/mol/app/quine/index.html" )
	}

} }

