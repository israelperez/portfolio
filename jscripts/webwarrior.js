var UIEngine = {
	init: function(){
		this._addEventListners();
	},
	_addEventListners: function(){
		var Engine = this;

		$('.to-top').on('click', function(){
			Engine._scrollTo('#top');
		});
		$('.to-email').on('click', function(){
			Engine._scrollTo('#contact');
		});

		$('input[type=text], input[type=email], textarea').on('keyup',function(){
			if(Engine._pressedSend) Engine._validateContact();
		});

		$('#frmContact').on('submit',function(e){
			var isValid = false;
			isValid = Engine._validateContact();
			Engine._pressedSend = true;
			if(isValid){
				Engine._pressedSend = false;
				Engine._sendEmail();
				Engine._formElements.formMsg.removeClass('error success').html('<i class="fa fa-envelope"></i> Sending...');
			}
			e.preventDefault();
		});
	},
	_pressedSend: false,
	_sendEmail: function(){
		var Engine = this,
			formData = Engine._formElements.form.serialize();

		$.ajax({
		    type: 'POST',
		    url: 'sendEmail.php',
		    data: formData
		}).done(function(data){
			if(data.status == 'success'){
				Engine._formElements.formMsg.removeClass('error').addClass('success').html('<i class="fa fa-check-circle"></i> Thank You! Your message has been sent');
				Engine._formElements.form[0].reset();
			}else{
				Engine._formElements.formMsg.removeClass('success').addClass('error').html('<i class="fa fa-times-circle"></i> An error occured and your message could not be sent');
				console.error(data.statusText);
			}
		}).fail(function(data){
			var errorMsg = '';

			if (data.responseText !== '') {
				errorMsg = data.responseText;
			} else {
				errorMsg = '<i class="fa fa-exclamation-triangle"></i> Oops! An error occured and your message could not be sent. <br><i class="fa fa-envelope"></i> Please email me at israel@webwarrior.me about this error';
			}
			Engine._formElements.formMsg.removeClass('success').addClass('error').html(errorMsg);
		});
	},
	_scrollTo: function(selector){
		$('html, body').animate({
			scrollTop: $(selector).offset().top
    	}, 2000);
	},

	_formElements:{
		form: $('#frmContact'),
		name: $('input[name=txtName]'),
		email: $('input[name=txtEmail]'),
		msg: $('textarea[name=txtMsg]'),
		formMsg: $('.form-message')
	},
	_validateContact: function(){
		var Engine = this,
			errString = '',
			isValidForm = true,
			validateName = function(){
				return Engine._formElements.name.val().trim() != '';
			},
			validateEmail = function(){
				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  				return regex.test(Engine._formElements.email.val());
			},
			validateMsg = function(){
				return Engine._formElements.msg.val().trim() != '';
			};

		if(!validateName()) {
			errString = '<i class="fa fa-times"></i> Please enter a name<br>';
			isValidForm = false;
			Engine._formElements.name.addClass('error');
		}else Engine._formElements.name.removeClass('error');

		if(!validateEmail()){
			errString += '<i class="fa fa-times"></i> Please enter a valid Email<br>';
			isValidForm = false;
			Engine._formElements.email.addClass('error');
		}else Engine._formElements.email.removeClass('error');

		if(!validateMsg()){
			errString += '<i class="fa fa-times"></i> Please enter a message';
			isValidForm = false;
			Engine._formElements.msg.addClass('error');
		}else Engine._formElements.msg.removeClass('error');

		if(!isValidForm){
			Engine._formElements.formMsg.addClass('error').removeClass('success').html(errString);
			return false;
		}else{
			Engine._formElements.formMsg.removeClass('error success').html('');
			return true;
		}
	}
}