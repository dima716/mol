namespace $ { export class $mol_select_demo_colors extends $mol_row {

	/// title @ \Color picker with filter and custom rows
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// color?val \
	@ $mol_mem()
	color( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// colors *
	colors() {
		return ({
		})
	}

	/// color_name!id \
	color_name( id : any ) {
		return ""
	}

	/// option_color!id \
	option_color( id : any ) {
		return ""
	}

	/// Color_preview!id $mol_select_colors_color_preview color <= option_color!id
	@ $mol_mem_key()
	Color_preview( id : any ) {
		return new $mol_select_colors_color_preview().setup( obj => { 
			obj.color = () => this.option_color(id)
		} )
	}

	/// Color_row!id $mol_row 
	/// 	sub / 
	/// 		<= Color_preview!id 
	/// 		<= color_name!id 
	/// 	minimal_height 40
	@ $mol_mem_key()
	Color_row( id : any ) {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Color_preview(id) , this.color_name(id) )
			obj.minimal_height = () => 40
		} )
	}

	/// option_content!id / <= Color_row!id
	option_content( id : any ) {
		return [].concat( this.Color_row(id) )
	}

	/// Color_select $mol_select 
	/// 	value?val <=> color?val 
	/// 	dictionary <= colors 
	/// 	option_label!id <= color_name!id 
	/// 	option_content!id <= option_content!id
	@ $mol_mem()
	Color_select() {
		return new $mol_select().setup( obj => { 
			obj.value = ( val? : any ) => this.color( val )
			obj.dictionary = () => this.colors()
			obj.option_label = ( id : any ) => this.color_name(id)
			obj.option_content = ( id : any ) => this.option_content(id)
		} )
	}

	/// Color $mol_labeler 
	/// 	title \Prefer color
	/// 	Content <= Color_select
	@ $mol_mem()
	Color() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => "Prefer color"
			obj.Content = () => this.Color_select()
		} )
	}

	/// sub / <= Color
	sub() {
		return [].concat( this.Color() )
	}

} }

namespace $ { export class $mol_select_colors_color_preview extends $mol_view {

	/// color \
	color() {
		return ""
	}

	/// style * 
	/// 	^ 
	/// 	background <= color
	style() {
		return ({
			...super.style() ,
			"background" :  this.color() ,
		})
	}

} }

