namespace $ { export class $mol_cost extends $mol_view {

	/// value null
	value() {
		return <any> null
	}

	/// prefix \
	prefix() {
		return ""
	}

	/// Prefix $mol_view sub / <= prefix
	@ $mol_mem()
	Prefix() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.prefix() )
		} )
	}

	/// value_view \
	value_view() {
		return ""
	}

	/// Value $mol_view sub / <= value_view
	@ $mol_mem()
	Value() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.value_view() )
		} )
	}

	/// postfix \
	postfix() {
		return ""
	}

	/// Postfix $mol_view sub / <= postfix
	@ $mol_mem()
	Postfix() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.postfix() )
		} )
	}

	/// sub / 
	/// 	<= Prefix 
	/// 	<= Value 
	/// 	<= Postfix
	sub() {
		return [].concat( this.Prefix() , this.Value() , this.Postfix() )
	}

} }

