namespace $ { export class $mol_app_signup extends $mol_scroll {

	/// title @ \Sign Up form demo
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// message_required @ \Input required
	message_required() {
		return $mol_locale.text( this.locale_contexts() , "message_required" )
	}

	/// message_no_spaces @ \Spaces are forbidden
	message_no_spaces() {
		return $mol_locale.text( this.locale_contexts() , "message_no_spaces" )
	}

	/// message_need_more_letters @ \More then 2 letter required
	message_need_more_letters() {
		return $mol_locale.text( this.locale_contexts() , "message_need_more_letters" )
	}

	/// name_first_label @ \First Name
	name_first_label() {
		return $mol_locale.text( this.locale_contexts() , "name_first_label" )
	}

	/// name_first_errors /
	name_first_errors() {
		return [] as any[]
	}

	/// name_first_hint @ \Jack
	name_first_hint() {
		return $mol_locale.text( this.locale_contexts() , "name_first_hint" )
	}

	/// name_first?val \
	@ $mol_mem()
	name_first( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Name_first_control $mol_string 
	/// 	hint <= name_first_hint 
	/// 	value?val <=> name_first?val
	@ $mol_mem()
	Name_first_control() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.name_first_hint()
			obj.value = ( val? : any ) => this.name_first( val )
		} )
	}

	/// Name_first_field $mol_form_field 
	/// 	name <= name_first_label 
	/// 	errors <= name_first_errors 
	/// 	control <= Name_first_control
	@ $mol_mem()
	Name_first_field() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.name_first_label()
			obj.errors = () => this.name_first_errors()
			obj.control = () => this.Name_first_control()
		} )
	}

	/// name_nick_label @ \Nick Name
	name_nick_label() {
		return $mol_locale.text( this.locale_contexts() , "name_nick_label" )
	}

	/// name_nick_errors /
	name_nick_errors() {
		return [] as any[]
	}

	/// name_nick_hint @ \Capitan
	name_nick_hint() {
		return $mol_locale.text( this.locale_contexts() , "name_nick_hint" )
	}

	/// name_nick?val \
	@ $mol_mem()
	name_nick( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Name_nick_control $mol_string 
	/// 	hint <= name_nick_hint 
	/// 	value?val <=> name_nick?val
	@ $mol_mem()
	Name_nick_control() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.name_nick_hint()
			obj.value = ( val? : any ) => this.name_nick( val )
		} )
	}

	/// Name_nick_field $mol_form_field 
	/// 	name <= name_nick_label 
	/// 	errors <= name_nick_errors 
	/// 	control <= Name_nick_control
	@ $mol_mem()
	Name_nick_field() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.name_nick_label()
			obj.errors = () => this.name_nick_errors()
			obj.control = () => this.Name_nick_control()
		} )
	}

	/// name_second_label @ \Second Name
	name_second_label() {
		return $mol_locale.text( this.locale_contexts() , "name_second_label" )
	}

	/// name_second_errors /
	name_second_errors() {
		return [] as any[]
	}

	/// name_second_hint @ \Sparrow
	name_second_hint() {
		return $mol_locale.text( this.locale_contexts() , "name_second_hint" )
	}

	/// name_second?val \
	@ $mol_mem()
	name_second( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Name_second_control $mol_string 
	/// 	hint <= name_second_hint 
	/// 	value?val <=> name_second?val
	@ $mol_mem()
	Name_second_control() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.name_second_hint()
			obj.value = ( val? : any ) => this.name_second( val )
		} )
	}

	/// Name_second_field $mol_form_field 
	/// 	name <= name_second_label 
	/// 	errors <= name_second_errors 
	/// 	control <= Name_second_control
	@ $mol_mem()
	Name_second_field() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.name_second_label()
			obj.errors = () => this.name_second_errors()
			obj.control = () => this.Name_second_control()
		} )
	}

	/// sex_label @ \Sex
	sex_label() {
		return $mol_locale.text( this.locale_contexts() , "sex_label" )
	}

	/// sex_errors /
	sex_errors() {
		return [] as any[]
	}

	/// sex?val \
	@ $mol_mem()
	sex( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// sex_option_male @ \Male
	sex_option_male() {
		return $mol_locale.text( this.locale_contexts() , "sex_option_male" )
	}

	/// sex_option_intersex @ \Intersex
	sex_option_intersex() {
		return $mol_locale.text( this.locale_contexts() , "sex_option_intersex" )
	}

	/// sex_option_female @ \Female
	sex_option_female() {
		return $mol_locale.text( this.locale_contexts() , "sex_option_female" )
	}

	/// sex_options * 
	/// 	male <= sex_option_male 
	/// 	intersex <= sex_option_intersex 
	/// 	female <= sex_option_female
	sex_options() {
		return ({
			"male" :  this.sex_option_male() ,
			"intersex" :  this.sex_option_intersex() ,
			"female" :  this.sex_option_female() ,
		})
	}

	/// Sex_control $mol_switch 
	/// 	value?val <=> sex?val 
	/// 	options <= sex_options
	@ $mol_mem()
	Sex_control() {
		return new $mol_switch().setup( obj => { 
			obj.value = ( val? : any ) => this.sex( val )
			obj.options = () => this.sex_options()
		} )
	}

	/// Sex_field $mol_form_field 
	/// 	name <= sex_label 
	/// 	errors <= sex_errors 
	/// 	control / <= Sex_control
	@ $mol_mem()
	Sex_field() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.sex_label()
			obj.errors = () => this.sex_errors()
			obj.control = () => [].concat( this.Sex_control() )
		} )
	}

	submit_blocked(){
		return this.Form().submit_blocked()
	}

	/// submit_text @ \Sign Up
	submit_text() {
		return $mol_locale.text( this.locale_contexts() , "submit_text" )
	}

	/// event_submit?val null
	@ $mol_mem()
	event_submit( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Submit $mol_button_major 
	/// 	sub / <= submit_text 
	/// 	event_click?val <=> event_submit?val 
	/// 	disabled <= submit_blocked
	@ $mol_mem()
	Submit() {
		return new $mol_button_major().setup( obj => { 
			obj.sub = () => [].concat( this.submit_text() )
			obj.event_click = ( val? : any ) => this.event_submit( val )
			obj.disabled = () => this.submit_blocked()
		} )
	}

	/// Form $mol_form 
	/// 	form_fields / 
	/// 		<= Name_first_field 
	/// 		<= Name_nick_field 
	/// 		<= Name_second_field 
	/// 		<= Sex_field 
	/// 	submit_blocked => submit_blocked 
	/// 	buttons / <= Submit
	@ $mol_mem()
	Form() {
		return new $mol_form().setup( obj => { 
			obj.form_fields = () => [].concat( this.Name_first_field() , this.Name_nick_field() , this.Name_second_field() , this.Sex_field() )
			obj.buttons = () => [].concat( this.Submit() )
		} )
	}

	/// sub / <= Form
	sub() {
		return [].concat( this.Form() )
	}

} }

