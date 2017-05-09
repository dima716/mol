namespace $ { export class $mol_card_demo extends $mol_row {

	/// title @ \Cards with optional status
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Simple $mol_card Content $mol_row sub / \Hello world!
	@ $mol_mem()
	Simple() {
		return new $mol_card().setup( obj => { 
			obj.Content = () => new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( "Hello world!" )
		} )
		} )
	}

	/// Pending $mol_card 
	/// 	Content $mol_row sub / \Hello pending!
	/// 	status \pending
	@ $mol_mem()
	Pending() {
		return new $mol_card().setup( obj => { 
			obj.Content = () => new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( "Hello pending!" )
		} )
			obj.status = () => "pending"
		} )
	}

	/// sub / 
	/// 	<= Simple 
	/// 	<= Pending
	sub() {
		return [].concat( this.Simple() , this.Pending() )
	}

} }

