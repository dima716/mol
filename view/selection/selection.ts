namespace $ {
	
	export class $mol_view_selection extends $mol_object {
		
		@ $mol_mem()
		static focused( next? : Element[] , force? : $mol_atom_force ) {
			if( next === void 0 ) return [] as Element[]
			
			if( next.length !== 1 ) throw new Error( 'Length must be equals 1' )
			
			const node = next[ 0 ] as HTMLElement
			
			node.focus();
		}
		
		@ $mol_mem()
		static position( ...diff : any[] ) {
			if( diff.length ) {
				if( !diff[ 0 ] ) return diff[ 0 ]
				
				var start = diff[ 0 ].start
				var end = diff[ 0 ].end
				if( !( start <= end ) ) throw new Error( `Wrong offsets (${start},${end})` )
				
				var root = $mol_dom_context.document.getElementById( diff[ 0 ].id )
				root.focus()
				
				var range = new Range
				
				var cur = root.firstChild
				while( cur !== root ) {
					while( cur.firstChild ) cur = cur.firstChild
					if( cur.nodeValue ) {
						var length = cur.nodeValue.length
						if( length >= start )  break
						start -= length
					}
					while( !cur.nextSibling ) {
						cur = cur.parentNode
						if( cur === root ) {
							start = root.childNodes.length
							break
						}
					}
				}
				range.setStart( cur , start )
				
				var cur = root.firstChild
				while( cur !== root ) {
					while( cur.firstChild ) cur = cur.firstChild
					if( cur.nodeValue ) {
						var length = cur.nodeValue.length
						if( length >= end )  break
						end -= length
					}
					while( !cur.nextSibling ) {
						cur = cur.parentNode
						if( cur === root ) {
							end = root.childNodes.length
							break
						}
					}
				}
				range.setEnd( cur , end )
				
				var sel = $mol_dom_context.document.getSelection()
				sel.removeAllRanges()
				sel.addRange( range )
				
				return diff[ 0 ]
			} else {
				var sel = $mol_dom_context.document.getSelection()
				if( sel.rangeCount === 0 ) return null
				var range = sel.getRangeAt( 0 )
				
				var el = <Element> range.commonAncestorContainer
				while( el && !el.id ) el = el.parentElement
				
				if( !el ) return { id : null , start : 0 , end : 0 }
				
				var meter = new Range
				meter.selectNodeContents( el )
				
				meter.setEnd( range.startContainer , range.startOffset )
				var startOffset = meter.toString().length
				
				meter.setEnd( range.endContainer , range.endOffset )
				var endOffset = meter.toString().length
				
				return { id : el.id , start : startOffset , end : endOffset }
			}
		}
		
		static onFocus( event : FocusEvent ) {
			const parents : Element[] = []
			let element = event.target as HTMLElement
			
			while( element ) {
				parents.push( element )
				element = element.parentElement
			}
			
			$mol_view_selection.focused( parents , $mol_atom_force )
		}
		
		static onBlur( event : FocusEvent ) {
			$mol_view_selection.focused( [] , $mol_atom_force )
		}
	}
	
}
