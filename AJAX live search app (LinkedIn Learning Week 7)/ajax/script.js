// adapted from https://files3.lynda.com/secure/courses/114900/exercises/Ex_Files_JScript_AJAX.zip?tsIE7MxcuoyYNFJpW9H1styjrNwwiMOnluCE5LEtNF2Eb2JwrYqZyNu43VBXejiEgyvaXa4bl04oyGzAYV_lcc1WrJCjU-eYXf2cPjM9g6lcNA3o5BIdSG699r5Yfnfcab-zPM5SK291OWGCh6l0yPEMg-ZRw2qI
$("#search").keyup(function() {

    var searchField = $("#search").val();
    var myExp = new RegExp(searchField, "i");

    $.getJSON("data.json", function (data){
        var output = "<ul class=\"searchresults\">";
        $.each(data, function(key, val){
            if ((val.name.search(myExp) != -1) || (val.bio.search(myExp) != -1)) {
                output += "<li>";
                output += "<h2>" + val.name + "</h2>";
                output += "<img src=\"images/" + val.shortname + "_tn.jpg\" alt="
                    + val.name + "\"/>";
                output += "<p>" + val.bio + "</p>";
                output += "</li>";
            }
        });
        output += "</ul>";
        $("#update").html(output);
    }); //get json
 });