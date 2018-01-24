$("#authenticateForm").submit(function(e) {
    $.ajax({
        type: "POST",
        url: '/api/authenticate',
        data: $("#authenticateForm").serialize(), // serializes the form's elements.
        success: function(data)
        {
            window.location.href = '/'
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