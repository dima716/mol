namespace $ { export class $mol_icon_demo extends $mol_row {

	/// title @ \All $mol icons
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// icons /
	icons() {
		return [] as any[]
	}

	/// sub <= icons
	sub() {
		return this.icons()
	}

} }

