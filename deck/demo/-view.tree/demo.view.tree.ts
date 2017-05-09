namespace $ { export class $mol_deck_demo extends $mol_row {

	/// title @ \Simple deck with tabbar
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// greeterLabel @ \Greeting
	greeterLabel() {
		return $mol_locale.text( this.locale_contexts() , "greeterLabel" )
	}

	/// greeterMessage @ \Hello, world!
	greeterMessage() {
		return $mol_locale.text( this.locale_contexts() , "greeterMessage" )
	}

	/// greeterMessager $mol_view sub / <= greeterMessage
	@ $mol_mem()
	greeterMessager() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.greeterMessage() )
		} )
	}

	/// greeterContent $mol_row sub / <= greeterMessager
	@ $mol_mem()
	greeterContent() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.greeterMessager() )
		} )
	}

	/// greeterItem $mol_deck_item 
	/// 	title <= greeterLabel 
	/// 	Content <= greeterContent
	@ $mol_mem()
	greeterItem() {
		return new $mol_deck_item().setup( obj => { 
			obj.title = () => this.greeterLabel()
			obj.Content = () => this.greeterContent()
		} )
	}

	/// questerLabel @ \Question
	questerLabel() {
		return $mol_locale.text( this.locale_contexts() , "questerLabel" )
	}

	/// questerMessage @ \How are you?
	questerMessage() {
		return $mol_locale.text( this.locale_contexts() , "questerMessage" )
	}

	/// questerMessager $mol_view sub / <= questerMessage
	@ $mol_mem()
	questerMessager() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.questerMessage() )
		} )
	}

	/// questerContent $mol_row sub / <= questerMessager
	@ $mol_mem()
	questerContent() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.questerMessager() )
		} )
	}

	/// questerItem $mol_deck_item 
	/// 	title <= questerLabel 
	/// 	Content <= questerContent
	@ $mol_mem()
	questerItem() {
		return new $mol_deck_item().setup( obj => { 
			obj.title = () => this.questerLabel()
			obj.Content = () => this.questerContent()
		} )
	}

	/// commanderLabel @ \Command
	commanderLabel() {
		return $mol_locale.text( this.locale_contexts() , "commanderLabel" )
	}

	/// commanderMessage @ \Let us do it right!
	commanderMessage() {
		return $mol_locale.text( this.locale_contexts() , "commanderMessage" )
	}

	/// commanderMessager $mol_view sub / <= commanderMessage
	@ $mol_mem()
	commanderMessager() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.commanderMessage() )
		} )
	}

	/// commanderContent $mol_row sub / <= commanderMessager
	@ $mol_mem()
	commanderContent() {
		return new $mol_row().setup( obj => { 
			obj.sub = () => [].concat( this.commanderMessager() )
		} )
	}

	/// commanderItem $mol_deck_item 
	/// 	title <= commanderLabel 
	/// 	Content <= commanderContent
	@ $mol_mem()
	commanderItem() {
		return new $mol_deck_item().setup( obj => { 
			obj.title = () => this.commanderLabel()
			obj.Content = () => this.commanderContent()
		} )
	}

	/// Deck $mol_deck items / 
	/// 	<= greeterItem 
	/// 	<= questerItem 
	/// 	<= commanderItem
	@ $mol_mem()
	Deck() {
		return new $mol_deck().setup( obj => { 
			obj.items = () => [].concat( this.greeterItem() , this.questerItem() , this.commanderItem() )
		} )
	}

	/// sub / <= Deck
	sub() {
		return [].concat( this.Deck() )
	}

} }

