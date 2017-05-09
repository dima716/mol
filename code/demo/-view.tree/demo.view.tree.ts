namespace $ { export class $mol_code_demo extends $mol_row {

	/// title @ \Barcode scanner with various formats support
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// qr $mol_code format \QR_CODE
	@ $mol_mem()
	qr() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "QR_CODE"
		} )
	}

	/// matrix $mol_code format \DATA_MATRIX
	@ $mol_mem()
	matrix() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "DATA_MATRIX"
		} )
	}

	/// upc_e $mol_code format \UPC_E
	@ $mol_mem()
	upc_e() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "UPC_E"
		} )
	}

	/// upc_a $mol_code format \UPC_A
	@ $mol_mem()
	upc_a() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "UPC_A"
		} )
	}

	/// ean_8 $mol_code format \EAN_8
	@ $mol_mem()
	ean_8() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "EAN_8"
		} )
	}

	/// ean_13 $mol_code format \EAN_13
	@ $mol_mem()
	ean_13() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "EAN_13"
		} )
	}

	/// code_128 $mol_code format \CODE_128
	@ $mol_mem()
	code_128() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "CODE_128"
		} )
	}

	/// code_39 $mol_code format \CODE_39
	@ $mol_mem()
	code_39() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "CODE_39"
		} )
	}

	/// itf $mol_code format \ITF
	@ $mol_mem()
	itf() {
		return new $mol_code().setup( obj => { 
			obj.format = () => "ITF"
		} )
	}

	/// sub / 
	/// 	<= qr 
	/// 	<= matrix 
	/// 	<= upc_e 
	/// 	<= upc_a 
	/// 	<= ean_8 
	/// 	<= ean_13 
	/// 	<= code_128 
	/// 	<= code_39 
	/// 	<= itf
	sub() {
		return [].concat( this.qr() , this.matrix() , this.upc_e() , this.upc_a() , this.ean_8() , this.ean_13() , this.code_128() , this.code_39() , this.itf() )
	}

} }

