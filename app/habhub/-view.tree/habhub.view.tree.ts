namespace $ { export class $mol_app_habhub extends $mol_book {

	/// Placeholder $mol_book_placeholder 
	/// 	minimal_width 600 
	/// 	title <= title_default
	@ $mol_mem()
	Placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.title_default()
		} )
	}

	/// title_default \HabHub
	title_default() {
		return "HabHub"
	}

	/// gists /
	gists() {
		return [] as any[]
	}

	/// Status $mol_status status <= gists
	@ $mol_mem()
	Status() {
		return new $mol_status().setup( obj => { 
			obj.status = () => this.gists()
		} )
	}

	/// menu_rows /
	menu_rows() {
		return [] as any[]
	}

	/// Menu $mol_list rows <= menu_rows
	@ $mol_mem()
	Menu() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.menu_rows()
		} )
	}

	/// Menu_page $mol_page 
	/// 	minimal_width 400 
	/// 	title <= title_default 
	/// 	body / 
	/// 		<= Status 
	/// 		<= Menu
	@ $mol_mem()
	Menu_page() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 400
			obj.title = () => this.title_default()
			obj.body = () => [].concat( this.Status() , this.Menu() )
		} )
	}

	/// gist_current_title \
	gist_current_title() {
		return ""
	}

	/// close_arg * gist null
	close_arg() {
		return ({
			"gist" :  <any> null ,
		})
	}

	/// Close_icon $mol_icon_cross
	@ $mol_mem()
	Close_icon() {
		return new $mol_icon_cross()
	}

	/// Close $mol_link 
	/// 	arg <= close_arg 
	/// 	sub / <= Close_icon
	@ $mol_mem()
	Close() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => this.close_arg()
			obj.sub = () => [].concat( this.Close_icon() )
		} )
	}

	/// details_scroll_top?val 0
	@ $mol_mem()
	details_scroll_top( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// gist_current_content \
	gist_current_content() {
		return ""
	}

	/// Datails_text $mol_text text <= gist_current_content
	@ $mol_mem()
	Datails_text() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.gist_current_content()
		} )
	}

	/// Details $mol_page 
	/// 	minimal_width 600 
	/// 	title <= gist_current_title 
	/// 	tools / <= Close 
	/// 	body_scroll_top?val <=> details_scroll_top?val 
	/// 	body / <= Datails_text
	@ $mol_mem()
	Details() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.gist_current_title()
			obj.tools = () => [].concat( this.Close() )
			obj.body_scroll_top = ( val? : any ) => this.details_scroll_top( val )
			obj.body = () => [].concat( this.Datails_text() )
		} )
	}

	/// pages / 
	/// 	<= Placeholder 
	/// 	<= Menu_page 
	/// 	<= Details
	pages() {
		return [].concat( this.Placeholder() , this.Menu_page() , this.Details() )
	}

	/// gist_title!id \
	gist_title( id : any ) {
		return ""
	}

	/// gist_arg!id *
	gist_arg( id : any ) {
		return ({
		})
	}

	/// Menu_row!id $mol_link 
	/// 	title <= gist_title!id 
	/// 	arg <= gist_arg!id
	@ $mol_mem_key()
	Menu_row( id : any ) {
		return new $mol_link().setup( obj => { 
			obj.title = () => this.gist_title(id)
			obj.arg = () => this.gist_arg(id)
		} )
	}

} }

