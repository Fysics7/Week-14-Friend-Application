$(document).ready(function () {
    $('select').material_select();
    $('.modal').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%' // Ending top style attribute
    });
});
$('#submitButton').on('click', function (event) {
    event.preventDefault();

    function validateForm() {
        var inputValid = true;

        $('.validate').each(function () {
            if ($(this).val() === "") {
                inputValid = false;
            }
        });

        $('select.validateSelect').each(function () {
            if ($(this).val() === "") {
                inputValid = false;
            }
        });

        return inputValid;
    }

    if (validateForm() == true) {
        var name = $('#first_name').val().trim() + " " + $('#last_name').val().trim();

        var userInput = {
            name: name,
            picture: $('#picture').val().trim(),
            answers: [
                $('#q1').val(),
                $('#q2').val(),
                $('#q3').val(),
                $('#q4').val(),
                $('#q5').val(),
                $('#q6').val(),
                $('#q7').val(),
                $('#q8').val(),
                $('#q9').val(),
                $('#q10').val()
            ]
        };

        $.post("/api/friends", userInput).done(function (data) {

            $('#matchName').html(data.name);
            $("#matchPicture").attr("src", data.picture);
            $('#modal1').modal('open');
        });
    } else {
        alert("Please fill out all fields");
    }

});