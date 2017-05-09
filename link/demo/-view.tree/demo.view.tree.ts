namespace $ { export class $mol_link_demo extends $mol_row {

	/// title @ \Some hyperlinks
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// This_label @ \This page
	This_label() {
		return $mol_locale.text( this.locale_contexts() , "This_label" )
	}

	/// This $mol_link sub / <= This_label
	@ $mol_mem()
	This() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.This_label() )
		} )
	}

	/// Red_label @ \Red
	Red_label() {
		return $mol_locale.text( this.locale_contexts() , "Red_label" )
	}

	/// Red $mol_link 
	/// 	arg * color \red
	/// 	sub / <= Red_label
	@ $mol_mem()
	Red() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"color" :  "red" ,
		})
			obj.sub = () => [].concat( this.Red_label() )
		} )
	}

	/// Green_label @ \Green
	Green_label() {
		return $mol_locale.text( this.locale_contexts() , "Green_label" )
	}

	/// Green $mol_link 
	/// 	arg * color \green
	/// 	sub / <= Green_label
	@ $mol_mem()
	Green() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"color" :  "green" ,
		})
			obj.sub = () => [].concat( this.Green_label() )
		} )
	}

	/// Blue_label @ \Blue
	Blue_label() {
		return $mol_locale.text( this.locale_contexts() , "Blue_label" )
	}

	/// Blue $mol_link 
	/// 	arg * color \blue
	/// 	sub / <= Blue_label
	@ $mol_mem()
	Blue() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"color" :  "blue" ,
		})
			obj.sub = () => [].concat( this.Blue_label() )
		} )
	}

	/// External_hint @ \external link
	External_hint() {
		return $mol_locale.text( this.locale_contexts() , "External_hint" )
	}

	/// External $mol_link 
	/// 	uri \http://example.org
	/// 	title \example.org
	/// 	hint <= External_hint
	@ $mol_mem()
	External() {
		return new $mol_link().setup( obj => { 
			obj.uri = () => "http://example.org"
			obj.title = () => "example.org"
			obj.hint = () => this.External_hint()
		} )
	}

	/// sub / 
	/// 	<= This 
	/// 	<= Red 
	/// 	<= Green 
	/// 	<= Blue 
	/// 	<= External
	sub() {
		return [].concat( this.This() , this.Red() , this.Green() , this.Blue() , this.External() )
	}

} }

