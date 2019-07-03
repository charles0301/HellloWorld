var $ = jQuery.noConflict();
var nnButton, nnIfrmButton, iframeWindow, targetOrigin;
nnButton = nnIfrmButton = iframeWindow = targetOrigin = false;

function initIframe()
{
	var request = {
		callBack: 'createElements',
		customStyle: {
			labelStyle: $('#nn_cc_standard_style_label').val(),
			inputStyle: $('#nn_cc_standard_style_input').val(),
			styleText: $('#nn_cc_standard_style_css').val(),
			}
	};

	var iframe = $('#nn_iframe')[0];
	iframeWindow = iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
	targetOrigin = 'https://secure.novalnet.de';
	iframeWindow.postMessage(JSON.stringify(request), targetOrigin);
}

function getHash(e)
{	
	$('#novalnet_form_btn').attr('disabled',true);
	
	if($('#nn_pan_hash').val().trim() == '') {
		e.preventDefault();
		e.stopImmediatePropagation();
		iframeWindow.postMessage(
			JSON.stringify(
				{
				'callBack': 'getHash',
				}
			), targetOrigin
		);
	} else {
		return true;
	}
}

function reSize()
{
	if ($('#nn_iframe').length > 0) {
		var iframe = $('#nn_iframe')[0];
		iframeWindow = iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
		targetOrigin = 'https://secure.novalnet.de/';
		iframeWindow.postMessage(JSON.stringify({'callBack' : 'getHeight'}), targetOrigin);
	}
}

function novalnetCcIframe()
{
	$('#cc_loading').hide();
}

window.addEventListener(
	'message', function (e) {
	var data = (typeof e.data === 'string') ? eval('(' + e.data + ')') : e.data;
		
	if (e.origin === 'https://secure.novalnet.de') {
		if (data['callBack'] == 'getHash') {
			if (data['error_message'] != undefined) {
				$('#novalnet_form_btn').attr('disabled',false);	
				alert($('<textarea />').html(data['error_message']).text());
			} else {
		$('#nn_pan_hash').val(data['hash']);
				$('#nn_unique_id').val(data['unique_id']);
				$('#nn_cc_form').submit();
			}
		}

		if (data['callBack'] == 'getHeight') {
			$('#nn_iframe').attr('height', data['contentHeight']);
		}
	}
	}, false
);

$(document).ready(
	function () {
	$(window).resize(
		function() {
		reSize();
		}
	);
	$('#nn_toggle_form').on('click',function(){
		if ($('#nn_new_card_details').css('display') == 'none'){
			document.getElementById('nn_new_card_details').style.display='block';
			document.getElementById('save_payment_block').style.display='block';
			document.getElementById('nn_saved_details').style.display='none';
			$('#nn_cc_new_details').val('1');
			$('#nn_toggle_form').html('<b color: #008ebd;><u> ' + 'Old Card Details' + '</u></b>');
		}else{
			document.getElementById('nn_new_card_details').style.display='none';
			document.getElementById('save_payment_block').style.display='none';
			document.getElementById('nn_saved_details').style.display='block';
			$('#nn_cc_new_details').val('0');
			$('#nn_toggle_form').html('<b color: #008ebd;><u> ' + 'New Card Details' + '</u></b>');
		}
			
	});
	}
);
