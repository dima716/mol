namespace $ { export class $mol_stack extends $mol_book {

	/// main /
	main() {
		return [] as any[]
	}

	/// Main $mol_view sub <= main
	@ $mol_mem()
	Main() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.main()
		} )
	}

	/// addon /
	addon() {
		return [] as any[]
	}

	/// Addon $mol_view sub <= addon
	@ $mol_mem()
	Addon() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.addon()
		} )
	}

	/// pages / 
	/// 	<= Main 
	/// 	<= Addon
	pages() {
		return [].concat( this.Main() , this.Addon() )
	}

} }

