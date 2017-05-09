namespace $ { export class $mol_float_demo extends $mol_scroll {

	/// title @ \Floating header example
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Head_content $mol_view sub / \Float header
	@ $mol_mem()
	Head_content() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( "Float header" )
		} )
	}

	/// Head_row $mol_row sub / <= Head_content
	@ $mol_mem()
	Head_row() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Head_content() )
		} )
	}

	/// Head_card $mol_card sub / <= Head_row
	@ $mol_mem()
	Head_card() {
		return new $mol_card().setup( obj => { 
			obj.sub = () => [].concat( this.Head_row() )
		} )
	}

	/// Head $mol_float sub / <= Head_card
	@ $mol_mem()
	Head() {
		return new $mol_float().setup( obj => { 
			obj.sub = () => [].concat( this.Head_card() )
		} )
	}

	/// Filler1 $mol_filler
	@ $mol_mem()
	Filler1() {
		return new $mol_filler()
	}

	/// Filler2 $mol_filler
	@ $mol_mem()
	Filler2() {
		return new $mol_filler()
	}

	/// Content $mol_row sub / 
	/// 	<= Filler1 
	/// 	<= Filler2
	@ $mol_mem()
	Content() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Filler1() , this.Filler2() )
		} )
	}

	/// content / <= Content
	content() {
		return [].concat( this.Content() )
	}

	/// sub / 
	/// 	<= Head 
	/// 	<= content
	sub() {
		return [].concat( this.Head() , this.content() )
	}

} }

