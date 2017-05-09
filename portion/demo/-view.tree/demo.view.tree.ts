namespace $ { export class $mol_portion_demo extends $mol_row {

	/// title @ \Progress bar in various states
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// fist 0
	fist() {
		return 0
	}

	/// Empty $mol_portion portion <= fist
	@ $mol_mem()
	Empty() {
		return new $mol_portion().setup( obj => { 
			obj.portion = () => this.fist()
		} )
	}

	/// second 0.5
	second() {
		return 0.5
	}

	/// Partial $mol_portion portion <= second
	@ $mol_mem()
	Partial() {
		return new $mol_portion().setup( obj => { 
			obj.portion = () => this.second()
		} )
	}

	/// third 1
	third() {
		return 1
	}

	/// Full $mol_portion portion <= third
	@ $mol_mem()
	Full() {
		return new $mol_portion().setup( obj => { 
			obj.portion = () => this.third()
		} )
	}

	/// sub / 
	/// 	<= Empty 
	/// 	<= Partial 
	/// 	<= Full
	sub() {
		return [].concat( this.Empty() , this.Partial() , this.Full() )
	}

} }

