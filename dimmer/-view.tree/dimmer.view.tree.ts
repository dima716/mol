namespace $ { export class $mol_dimmer extends $mol_view {

	/// haystack \
	haystack() {
		return ""
	}

	/// needle \
	needle() {
		return ""
	}

	/// parts /
	parts() {
		return [] as any[]
	}

	/// sub <= parts
	sub() {
		return this.parts()
	}

	/// string!id \
	string( id : any ) {
		return ""
	}

	/// low!id $mol_dimmer_low sub / <= string!id
	@ $mol_mem_key()
	low( id : any ) {
		return new $mol_dimmer_low().setup( obj => { 
			obj.sub = () => [].concat( this.string(id) )
		} )
	}

} }

namespace $ { export class $mol_dimmer_low extends $mol_view {

	/// dom_name \span
	dom_name() {
		return "span"
	}

} }

