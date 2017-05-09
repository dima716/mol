namespace $ { export class $mol_app_supplies_detail extends $mol_page {

	/// supply null
	supply() {
		return <any> null
	}

	/// title @ \Supply
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// Close_icon $mol_icon_cross
	@ $mol_mem()
	Close_icon() {
		return new $mol_icon_cross()
	}

	/// close_arg * supply null
	close_arg() {
		return ({
			"supply" :  <any> null ,
		})
	}

	/// Close $mol_link 
	/// 	sub / <= Close_icon 
	/// 	arg <= close_arg
	@ $mol_mem()
	Close() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Close_icon() )
			obj.arg = () => this.close_arg()
		} )
	}

	/// tools / <= Close
	tools() {
		return [].concat( this.Close() )
	}

	/// org_title @ \Organization
	org_title() {
		return $mol_locale.text( this.locale_contexts() , "org_title" )
	}

	/// provider_title @ \Provider
	provider_title() {
		return $mol_locale.text( this.locale_contexts() , "provider_title" )
	}

	/// provider_name \
	provider_name() {
		return ""
	}

	/// Provider $mol_labeler 
	/// 	title <= provider_title 
	/// 	content <= provider_name
	@ $mol_mem()
	Provider() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.provider_title()
			obj.content = () => this.provider_name()
		} )
	}

	/// customer_label @ \Consumer
	customer_label() {
		return $mol_locale.text( this.locale_contexts() , "customer_label" )
	}

	/// consumer_name \
	consumer_name() {
		return ""
	}

	/// Consumer $mol_labeler 
	/// 	title <= customer_label 
	/// 	content <= consumer_name
	@ $mol_mem()
	Consumer() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.customer_label()
			obj.content = () => this.consumer_name()
		} )
	}

	/// supply_group_title @ \Supply Group
	supply_group_title() {
		return $mol_locale.text( this.locale_contexts() , "supply_group_title" )
	}

	/// supply_group_name \
	supply_group_name() {
		return ""
	}

	/// Supply_group $mol_labeler 
	/// 	title <= supply_group_title 
	/// 	content <= supply_group_name
	@ $mol_mem()
	Supply_group() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.supply_group_title()
			obj.content = () => this.supply_group_name()
		} )
	}

	/// ballance_unit_title @ \Ballance Unit
	ballance_unit_title() {
		return $mol_locale.text( this.locale_contexts() , "ballance_unit_title" )
	}

	/// ballance_unit_name \
	ballance_unit_name() {
		return ""
	}

	/// Ballance_unit_item $mol_labeler 
	/// 	title <= ballance_unit_title 
	/// 	content <= ballance_unit_name
	@ $mol_mem()
	Ballance_unit_item() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.ballance_unit_title()
			obj.content = () => this.ballance_unit_name()
		} )
	}

	/// org_items / 
	/// 	<= Provider 
	/// 	<= Consumer 
	/// 	<= Supply_group 
	/// 	<= Ballance_unit_item
	org_items() {
		return [].concat( this.Provider() , this.Consumer() , this.Supply_group() , this.Ballance_unit_item() )
	}

	/// Org_content $mol_row sub <= org_items
	@ $mol_mem()
	Org_content() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => this.org_items()
		} )
	}

	/// Org $mol_deck_item 
	/// 	title <= org_title 
	/// 	Content <= Org_content
	@ $mol_mem()
	Org() {
		return new $mol_deck_item().setup( obj => { 
			obj.title = () => this.org_title()
			obj.Content = () => this.Org_content()
		} )
	}

	/// cons_title @ \Consumer
	cons_title() {
		return $mol_locale.text( this.locale_contexts() , "cons_title" )
	}

	/// contract_title @ \Contract
	contract_title() {
		return $mol_locale.text( this.locale_contexts() , "contract_title" )
	}

	/// contract_id \
	contract_id() {
		return ""
	}

	/// Contract $mol_labeler 
	/// 	title <= contract_title 
	/// 	content <= contract_id
	@ $mol_mem()
	Contract() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.contract_title()
			obj.content = () => this.contract_id()
		} )
	}

	/// pay_method_title @ \Pay Method
	pay_method_title() {
		return $mol_locale.text( this.locale_contexts() , "pay_method_title" )
	}

	/// pay_method_name \
	pay_method_name() {
		return ""
	}

	/// Pay_method $mol_labeler 
	/// 	title <= pay_method_title 
	/// 	content <= pay_method_name
	@ $mol_mem()
	Pay_method() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.pay_method_title()
			obj.content = () => this.pay_method_name()
		} )
	}

	/// manager_title @ \Manager
	manager_title() {
		return $mol_locale.text( this.locale_contexts() , "manager_title" )
	}

	/// manager_name \
	manager_name() {
		return ""
	}

	/// Manager $mol_labeler 
	/// 	title <= manager_title 
	/// 	content <= manager_name
	@ $mol_mem()
	Manager() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.manager_title()
			obj.content = () => this.manager_name()
		} )
	}

	/// debitod_title @ \Debitor
	debitod_title() {
		return $mol_locale.text( this.locale_contexts() , "debitod_title" )
	}

	/// debitor_name \
	debitor_name() {
		return ""
	}

	/// Debitor $mol_labeler 
	/// 	title <= debitod_title 
	/// 	content <= debitor_name
	@ $mol_mem()
	Debitor() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.debitod_title()
			obj.content = () => this.debitor_name()
		} )
	}

	/// cons_items / 
	/// 	<= Contract 
	/// 	<= Pay_method 
	/// 	<= Manager 
	/// 	<= Debitor
	cons_items() {
		return [].concat( this.Contract() , this.Pay_method() , this.Manager() , this.Debitor() )
	}

	/// Cons_content $mol_row sub <= cons_items
	@ $mol_mem()
	Cons_content() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => this.cons_items()
		} )
	}

	/// Cons $mol_deck_item 
	/// 	title <= cons_title 
	/// 	Content <= Cons_content
	@ $mol_mem()
	Cons() {
		return new $mol_deck_item().setup( obj => { 
			obj.title = () => this.cons_title()
			obj.Content = () => this.Cons_content()
		} )
	}

	/// Descr_deck $mol_deck items / 
	/// 	<= Org 
	/// 	<= Cons
	@ $mol_mem()
	Descr_deck() {
		return new $mol_deck().setup( obj => { 
			obj.items = () => [].concat( this.Org() , this.Cons() )
		} )
	}

	/// Descr_card $mol_card Content <= Descr_deck
	@ $mol_mem()
	Descr_card() {
		return new $mol_card().setup( obj => { 
			obj.Content = () => this.Descr_deck()
		} )
	}

	/// attach_title @ \Attachments
	attach_title() {
		return $mol_locale.text( this.locale_contexts() , "attach_title" )
	}

	/// attachments /
	attachments() {
		return [] as any[]
	}

	/// attach_new?val null
	@ $mol_mem()
	attach_new( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Attach $mol_attach 
	/// 	items <= attachments 
	/// 	attach_new?val <=> attach_new?val
	@ $mol_mem()
	Attach() {
		return new $mol_attach().setup( obj => { 
			obj.items = () => this.attachments()
			obj.attach_new = ( val? : any ) => this.attach_new( val )
		} )
	}

	/// Attach_section $mol_section 
	/// 	head <= attach_title 
	/// 	Content <= Attach
	@ $mol_mem()
	Attach_section() {
		return new $mol_section().setup( obj => { 
			obj.head = () => this.attach_title()
			obj.Content = () => this.Attach()
		} )
	}

	/// positions_title @ \Positions
	positions_title() {
		return $mol_locale.text( this.locale_contexts() , "positions_title" )
	}

	/// cost_title @ \Cost
	cost_title() {
		return $mol_locale.text( this.locale_contexts() , "cost_title" )
	}

	/// cost $mol_unit_money valueOf 0
	@ $mol_mem()
	cost() {
		return new $mol_unit_money().setup( obj => { 
			obj.valueOf = () => 0
		} )
	}

	/// Cost_value $mol_cost value <= cost
	@ $mol_mem()
	Cost_value() {
		return new $mol_cost().setup( obj => { 
			obj.value = () => this.cost()
		} )
	}

	/// Cost $mol_labeler 
	/// 	title <= cost_title 
	/// 	content <= Cost_value
	@ $mol_mem()
	Cost() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.cost_title()
			obj.content = () => this.Cost_value()
		} )
	}

	/// positions_head / 
	/// 	<= positions_title 
	/// 	<= Cost
	positions_head() {
		return [].concat( this.positions_title() , this.Cost() )
	}

	/// positions /
	positions() {
		return [] as any[]
	}

	/// Positions $mol_list rows <= positions
	@ $mol_mem()
	Positions() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.positions()
		} )
	}

	/// Positions_section $mol_section 
	/// 	head <= positions_head 
	/// 	Content <= Positions
	@ $mol_mem()
	Positions_section() {
		return new $mol_section().setup( obj => { 
			obj.head = () => this.positions_head()
			obj.Content = () => this.Positions()
		} )
	}

	/// content / 
	/// 	<= Descr_card 
	/// 	<= Attach_section 
	/// 	<= Positions_section
	content() {
		return [].concat( this.Descr_card() , this.Attach_section() , this.Positions_section() )
	}

	/// Content $mol_list rows <= content
	@ $mol_mem()
	Content() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.content()
		} )
	}

	/// List $mol_list rows / <= Content
	@ $mol_mem()
	List() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => [].concat( this.Content() )
		} )
	}

	/// body / <= List
	body() {
		return [].concat( this.List() )
	}

	/// approved?val false
	@ $mol_mem()
	approved( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// approved_title @ \Approved
	approved_title() {
		return $mol_locale.text( this.locale_contexts() , "approved_title" )
	}

	/// Approve $mol_check_box 
	/// 	checked?val <=> approved?val 
	/// 	label / <= approved_title
	@ $mol_mem()
	Approve() {
		return new $mol_check_box().setup( obj => { 
			obj.checked = ( val? : any ) => this.approved( val )
			obj.label = () => [].concat( this.approved_title() )
		} )
	}

	/// actions / <= Approve
	actions() {
		return [].concat( this.Approve() )
	}

	/// Actions $mol_row sub <= actions
	@ $mol_mem()
	Actions() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => this.actions()
		} )
	}

	/// foot / <= Actions
	foot() {
		return [].concat( this.Actions() )
	}

} }

