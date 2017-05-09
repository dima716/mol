namespace $ { export class $mol_book extends $mol_view {

	/// pages_extended /
	pages_extended() {
		return [] as any[]
	}

	/// sub <= pages_extended
	sub() {
		return this.pages_extended()
	}

	/// pages /
	pages() {
		return [] as any[]
	}

	width(){
		return this.Meter().width()
	}

	/// Meter $mol_meter width => width
	@ $mol_mem()
	Meter() {
		return new $mol_meter()
	}

	/// plugins / <= Meter
	plugins() {
		return [].concat( this.Meter() )
	}

	/// page!index null
	page( index : any ) {
		return <any> null
	}

	/// page_visible!index true
	page_visible( index : any ) {
		return true
	}

	/// Page!index $mol_book_page 
	/// 	Sub <= page!index 
	/// 	visible <= page_visible!index
	@ $mol_mem_key()
	Page( index : any ) {
		return new $mol_book_page().setup( obj => { 
			obj.Sub = () => this.page(index)
			obj.visible = () => this.page_visible(index)
		} )
	}

} }

namespace $ { export class $mol_book_placeholder extends $mol_view {

	/// minimal_width 400
	minimal_width() {
		return 400
	}

	/// sub / <= title
	sub() {
		return [].concat( this.title() )
	}

} }

namespace $ { export class $mol_book_page extends $mol_ghost {

	/// visible true
	visible() {
		return true
	}

	/// attr * 
	/// 	^ 
	/// 	mol_book_page_visible <= visible
	attr() {
		return ({
			...super.attr() ,
			"mol_book_page_visible" :  this.visible() ,
		})
	}

} }

