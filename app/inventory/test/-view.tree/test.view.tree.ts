namespace $ { export class $mol_app_inventory_test extends $mol_app_inventory {

	/// title @ \Inventorization business process
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// domain $mol_app_inventory_domain_mock
	@ $mol_mem()
	domain() {
		return new $mol_app_inventory_domain_mock()
	}

} }

