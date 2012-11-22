$(document).ready(function(){
	
	
	
	//VALIDATES REGISTER FORM PRIOR TO SUBMISSION
	$('#registerform').submit(function(evt){
		evt.preventDefault();
		return Validate(this);
	})
	
	function Validate(form){
		var valid = 1;
		var y;
		
		//USERNAME FIELD
		if (form.username.value.length == 0){
			valid = 0;
			$('#registerform #username-control-group').addClass('error');
			$('#registerform #username-control-group .help-inline').text('must');
		}else{
			$('#registerform #username-control-group').removeClass('error');
			$('#registerform #username-control-group .help-inline').text('');
		}
		
		//EMAIL FIELD
		var x = form.email.value;
		var atpos=x.indexOf("@");
		var dotpos=x.lastIndexOf(".");
		
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
			valid = 0;
			$('#registerform #email-control-group').addClass('error');
			$('#registerform #email-control-group .help-inline').text('not a valid email');
		}else{
			$('#registerform #email-control-group').removeClass('error');
			$('#registerform #email-control-group .help-inline').text('');
		}
				
		//CHECK PASSWORD
		(function(){
			var pass1 = form.password.value;
			var pass2 = form.password2.value;
			var passval = true;
			
			if(pass1 !== pass2){
				$('#registerform #password1-control-group').addClass('error');
				$('#registerform #password2-control-group').addClass('error');
				$('#registerform #password2-control-group .help-inline').text('passwords do not match');
				passval = false;
			}else if(pass1.length < 6){
				$('#registerform #password1-control-group').addClass('error');
				$('#registerform #password2-control-group').addClass('error');
				$('#registerform #password2-control-group .help-inline').text('minimum of 6 characters');
				passval = false;
			}else{
				$('#registerform #password1-control-group').removeClass('error');
				$('#registerform #password2-control-group').removeClass('error');
				$('#registerform #password2-control-group .help-inline').text('');
			}
			if(passval == false){
				valid = 0;
				};
		})();
		
		//CHECK IF FORM VALID NOT VALID
		if (valid == 0){
			return false;
		}
		
		//validate on server
		$.post('register', ($(form).serialize()), function(res) {
			if(res.success == false){
				if(res.usernameaval == false){
					$('#registerform #username-control-group').addClass('error');
					$('#registerform #username-control-group .help-inline').text('not available');
				}else{
					$('#registerform #username-control-group').removeClass('error');
					$('#registerform #username-control-group .help-inline').text('');
				}
				if(res.emailaval == false){
					$('#registerform #email-control-group').addClass('error');
					$('#registerform #email-control-group .help-inline').text('already registered');
				}else{
					$('#registerform #email-control-group').removeClass('error');
					$('#registerform #email-control-group .help-inline').text('');
				}
				$("#registerform input[type='password']").val('');
			}else{
				//successful signup, forward to homepage
				window.location.replace("./");
			}
		});
	}
	
});