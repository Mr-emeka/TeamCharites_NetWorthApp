$(function () {
    // Get the form.
    var form = $('#form-contact');

    // Get the messages div.
    var formMessages = $('.form-messages');

    // TODO: The rest of the code will go here...

    // Set up an event listener for the contact form.
    $(form).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                setTimeout(function(){
                    $(formMessages).removeClass('alert-danger');
                    $(formMessages).addClass('alert-success');
                  }, 2000);

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#form-contact input:not([type="submit"]), #form-contact textarea').val('');
            })

            .fail(function (data) {
                console.log(data);
                // Make sure that the formMessages div has the 'error' class.
                setTimeout(function(){
                    $(formMessages).removeClass('alert-success')
                    $(formMessages).addClass('alert-danger');
                  }, 2000);

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });
});