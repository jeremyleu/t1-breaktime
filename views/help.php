<?php
    $contactName = $_POST['name'];
    $contactEmail = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From: BreakTime'; 
    $to = 'sophiaziogas@gmail.com'; 
    $subject = 'Breaktime feedback';
    $human = $_POST['human'];
			
    $body = "From: $contactName\n E-Mail: $contactEmail\n Message:\n $message";
				
    if ($_POST['submit'] && $human == '4') {				 
        if (mail ($to, $subject, $body, $from)) { 
	    echo '<p>Your message has been sent!</p>';
	} else { 
	    echo '<p>Something went wrong, go back and try again!</p>'; 
	} 
    } else if ($_POST['submit'] && $human != '4') {
	echo '<p>You answered the anti-spam question incorrectly!</p>';
    }
?>