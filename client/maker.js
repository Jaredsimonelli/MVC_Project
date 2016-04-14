"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#characterMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#characterMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeCharacterSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#characterMessage").animate({width:'hide'},350);
    
        if($("#characterName").val() == '' || $("#characterColor").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#characterForm").attr("action"), $("#characterForm").serialize());
        
        return false;
    });
    
});