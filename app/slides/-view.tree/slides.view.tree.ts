namespace $ { export class $mol_app_slides extends $mol_book {

	/// role \
	role() {
		return " "
	}

	/// attr * 
	/// 	^ 
	/// 	mol_app_slides_role <= role
	attr() {
		return ({
			...super.attr() ,
			"mol_app_slides_role" :  this.role() ,
		})
	}

	/// contents?val \
	@ $mol_mem()
	contents( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// event_next?val null
	@ $mol_mem()
	event_next( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// speech_next / 
	/// 	\next
	/// 	\forward
	/// 	\дальше
	/// 	\вперед
	speech_next() {
		return [].concat( "next" , "forward" , "дальше" , "вперед" )
	}

	/// Speech_next $mol_speech 
	/// 	event_catch?val <=> event_next?val 
	/// 	patterns <= speech_next
	@ $mol_mem()
	Speech_next() {
		return new $mol_speech().setup( obj => { 
			obj.event_catch = ( val? : any ) => this.event_next( val )
			obj.patterns = () => this.speech_next()
		} )
	}

	/// event_prev?val null
	@ $mol_mem()
	event_prev( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// speech_prev / 
	/// 	\back
	/// 	\назад
	speech_prev() {
		return [].concat( "back" , "назад" )
	}

	/// Speech_prev $mol_speech 
	/// 	event_catch?val <=> event_prev?val 
	/// 	patterns <= speech_prev
	@ $mol_mem()
	Speech_prev() {
		return new $mol_speech().setup( obj => { 
			obj.event_catch = ( val? : any ) => this.event_prev( val )
			obj.patterns = () => this.speech_prev()
		} )
	}

	/// event_start?val null
	@ $mol_mem()
	event_start( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// speech_start / 
	/// 	\to beginning
	/// 	\на начало
	speech_start() {
		return [].concat( "to beginning" , "на начало" )
	}

	/// Speech_start $mol_speech 
	/// 	event_catch?val <=> event_start?val 
	/// 	patterns <= speech_start
	@ $mol_mem()
	Speech_start() {
		return new $mol_speech().setup( obj => { 
			obj.event_catch = ( val? : any ) => this.event_start( val )
			obj.patterns = () => this.speech_start()
		} )
	}

	/// plugins / 
	/// 	<= Speech_next 
	/// 	<= Speech_prev 
	/// 	<= Speech_start
	plugins() {
		return [].concat( this.Speech_next() , this.Speech_prev() , this.Speech_start() )
	}

	/// slide_title \
	slide_title() {
		return ""
	}

	/// Speech_toggle_icon $mol_icon_microphone
	@ $mol_mem()
	Speech_toggle_icon() {
		return new $mol_icon_microphone()
	}

	/// speech_enabled?val false
	@ $mol_mem()
	speech_enabled( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// Speech_toggle $mol_check_icon 
	/// 	Icon <= Speech_toggle_icon 
	/// 	checked?val <=> speech_enabled?val
	@ $mol_mem()
	Speech_toggle() {
		return new $mol_check_icon().setup( obj => { 
			obj.Icon = () => this.Speech_toggle_icon()
			obj.checked = ( val? : any ) => this.speech_enabled( val )
		} )
	}

	/// slide?val 0
	@ $mol_mem()
	slide( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// Slide_number $mol_view sub / <= slide?val
	@ $mol_mem()
	Slide_number() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.slide() )
		} )
	}

	/// uri_base \
	uri_base() {
		return ""
	}

	/// listener_content \
	listener_content() {
		return ""
	}

	/// Listener_content $mol_text 
	/// 	uri_base <= uri_base 
	/// 	text <= listener_content
	@ $mol_mem()
	Listener_content() {
		return new $mol_text().setup( obj => { 
			obj.uri_base = () => this.uri_base()
			obj.text = () => this.listener_content()
		} )
	}

	/// Listener $mol_page 
	/// 	minimal_width 600 
	/// 	title <= slide_title 
	/// 	tools / 
	/// 		<= Speech_toggle 
	/// 		<= Slide_number 
	/// 	body / <= Listener_content
	@ $mol_mem()
	Listener() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.slide_title()
			obj.tools = () => [].concat( this.Speech_toggle() , this.Slide_number() )
			obj.body = () => [].concat( this.Listener_content() )
		} )
	}

	/// open_listener_hint @ \Open slides window
	open_listener_hint() {
		return $mol_locale.text( this.locale_contexts() , "open_listener_hint" )
	}

	/// Open_listener_icon $mol_icon_external
	@ $mol_mem()
	Open_listener_icon() {
		return new $mol_icon_external()
	}

	/// Open_listener $mol_link 
	/// 	target \_blank
	/// 	hint <= open_listener_hint 
	/// 	arg * 
	/// 		role \listener
	/// 		slide null 
	/// 	sub / <= Open_listener_icon
	@ $mol_mem()
	Open_listener() {
		return new $mol_link().setup( obj => { 
			obj.target = () => "_blank"
			obj.hint = () => this.open_listener_hint()
			obj.arg = () => ({
			"role" :  "listener" ,
			"slide" :  <any> null ,
		})
			obj.sub = () => [].concat( this.Open_listener_icon() )
		} )
	}

	/// Slide_switcher $mol_number value?val <=> slide?val
	@ $mol_mem()
	Slide_switcher() {
		return new $mol_number().setup( obj => { 
			obj.value = ( val? : any ) => this.slide( val )
		} )
	}

	/// speaker_content \
	speaker_content() {
		return ""
	}

	/// Speaker_content $mol_text 
	/// 	uri_base <= uri_base 
	/// 	text <= speaker_content
	@ $mol_mem()
	Speaker_content() {
		return new $mol_text().setup( obj => { 
			obj.uri_base = () => this.uri_base()
			obj.text = () => this.speaker_content()
		} )
	}

	/// Speaker $mol_page 
	/// 	minimal_width 600 
	/// 	title <= slide_title 
	/// 	tools / 
	/// 		<= Open_listener 
	/// 		<= Slide_switcher 
	/// 	body / <= Speaker_content
	@ $mol_mem()
	Speaker() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.slide_title()
			obj.tools = () => [].concat( this.Open_listener() , this.Slide_switcher() )
			obj.body = () => [].concat( this.Speaker_content() )
		} )
	}

	/// uri_slides_default \https://nin-jin.github.io/slides/orp/
	uri_slides_default() {
		return "https://nin-jin.github.io/slides/orp/"
	}

	/// uri_slides <= uri_slides_default
	uri_slides() {
		return this.uri_slides_default()
	}

	/// event_load?val null
	@ $mol_mem()
	event_load( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Loader $mol_view 
	/// 	dom_name \iframe
	/// 	attr * src <= uri_slides 
	/// 	event * load?val <=> event_load?val
	@ $mol_mem()
	Loader() {
		return new $mol_view().setup( obj => { 
			obj.dom_name = () => "iframe"
			obj.attr = () => ({
			"src" :  this.uri_slides() ,
		})
			obj.event = () => ({
			"load" :  ( val? : any )=>  this.event_load( val ) ,
		})
		} )
	}

	/// pages / 
	/// 	<= Listener 
	/// 	<= Speaker 
	/// 	<= Loader
	pages() {
		return [].concat( this.Listener() , this.Speaker() , this.Loader() )
	}

} }

