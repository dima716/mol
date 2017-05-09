namespace $ { export class $mol_link extends $mol_view {

	/// minimal_height 36
	minimal_height() {
		return 36
	}

	/// dom_name \a
	dom_name() {
		return "a"
	}

	/// uri \
	uri() {
		return ""
	}

	/// hint \
	hint() {
		return ""
	}

	/// target \_self
	target() {
		return "_self"
	}

	/// current false
	current() {
		return false
	}

	/// attr * 
	/// 	^ 
	/// 	href <= uri 
	/// 	title <= hint 
	/// 	target <= target 
	/// 	mol_link_current <= current
	attr() {
		return ({
			...super.attr() ,
			"href" :  this.uri() ,
			"title" :  this.hint() ,
			"target" :  this.target() ,
			"mol_link_current" :  this.current() ,
		})
	}

	/// sub / <= title
	sub() {
		return [].concat( this.title() )
	}

	/// arg *
	arg() {
		return ({
		})
	}

} }

