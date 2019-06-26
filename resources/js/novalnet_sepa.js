jQuery(document).ready( function() {
	jQuery('#nn_sepa_iban').on('input',function ( event ) {
		let iban = jQuery(this).val().replace( /[^a-zA-Z0-9]+/g, "" ).replace( /\s+/g, "" );
    		$(this).val(iban);		
	});
	
  
  jQuery( '#nn_sepa_cardholder' ).keypress(
				function (event) {
        var keycode = ( 'which' in event ) ? event.which : event.keyCode,
				reg     = /[^0-9\[\]\/\\#,+@!^()$~%'"=:;<>{}\_\|*?`]/g;
			return ( reg.test( String.fromCharCode( keycode ) ) || 0 === keycode || 8 === keycode );
					}
			);
			
	jQuery('#nn_sepa_form').on('submit',function(){
		$('#novalnet_form_btn').attr('disabled',true);		
	});
	
	jQuery('#savepayment').click(function() {
        if (!jQuery('#savepayment').is(':checked')) {
            notSavePaymentData();
        } else {
            savePaymentData();
        }
	});
	
	function savePaymentData()
	{
	jQuery('#save_payment').val('1');
	}

	function notSavePaymentData()
	{
	jQuery('#save_payment').val('');
	}
	
	$('#nn_toggle_form').on('click',function(){
		$('#nn_new_card_details').css('display') == 'none'){
			$('#nn_sepa_new_details').val('1');
			$('#nn_toggle_form').html('<b><u> ' + 'Old Card Details' + '</u></b>');
			$('#nn_saved_details').toggle('slow');
		}else{
			$('#nn_sepa_new_details').val('0');
			$('#nn_toggle_form').html('<b><u> ' + 'New Card Details' + '</u></b>');
			$('#nn_new_card_details').toggle('slow');
		}
			
	});
	
  
});
