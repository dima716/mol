namespace $ { export class $mol_demo_all extends $mol_view {

	/// name \$mol_view
	name() {
		return "$mol_view"
	}

	/// mediumLabel \Fit to content
	mediumLabel() {
		return "Fit to content"
	}

	/// medium $mol_demo_medium 
	/// 	name <= name 
	/// 	title <= mediumLabel
	@ $mol_mem()
	medium() {
		return new $mol_demo_medium().setup( obj => { 
			obj.name = () => this.name()
			obj.title = () => this.mediumLabel()
		} )
	}

	/// smallLabel @ \Minimum screen
	smallLabel() {
		return $mol_locale.text( this.locale_contexts() , "smallLabel" )
	}

	/// small $mol_demo_small 
	/// 	name <= name 
	/// 	title <= smallLabel
	@ $mol_mem()
	small() {
		return new $mol_demo_small().setup( obj => { 
			obj.name = () => this.name()
			obj.title = () => this.smallLabel()
		} )
	}

	/// largeLabel @ \Maximize to screen
	largeLabel() {
		return $mol_locale.text( this.locale_contexts() , "largeLabel" )
	}

	/// large $mol_demo_large 
	/// 	name <= name 
	/// 	title <= largeLabel
	@ $mol_mem()
	large() {
		return new $mol_demo_large().setup( obj => { 
			obj.name = () => this.name()
			obj.title = () => this.largeLabel()
		} )
	}

	/// sub / 
	/// 	<= medium 
	/// 	<= small 
	/// 	<= large
	sub() {
		return [].concat( this.medium() , this.small() , this.large() )
	}

} }

