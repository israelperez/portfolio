<?php
    header('Content-type: application/json');

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["txtName"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["txtEmail"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["txtMsg"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response_array['status'] = 'error';
            $response_array['statusText'] = 'Problem with form data';
            echo json_encode($response_array);
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "israel@webwarrior.me";

        // Set the email subject.
        $subject = "New WebWarrior contact: $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "MIME-Version: 1.0"."\r\n";
        $email_headers .= "Content-type:text/html;charset=UTF-8"."\r\n";
        $email_headers .= "From: $name <$email>";

        // Send the email.
        if ( mail($recipient, $subject, $email_content, $email_headers )) {
            $response_array['status'] = 'success';
            $response_array['statusText'] = 'Ok';
        } else {
            $response_array['status'] = 'error';
            $response_array['statusText'] = 'Mail function failed';
        }
    } else {
        // Not a POST request
        $response_array['status'] = 'error';
        $response_array['statusText'] = 'Wrong method used: Must be Post';
    }
    // return a Json Obeject
    echo json_encode($response_array);
?>