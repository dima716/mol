namespace $ { export class $mol_app_questions extends $mol_book {

	/// placeholder \Stack Overflow
	placeholder() {
		return "Stack Overflow"
	}

	/// Placeholder $mol_book_placeholder 
	/// 	minimal_width 600 
	/// 	title <= placeholder
	@ $mol_mem()
	Placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.placeholder()
		} )
	}

	/// title_default @ \Questions
	title_default() {
		return $mol_locale.text( this.locale_contexts() , "title_default" )
	}

	/// menu_rows /
	menu_rows() {
		return [] as any[]
	}

	/// Status $mol_status status <= menu_rows
	@ $mol_mem()
	Status() {
		return new $mol_status().setup( obj => { 
			obj.status = () => this.menu_rows()
		} )
	}

	/// Menu_links $mol_list rows <= menu_rows
	@ $mol_mem()
	Menu_links() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.menu_rows()
		} )
	}

	/// Menu $mol_page 
	/// 	title <= title_default 
	/// 	minimal_width 400 
	/// 	body / 
	/// 		<= Status 
	/// 		<= Menu_links
	@ $mol_mem()
	Menu() {
		return new $mol_page().setup( obj => { 
			obj.title = () => this.title_default()
			obj.minimal_width = () => 400
			obj.body = () => [].concat( this.Status() , this.Menu_links() )
		} )
	}

	/// question_title!id \
	question_title( id : any ) {
		return ""
	}

	/// question_permalink!id \
	question_permalink( id : any ) {
		return ""
	}

	/// Details_permalink_icon!id $mol_icon_external
	@ $mol_mem_key()
	Details_permalink_icon( id : any ) {
		return new $mol_icon_external()
	}

	/// Details_permalink!id $mol_link 
	/// 	uri <= question_permalink!id 
	/// 	sub / <= Details_permalink_icon!id
	@ $mol_mem_key()
	Details_permalink( id : any ) {
		return new $mol_link().setup( obj => { 
			obj.uri = () => this.question_permalink(id)
			obj.sub = () => [].concat( this.Details_permalink_icon(id) )
		} )
	}

	/// Details_close_icon!id $mol_icon_cross
	@ $mol_mem_key()
	Details_close_icon( id : any ) {
		return new $mol_icon_cross()
	}

	/// Details_close!id $mol_link 
	/// 	sub / <= Details_close_icon!id 
	/// 	arg * question null
	@ $mol_mem_key()
	Details_close( id : any ) {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Details_close_icon(id) )
			obj.arg = () => ({
			"question" :  <any> null ,
		})
		} )
	}

	/// question_descr!id \
	question_descr( id : any ) {
		return ""
	}

	/// Details_descr!id $mol_text text <= question_descr!id
	@ $mol_mem_key()
	Details_descr( id : any ) {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.question_descr(id)
		} )
	}

	/// answers!id /
	answers( id : any ) {
		return [] as any[]
	}

	/// Answers!id $mol_list rows <= answers!id
	@ $mol_mem_key()
	Answers( id : any ) {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.answers(id)
		} )
	}

	/// Details!id $mol_page 
	/// 	minimal_width 600 
	/// 	title <= question_title!id 
	/// 	tools / 
	/// 		<= Details_permalink!id 
	/// 		<= Details_close!id 
	/// 	body / 
	/// 		<= Details_descr!id 
	/// 		<= Answers!id
	@ $mol_mem_key()
	Details( id : any ) {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.question_title(id)
			obj.tools = () => [].concat( this.Details_permalink(id) , this.Details_close(id) )
			obj.body = () => [].concat( this.Details_descr(id) , this.Answers(id) )
		} )
	}

	/// question_answer!id \
	question_answer( id : any ) {
		return ""
	}

	/// Answer!id $mol_text text <= question_answer!id
	@ $mol_mem_key()
	Answer( id : any ) {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.question_answer(id)
		} )
	}

	/// question_arg_by_index!index *
	question_arg_by_index( index : any ) {
		return ({
		})
	}

	/// question_title_by_index!index \
	question_title_by_index( index : any ) {
		return ""
	}

	/// Question_title!index $mol_view sub / <= question_title_by_index!index
	@ $mol_mem_key()
	Question_title( index : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.question_title_by_index(index) )
		} )
	}

	/// question_tags_by_index!index /
	question_tags_by_index( index : any ) {
		return [] as any[]
	}

	/// Question_tags!index $mol_view sub <= question_tags_by_index!index
	@ $mol_mem_key()
	Question_tags( index : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => this.question_tags_by_index(index)
		} )
	}

	/// Question_row!index $mol_row sub / 
	/// 	<= Question_title!index 
	/// 	<= Question_tags!index
	@ $mol_mem_key()
	Question_row( index : any ) {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.Question_title(index) , this.Question_tags(index) )
		} )
	}

	/// Question_link!index $mol_link 
	/// 	minimal_height 70 
	/// 	arg <= question_arg_by_index!index 
	/// 	sub / <= Question_row!index
	@ $mol_mem_key()
	Question_link( index : any ) {
		return new $mol_link().setup( obj => { 
			obj.minimal_height = () => 70
			obj.arg = () => this.question_arg_by_index(index)
			obj.sub = () => [].concat( this.Question_row(index) )
		} )
	}

	/// tag_name!id \
	tag_name( id : any ) {
		return " "
	}

	/// Tag!id $mol_view sub / <= tag_name!id
	@ $mol_mem_key()
	Tag( id : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.tag_name(id) )
		} )
	}

} }

