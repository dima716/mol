namespace $ { export class $mol_app_supplies_card extends $mol_link {

	/// supply null
	supply() {
		return <any> null
	}

	/// status \
	status() {
		return ""
	}

	/// code_title @ \Code
	code_title() {
		return $mol_locale.text( this.locale_contexts() , "code_title" )
	}

	/// code \
	code() {
		return ""
	}

	/// Code_item $mol_labeler 
	/// 	title <= code_title 
	/// 	content <= code
	@ $mol_mem()
	Code_item() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.code_title()
			obj.content = () => this.code()
		} )
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

	/// Cost $mol_cost value <= cost
	@ $mol_mem()
	Cost() {
		return new $mol_cost().setup( obj => { 
			obj.value = () => this.cost()
		} )
	}

	/// Cost_item $mol_labeler 
	/// 	title <= cost_title 
	/// 	content <= Cost
	@ $mol_mem()
	Cost_item() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.cost_title()
			obj.content = () => this.Cost()
		} )
	}

	/// provider_title @ \Provider
	provider_title() {
		return $mol_locale.text( this.locale_contexts() , "provider_title" )
	}

	/// provider_name \
	provider_name() {
		return ""
	}

	/// Provider_item $mol_labeler 
	/// 	title <= provider_title 
	/// 	content <= provider_name
	@ $mol_mem()
	Provider_item() {
		return new $mol_labeler().setup( obj => { 
			obj.title = () => this.provider_title()
			obj.content = () => this.provider_name()
		} )
	}

	/// items / 
	/// 	<= Code_item 
	/// 	<= Cost_item 
	/// 	<= Provider_item
	items() {
		return [].concat( this.Code_item() , this.Cost_item() , this.Provider_item() )
	}

	/// Group $mol_row sub / <= items
	@ $mol_mem()
	Group() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.items() )
		} )
	}

	/// Card $mol_card 
	/// 	status <= status 
	/// 	Content <= Group
	@ $mol_mem()
	Card() {
		return new $mol_card().setup( obj => { 
			obj.status = () => this.status()
			obj.Content = () => this.Group()
		} )
	}

	/// sub / <= Card
	sub() {
		return [].concat( this.Card() )
	}

} }

