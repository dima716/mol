namespace $ { export class $mol_pop_demo extends $mol_row {

	/// title @ \Pop up block with various alignment
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// showed_value?val false
	@ $mol_mem()
	showed_value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// event_show?event null
	@ $mol_mem()
	event_show( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// show_text @ \Show Bubble
	show_text() {
		return $mol_locale.text( this.locale_contexts() , "show_text" )
	}

	/// Show $mol_button 
	/// 	event_click?event <=> event_show?event 
	/// 	sub / <= show_text
	@ $mol_mem()
	Show() {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( event? : any ) => this.event_show( event )
			obj.sub = () => [].concat( this.show_text() )
		} )
	}

	/// bubble_hint @ \ I'm bubble, i showed when you want
	bubble_hint() {
		return $mol_locale.text( this.locale_contexts() , "bubble_hint" )
	}

	/// event_hide?event null
	@ $mol_mem()
	event_hide( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : <any> null
	}

	/// hide_hint @ \Hide Bubble
	hide_hint() {
		return $mol_locale.text( this.locale_contexts() , "hide_hint" )
	}

	/// Hide $mol_button 
	/// 	event_click?event <=> event_hide?event 
	/// 	sub / <= hide_hint
	@ $mol_mem()
	Hide() {
		return new $mol_button().setup( obj => { 
			obj.event_click = ( event? : any ) => this.event_hide( event )
			obj.sub = () => [].concat( this.hide_hint() )
		} )
	}

	/// Content $mol_view sub / 
	/// 	<= bubble_hint 
	/// 	<= Hide
	@ $mol_mem()
	Content() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.bubble_hint() , this.Hide() )
		} )
	}

	/// Pop $mol_pop 
	/// 	showed?val <= showed_value?val 
	/// 	align <= align_value?val 
	/// 	Anchor <= Show 
	/// 	bubble_content / <= Content
	@ $mol_mem()
	Pop() {
		return new $mol_pop().setup( obj => { 
			obj.showed = ( val? : any ) => this.showed_value()
			obj.align = () => this.align_value()
			obj.Anchor = () => this.Show()
			obj.bubble_content = () => [].concat( this.Content() )
		} )
	}

	/// Align_title @ \Align
	Align_title() {
		return $mol_locale.text( this.locale_contexts() , "Align_title" )
	}

	/// align_value?val \bottom_center
	@ $mol_mem()
	align_value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "bottom_center"
	}

	/// align_left_top @ \left_top
	align_left_top() {
		return $mol_locale.text( this.locale_contexts() , "align_left_top" )
	}

	/// align_left_center @ \left_center
	align_left_center() {
		return $mol_locale.text( this.locale_contexts() , "align_left_center" )
	}

	/// align_left_bottom @ \left_bottom
	align_left_bottom() {
		return $mol_locale.text( this.locale_contexts() , "align_left_bottom" )
	}

	/// align_right_top @ \right_top
	align_right_top() {
		return $mol_locale.text( this.locale_contexts() , "align_right_top" )
	}

	/// align_right_center @ \right_center
	align_right_center() {
		return $mol_locale.text( this.locale_contexts() , "align_right_center" )
	}

	/// align_right_bottom @ \right_bottom
	align_right_bottom() {
		return $mol_locale.text( this.locale_contexts() , "align_right_bottom" )
	}

	/// align_center @ \center
	align_center() {
		return $mol_locale.text( this.locale_contexts() , "align_center" )
	}

	/// align_top_left @ \top_left
	align_top_left() {
		return $mol_locale.text( this.locale_contexts() , "align_top_left" )
	}

	/// align_top_center @ \top_center
	align_top_center() {
		return $mol_locale.text( this.locale_contexts() , "align_top_center" )
	}

	/// align_top_right @ \top_right
	align_top_right() {
		return $mol_locale.text( this.locale_contexts() , "align_top_right" )
	}

	/// align_bottom_left @ \bottom_left
	align_bottom_left() {
		return $mol_locale.text( this.locale_contexts() , "align_bottom_left" )
	}

	/// align_bottom_center @ \bottom_center
	align_bottom_center() {
		return $mol_locale.text( this.locale_contexts() , "align_bottom_center" )
	}

	/// align_bottom_right @ \bottom_right
	align_bottom_right() {
		return $mol_locale.text( this.locale_contexts() , "align_bottom_right" )
	}

	/// Align $mol_select 
	/// 	clearable false 
	/// 	value?val <=> align_value?val 
	/// 	options / 
	/// 		<= align_left_top 
	/// 		<= align_left_center 
	/// 		<= align_left_bottom 
	/// 		<= align_right_top 
	/// 		<= align_right_center 
	/// 		<= align_right_bottom 
	/// 		<= align_center 
	/// 		<= align_top_left 
	/// 		<= align_top_center 
	/// 		<= align_top_right 
	/// 		<= align_bottom_left 
	/// 		<= align_bottom_center 
	/// 		<= align_bottom_right
	@ $mol_mem()
	Align() {
		return new $mol_select().setup( obj => { 
			obj.clearable = () => false
			obj.value = ( val? : any ) => this.align_value( val )
			obj.options = () => [].concat( this.align_left_top() , this.align_left_center() , this.align_left_bottom() , this.align_right_top() , this.align_right_center() , this.align_right_bottom() , this.align_center() , this.align_top_left() , this.align_top_center() , this.align_top_right() , this.align_bottom_left() , this.align_bottom_center() , this.align_bottom_right() )
		} )
	}

	/// Align_block $mol_labeler 
	/// 	title <= Align_title 
	/// 	Content <= Align
	@ $mol_mem()
	Align_block() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.Align_title()
			obj.Content = () => this.Align()
		} )
	}

	/// sub / 
	/// 	<= Pop 
	/// 	<= Align_block
	sub() {
		return [].concat( this.Pop() , this.Align_block() )
	}

} }

