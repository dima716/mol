namespace $ { export class $mol_demo extends $mol_view {

	/// name \$mol_view
	name() {
		return "$mol_view"
	}

	/// title <= name
	title() {
		return this.name()
	}

	/// Title $mol_link 
	/// 	arg * demo <= name 
	/// 	sub / <= title
	@ $mol_mem()
	Title() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"demo" :  this.name() ,
		})
			obj.sub = () => [].concat( this.title() )
		} )
	}

	/// Head $mol_view sub / <= Title
	@ $mol_mem()
	Head() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Title() )
		} )
	}

	/// widget null
	widget() {
		return <any> null
	}

	/// Screen $mol_view sub / <= widget
	@ $mol_mem()
	Screen() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.widget() )
		} )
	}

	/// sub / 
	/// 	<= Head 
	/// 	<= Screen
	sub() {
		return [].concat( this.Head() , this.Screen() )
	}

} }

