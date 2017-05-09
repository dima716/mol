namespace $ { export class $mol_meter_demo extends $mol_row {

	/// title @ \Real time offset and size metering
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	top(){
		return this.Meter().top()
	}

	height(){
		return this.Meter().height()
	}

	/// Meter $mol_meter 
	/// 	top => top 
	/// 	height => height
	@ $mol_mem()
	Meter() {
		return new $mol_meter()
	}

	/// plugins / <= Meter
	plugins() {
		return [].concat( this.Meter() )
	}

	/// Top $mol_view sub / 
	/// 	\Offset from top: 
	/// 	<= top
	@ $mol_mem()
	Top() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( "Offset from top: " , this.top() )
		} )
	}

	/// Height $mol_view sub / 
	/// 	\Component height: 
	/// 	<= height
	@ $mol_mem()
	Height() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( "Component height: " , this.height() )
		} )
	}

	/// sub / 
	/// 	<= Top 
	/// 	<= Height
	sub() {
		return [].concat( this.Top() , this.Height() )
	}

} }

