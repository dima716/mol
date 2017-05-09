namespace $ { export class $mol_app_lamps extends $mol_book {

	/// lamp_current_id?val \
	@ $mol_mem()
	lamp_current_id( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Placeholder $mol_book_placeholder title <= title
	@ $mol_mem()
	Placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.title = () => this.title()
		} )
	}

	/// filter_hint @ \Filter...
	filter_hint() {
		return $mol_locale.text( this.locale_contexts() , "filter_hint" )
	}

	/// filter?val \
	@ $mol_mem()
	filter( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Filter $mol_code 
	/// 	hint <= filter_hint 
	/// 	value?val <=> filter?val
	@ $mol_mem()
	Filter() {
		return new $mol_code().setup( obj => { 
			obj.hint = () => this.filter_hint()
			obj.value = ( val? : any ) => this.filter( val )
		} )
	}

	/// menu_scroll_top?val 0
	@ $mol_mem()
	menu_scroll_top( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// lamp_rows /
	lamp_rows() {
		return [] as any[]
	}

	/// Menu $mol_list rows <= lamp_rows
	@ $mol_mem()
	Menu() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.lamp_rows()
		} )
	}

	/// Addon_page $mol_page 
	/// 	minimal_width 200 
	/// 	title \LampTest.ru
	/// 	head / <= Filter 
	/// 	body_scroll_top?val <=> menu_scroll_top?val 
	/// 	body / <= Menu
	@ $mol_mem()
	Addon_page() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 200
			obj.title = () => "LampTest.ru"
			obj.head = () => [].concat( this.Filter() )
			obj.body_scroll_top = ( val? : any ) => this.menu_scroll_top( val )
			obj.body = () => [].concat( this.Menu() )
		} )
	}

	/// title \
	title() {
		return ""
	}

	/// Close_icon $mol_icon_cross
	@ $mol_mem()
	Close_icon() {
		return new $mol_icon_cross()
	}

	/// Close $mol_link 
	/// 	sub / <= Close_icon 
	/// 	arg * lamp null
	@ $mol_mem()
	Close() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Close_icon() )
			obj.arg = () => ({
			"lamp" :  <any> null ,
		})
		} )
	}

	/// Temp_title @ \Temperature
	Temp_title() {
		return $mol_locale.text( this.locale_contexts() , "Temp_title" )
	}

	/// temp \
	temp() {
		return ""
	}

	/// Temp $mol_labeler 
	/// 	title <= Temp_title 
	/// 	content / <= temp
	@ $mol_mem()
	Temp() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.Temp_title()
			obj.content = () => [].concat( this.temp() )
		} )
	}

	/// cri_title @ \CRI
	cri_title() {
		return $mol_locale.text( this.locale_contexts() , "cri_title" )
	}

	/// cri \
	cri() {
		return ""
	}

	/// Cri $mol_labeler 
	/// 	title <= cri_title 
	/// 	content / <= cri
	@ $mol_mem()
	Cri() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.cri_title()
			obj.content = () => [].concat( this.cri() )
		} )
	}

	/// angle_title @ \Angle
	angle_title() {
		return $mol_locale.text( this.locale_contexts() , "angle_title" )
	}

	/// angle \
	angle() {
		return ""
	}

	/// Angle $mol_labeler 
	/// 	title <= angle_title 
	/// 	content / <= angle
	@ $mol_mem()
	Angle() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.angle_title()
			obj.content = () => [].concat( this.angle() )
		} )
	}

	/// Light $mol_row sub / 
	/// 	<= Temp 
	/// 	<= Cri 
	/// 	<= Angle
	@ $mol_mem()
	Light() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Temp() , this.Cri() , this.Angle() )
		} )
	}

	/// type_title @ \Type
	type_title() {
		return $mol_locale.text( this.locale_contexts() , "type_title" )
	}

	/// type \
	type() {
		return ""
	}

	/// Type $mol_labeler 
	/// 	title <= type_title 
	/// 	content / <= type
	@ $mol_mem()
	Type() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.type_title()
			obj.content = () => [].concat( this.type() )
		} )
	}

	/// shape_title @ \Shape
	shape_title() {
		return $mol_locale.text( this.locale_contexts() , "shape_title" )
	}

	/// shape \
	shape() {
		return ""
	}

	/// Shape $mol_labeler 
	/// 	title <= shape_title 
	/// 	content / <= shape
	@ $mol_mem()
	Shape() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.shape_title()
			obj.content = () => [].concat( this.shape() )
		} )
	}

	/// base_title @ \Base
	base_title() {
		return $mol_locale.text( this.locale_contexts() , "base_title" )
	}

	/// base \
	base() {
		return ""
	}

	/// Base $mol_labeler 
	/// 	title <= base_title 
	/// 	content / <= base
	@ $mol_mem()
	Base() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.base_title()
			obj.content = () => [].concat( this.base() )
		} )
	}

	/// Body $mol_row sub / 
	/// 	<= Type 
	/// 	<= Shape 
	/// 	<= Base
	@ $mol_mem()
	Body() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Type() , this.Shape() , this.Base() )
		} )
	}

	/// Info $mol_row sub / 
	/// 	<= Light 
	/// 	<= Body
	@ $mol_mem()
	Info() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Light() , this.Body() )
		} )
	}

	/// photo \
	photo() {
		return ""
	}

	/// Photo $mol_image 
	/// 	uri <= photo 
	/// 	title <= title
	@ $mol_mem()
	Photo() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => this.photo()
			obj.title = () => this.title()
		} )
	}

	/// Gallery $mol_row sub / <= Photo
	@ $mol_mem()
	Gallery() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Photo() )
		} )
	}

	/// Main_page $mol_page 
	/// 	minimal_width 400 
	/// 	title <= title 
	/// 	tools / <= Close 
	/// 	body / 
	/// 		<= Info 
	/// 		<= Gallery
	@ $mol_mem()
	Main_page() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 400
			obj.title = () => this.title()
			obj.tools = () => [].concat( this.Close() )
			obj.body = () => [].concat( this.Info() , this.Gallery() )
		} )
	}

	/// pages / 
	/// 	<= Addon_page 
	/// 	<= Main_page
	pages() {
		return [].concat( this.Addon_page() , this.Main_page() )
	}

	/// lamp_title!id \
	lamp_title( id : any ) {
		return ""
	}

	/// lamp_arg!id *
	lamp_arg( id : any ) {
		return ({
		})
	}

	/// Lamp_row!id $mol_lamps_lamp_row 
	/// 	title <= lamp_title!id 
	/// 	arg <= lamp_arg!id
	@ $mol_mem_key()
	Lamp_row( id : any ) {
		return new $mol_lamps_lamp_row().setup( obj => { 
			obj.title = () => this.lamp_title(id)
			obj.arg = () => this.lamp_arg(id)
		} )
	}

} }

namespace $ { export class $mol_lamps_lamp_row extends $mol_link {

	/// minimal_height 33
	minimal_height() {
		return 33
	}

	/// sub / <= title
	sub() {
		return [].concat( this.title() )
	}

} }

