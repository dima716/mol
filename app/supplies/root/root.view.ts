namespace $.$mol {
	export class $mol_app_supplies_root extends $.$mol_app_supplies_root {
		
		entered( next? : boolean ) {
			return $mol_state_session.value( `${ this }.entered()` , next ) || false
		}
		
		pages() {
			return [ 
				this.entered()
					? this.lister()
					: this.enter(), 
				this.supply()
					? this.detailer()
				 	: null 
			]
		}
		
		@ $mol_mem()
		domain() {
			return new $mol_app_supplies_domain_mock()
		}

		supplies() {
			return this.domain().supplies()
		}

		supply_id( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'supply' ) , next )
		}
		
		@ $mol_mem()
		search_query( next? : string ) {
			if( !next ) return ''
			if( next.length < 7 ) return next
			this.supply_id( next )
			return ''
		}

		supply() {
			if( !this.entered() ) return null
			var id = this.supply_id()
			return id ? this.domain().supply( id ) : null
		}

	}
}
