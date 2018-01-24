$("#registerForm").submit(function(e) {
    $.ajax({
        type: "POST",
        url: '/api/register',
        data: $("#registerForm").serialize(), // serializes the form's elements.
        success: function(data)
        {
            $('#response')
                .removeClass("hidden alert-danger")
                .addClass("alert-success")
                .text(data.firstName + ' vous êtes désormais enregistré sur notre site !');
            $('body').scrollTo(0);
        },
        error: function(data)
        {
            console.log(data.responseJSON);
            $('#response')
                .removeClass("hidden alert-success")
                .addClass("alert-danger")
                .text(data.responseJSON.errmsg);
            $('body').scrollTo(0);
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});