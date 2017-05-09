namespace $ { export class $mol_scroll_demo extends $mol_scroll {

	/// title @ \Simple scroll pane
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// One $mol_filler
	@ $mol_mem()
	One() {
		return new $mol_filler()
	}

	/// Two $mol_filler
	@ $mol_mem()
	Two() {
		return new $mol_filler()
	}

	/// Tree $mol_filler
	@ $mol_mem()
	Tree() {
		return new $mol_filler()
	}

	/// Row $mol_row sub / 
	/// 	<= One 
	/// 	<= Two 
	/// 	<= Tree
	@ $mol_mem()
	Row() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.One() , this.Two() , this.Tree() )
		} )
	}

	/// sub / <= Row
	sub() {
		return [].concat( this.Row() )
	}

} }

