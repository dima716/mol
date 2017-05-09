namespace $ { export class $mol_page extends $mol_view {

	/// Title $mol_view sub / <= title
	@ $mol_mem()
	Title() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.title() )
		} )
	}

	/// tools /
	tools() {
		return [] as any[]
	}

	/// head / 
	/// 	<= Title 
	/// 	<= tools
	head() {
		return [].concat( this.Title() , this.tools() )
	}

	/// Head $mol_view sub <= head
	@ $mol_mem()
	Head() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.head()
		} )
	}

	/// body_scroll_top?val 0
	@ $mol_mem()
	body_scroll_top( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// body /
	body() {
		return [] as any[]
	}

	/// Body $mol_scroll 
	/// 	scroll_top?val <=> body_scroll_top?val 
	/// 	sub <= body
	@ $mol_mem()
	Body() {
		return new $mol_scroll().setup( obj => { 
			obj.scroll_top = ( val? : any ) => this.body_scroll_top( val )
			obj.sub = () => this.body()
		} )
	}

	/// foot /
	foot() {
		return [] as any[]
	}

	/// Foot $mol_view sub <= foot
	@ $mol_mem()
	Foot() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.foot()
		} )
	}

	/// sub / 
	/// 	<= Head 
	/// 	<= Body 
	/// 	<= Foot
	sub() {
		return [].concat( this.Head() , this.Body() , this.Foot() )
	}

} }

