var storedType = 'Concept';

function setText(type) {
    if (storedType != type) {
        $('#info').remove();
        document.getElementById('Title').innerHTML = type + " Generator";
        storedType = type
        document.getElementById('GenerationField').innerHTML = ""
    }
    if (type == "Chain") {
        $('#info').remove();
        $(".buttonRow").append("<input type='text', name='Enter Number', id='info', value='Input number of sentences'>");
    }
    else {
        $('#info').remove();
    }
}

function generatePrompt() {
    if (storedType == 'Concept') {
        document.getElementById('GenerationField').innerHTML = storedType + " Prompt Placeholder."
    }
    else if (storedType == 'Sentence') {
        document.getElementById('GenerationField').innerHTML = storedType + " Prompt Placeholder."
    }
    else if (storedType == 'Chain') {
        var i2 = document.getElementById("info").value;
        $('.chainList').remove();
        $(".GenerationField").append("<ol, class='chainList'></ol>");
        var i = 0;
        while(i < i2 && i < 5){
            $(".chainList").append("<li>Chain Prompt Placeholder.</li>");
            i++;
        }
    }
    else if (storedType == 'Setting') {
        document.getElementById('GenerationField').innerHTML = storedType + " Prompt Placeholder."
    }
    else if (storedType == 'Style') {
        document.getElementById('GenerationField').innerHTML = storedType + " Prompt Placeholder."
    }
    else {
        $('.Character').remove();
        $(".GenerationField").append("<table style='width:100%', class='Character'><tr><th>First</th><th>Lastname</th><th>Age</th><th>Profession</th></tr ><tr><td>NA</td><td>NA</td><td>NA</td><td>NA</td></tr></table>");
    }
}

