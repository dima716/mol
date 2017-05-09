namespace $ { export class $mol_app_inventory extends $mol_view {

	/// domain $mol_app_inventory_domain
	@ $mol_mem()
	domain() {
		return new $mol_app_inventory_domain()
	}

	/// Page null
	Page() {
		return <any> null
	}

	/// sub / <= Page
	sub() {
		return [].concat( this.Page() )
	}

	/// can_write_off false
	can_write_off() {
		return false
	}

	/// can_approve false
	can_approve() {
		return false
	}

	/// Head $mol_app_inventory_head 
	/// 	keeper_show <= can_write_off 
	/// 	control_show <= can_approve
	@ $mol_mem()
	Head() {
		return new $mol_app_inventory_head().setup( obj => { 
			obj.keeper_show = () => this.can_write_off()
			obj.control_show = () => this.can_approve()
		} )
	}

	/// Enter $mol_app_inventory_enter domain <= domain
	@ $mol_mem()
	Enter() {
		return new $mol_app_inventory_enter().setup( obj => { 
			obj.domain = () => this.domain()
		} )
	}

	/// Controller $mol_app_inventory_controller 
	/// 	Head <= Head 
	/// 	domain <= domain
	@ $mol_mem()
	Controller() {
		return new $mol_app_inventory_controller().setup( obj => { 
			obj.Head = () => this.Head()
			obj.domain = () => this.domain()
		} )
	}

	/// Keeper $mol_app_inventory_keeper 
	/// 	Head <= Head 
	/// 	domain <= domain
	@ $mol_mem()
	Keeper() {
		return new $mol_app_inventory_keeper().setup( obj => { 
			obj.Head = () => this.Head()
			obj.domain = () => this.domain()
		} )
	}

	/// Stats $mol_app_inventory_stats 
	/// 	Head <= Head 
	/// 	domain <= domain
	@ $mol_mem()
	Stats() {
		return new $mol_app_inventory_stats().setup( obj => { 
			obj.Head = () => this.Head()
			obj.domain = () => this.domain()
		} )
	}

} }

namespace $ { export class $mol_app_inventory_head extends $mol_row {

	/// keeper_show false
	keeper_show() {
		return false
	}

	/// control_show false
	control_show() {
		return false
	}

	/// keeper_label @ \Keeper
	keeper_label() {
		return $mol_locale.text( this.locale_contexts() , "keeper_label" )
	}

	/// Keeper_link $mol_link 
	/// 	arg * page \keeper
	/// 	sub / <= keeper_label
	@ $mol_mem()
	Keeper_link() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"page" :  "keeper" ,
		})
			obj.sub = () => [].concat( this.keeper_label() )
		} )
	}

	/// control_label @ \Controller
	control_label() {
		return $mol_locale.text( this.locale_contexts() , "control_label" )
	}

	/// Control_link $mol_link 
	/// 	arg * page \controller
	/// 	sub / <= control_label
	@ $mol_mem()
	Control_link() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"page" :  "controller" ,
		})
			obj.sub = () => [].concat( this.control_label() )
		} )
	}

	/// stats_label @ \Stats
	stats_label() {
		return $mol_locale.text( this.locale_contexts() , "stats_label" )
	}

	/// Stats_link $mol_link 
	/// 	arg * page \stats
	/// 	sub / <= stats_label
	@ $mol_mem()
	Stats_link() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"page" :  "stats" ,
		})
			obj.sub = () => [].concat( this.stats_label() )
		} )
	}

	/// sub / 
	/// 	<= Keeper_link 
	/// 	<= Control_link 
	/// 	<= Stats_link
	sub() {
		return [].concat( this.Keeper_link() , this.Control_link() , this.Stats_link() )
	}

} }

