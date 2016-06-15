module $.$mol {
	export class $mol_demo_form extends $.$mol_demo_form {
		
		@ $mol_prop()
		nameFirst( ...diff : string[] ) {
			return this.local( `nameFirst()` , ...diff ) || ''
		}
		
		nameFirstErrors() {
			return this.nameFirst() ? [] : [ 'Input required' ]
		}
		
		@ $mol_prop()
		nameNick( ...diff : string[] ) {
			return this.local( `nameNick()` , ...diff ) || ''
		}
		
		@ $mol_prop()
		nameSecond( ...diff : string[] ) {
			return this.local( `nameSecond()` , ...diff ) || ''
		}
		
		nameSecondErrors() {
			var value = this.nameSecond()
			
			if( value.length === 0 ) return [ 'Input required' ]
			
			var errors = []
			if( value.length < 3 ) errors.push( 'More then 2 letter required' )
			if( value.indexOf( ' ' ) !== -1 ) errors.push( 'Spaces are forbidden' )
			return errors
		}

		@ $mol_prop()
		sex( ...diff : string[] ) {
			return this.local( `sex()` , ...diff ) || ''
		}

		sexErrors() {
			return this.sex() ? [] : [ 'Input required' ]
		}

		@ $mol_prop()
		submits( ...diff : Event[] ) {
			alert( `Hello, ${this.sex()} ${this.nameFirst()} (${this.nameNick()}) ${this.nameSecond()}!` )
		}
		
	}
}
