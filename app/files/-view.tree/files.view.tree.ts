namespace $ { export class $mol_app_files extends $mol_book {

	/// uri_root_default \
	uri_root_default() {
		return ""
	}

	/// uri_root <= uri_root_default
	uri_root() {
		return this.uri_root_default()
	}

	/// uri_current <= uri_root
	uri_current() {
		return this.uri_root()
	}

	/// title_root @ \Documents
	title_root() {
		return $mol_locale.text( this.locale_contexts() , "title_root" )
	}

	/// title <= title_root
	title() {
		return this.title_root()
	}

	/// webdav_title!folder \
	webdav_title( folder : any ) {
		return ""
	}

	/// webdav_description!folder \
	webdav_description( folder : any ) {
		return ""
	}

	/// folder_rows!folder /
	folder_rows( folder : any ) {
		return [] as any[]
	}

	/// Folder!folder $mol_app_files_folder 
	/// 	title <= webdav_title!folder 
	/// 	description <= webdav_description!folder 
	/// 	tools <= page_tools!folder 
	/// 	rows <= folder_rows!folder
	@ $mol_mem_key()
	Folder( folder : any ) {
		return new $mol_app_files_folder().setup( obj => { 
			obj.title = () => this.webdav_title(folder)
			obj.description = () => this.webdav_description(folder)
			obj.tools = () => this.page_tools(folder)
			obj.rows = () => this.folder_rows(folder)
		} )
	}

	/// folder_row_arg!uri *
	folder_row_arg( uri : any ) {
		return ({
		})
	}

	/// folder_row_current!uri false
	folder_row_current( uri : any ) {
		return false
	}

	/// folder_row_icon!uri null
	folder_row_icon( uri : any ) {
		return <any> null
	}

	/// folder_row_title!uri \
	folder_row_title( uri : any ) {
		return ""
	}

	/// Folder_row_title!uri $mol_view sub / <= folder_row_title!uri
	@ $mol_mem_key()
	Folder_row_title( uri : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.folder_row_title(uri) )
		} )
	}

	/// folder_row_descr!uri \
	folder_row_descr( uri : any ) {
		return ""
	}

	/// Folder_row_descr!uri $mol_view sub / <= folder_row_descr!uri
	@ $mol_mem_key()
	Folder_row_descr( uri : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.folder_row_descr(uri) )
		} )
	}

	/// Folder_row_info!uri $mol_view sub / 
	/// 	<= Folder_row_title!uri 
	/// 	<= Folder_row_descr!uri
	@ $mol_mem_key()
	Folder_row_info( uri : any ) {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Folder_row_title(uri) , this.Folder_row_descr(uri) )
		} )
	}

	/// Folder_row!uri $mol_link 
	/// 	minimal_height 40 
	/// 	arg <= folder_row_arg!uri 
	/// 	current <= folder_row_current!uri 
	/// 	sub / 
	/// 		<= folder_row_icon!uri 
	/// 		<= Folder_row_info!uri
	@ $mol_mem_key()
	Folder_row( uri : any ) {
		return new $mol_link().setup( obj => { 
			obj.minimal_height = () => 40
			obj.arg = () => this.folder_row_arg(uri)
			obj.current = () => this.folder_row_current(uri)
			obj.sub = () => [].concat( this.folder_row_icon(uri) , this.Folder_row_info(uri) )
		} )
	}

	/// file_uri!file \
	file_uri( file : any ) {
		return ""
	}

	/// file_mime!file \
	file_mime( file : any ) {
		return ""
	}

	/// File!file $mol_app_files_file 
	/// 	title <= webdav_title!file 
	/// 	tools <= page_tools!file 
	/// 	src <= file_uri!file 
	/// 	mime <= file_mime!file
	@ $mol_mem_key()
	File( file : any ) {
		return new $mol_app_files_file().setup( obj => { 
			obj.title = () => this.webdav_title(file)
			obj.tools = () => this.page_tools(file)
			obj.src = () => this.file_uri(file)
			obj.mime = () => this.file_mime(file)
		} )
	}

	/// Icon_folder!uri $mol_icon_folder
	@ $mol_mem_key()
	Icon_folder( uri : any ) {
		return new $mol_icon_folder()
	}

	/// Icon_file!uri $mol_icon_file2
	@ $mol_mem_key()
	Icon_file( uri : any ) {
		return new $mol_icon_file2()
	}

	/// Placeholder $mol_book_placeholder title <= title
	@ $mol_mem()
	Placeholder() {
		return new $mol_book_placeholder().setup( obj => { 
			obj.title = () => this.title()
		} )
	}

	/// tools_root /
	tools_root() {
		return [] as any[]
	}

	/// Close_icon!uri $mol_icon_cross
	@ $mol_mem_key()
	Close_icon( uri : any ) {
		return new $mol_icon_cross()
	}

	/// close_arg!uri *
	close_arg( uri : any ) {
		return ({
		})
	}

	/// Close!uri $mol_link 
	/// 	sub / <= Close_icon!uri 
	/// 	arg <= close_arg!uri
	@ $mol_mem_key()
	Close( uri : any ) {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Close_icon(uri) )
			obj.arg = () => this.close_arg(uri)
		} )
	}

	/// page_tools!uri / <= Close!uri
	page_tools( uri : any ) {
		return [].concat( this.Close(uri) )
	}

} }

namespace $ { export class $mol_app_files_folder extends $mol_page {

	/// minimal_width 400
	minimal_width() {
		return 400
	}

	/// description \
	description() {
		return ""
	}

	/// Description $mol_text text <= description
	@ $mol_mem()
	Description() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.description()
		} )
	}

	/// rows /
	rows() {
		return [] as any[]
	}

	/// Status $mol_status status <= rows
	@ $mol_mem()
	Status() {
		return new $mol_status().setup( obj => { 
			obj.status = () => this.rows()
		} )
	}

	/// Folder_rows $mol_list rows <= rows
	@ $mol_mem()
	Folder_rows() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.rows()
		} )
	}

	/// body / 
	/// 	<= Description 
	/// 	<= Status 
	/// 	<= Folder_rows
	body() {
		return [].concat( this.Description() , this.Status() , this.Folder_rows() )
	}

} }

namespace $ { export class $mol_app_files_file extends $mol_page {

	/// minimal_width 800
	minimal_width() {
		return 800
	}

	/// src \
	src() {
		return ""
	}

	/// mime \
	mime() {
		return ""
	}

	/// Embed $mol_embed 
	/// 	uri <= src 
	/// 	mime <= mime
	@ $mol_mem()
	Embed() {
		return new $mol_embed().setup( obj => { 
			obj.uri = () => this.src()
			obj.mime = () => this.mime()
		} )
	}

	/// body / <= Embed
	body() {
		return [].concat( this.Embed() )
	}

} }

