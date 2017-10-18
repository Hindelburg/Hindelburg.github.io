---
title: Homework 2
layout: default
---
# Homework 2 

For this lab, we were supposed to add Javascript functionality to our webpages. We also were supposed
to use the branch and merge features for git version control. In addition to this, I did make some
modifications to the css file because I wasn't completely satisfied with how my page looked. It still
isn't great, but that's just because I'm bad at web design. 

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW2.html)

[Code for Website with Javascript](https://github.com/Hindelburg/Website1)

[Website with Javascript](https://hindelburg.github.io/Homework/homework2/Code/WebsiteV1)

##	Step 1: Git Branching

This was supposed to be the first step of the lab, however, I didn't do it until I'd already gotten the majority of the 
work for the lab already done. I forgot to do it earlier, and had some initial problems when trying to do it. I did
eventually get a new branch off of master to work, however. 

```bash
git branch test3

git checkout test3
```

It was called test3, obviously showing that I'd already failed twice. I am still not sure what was wrong with my first 
two, but they branched with a less than up-to-date version of my code. 

## Step 2: Javascript
I'd already included javascript in my html file during homework 1, so all I had to do was add a line to include my .js
file.

```html
</div>
    <script src="script.js"></script>
</body>
```
My original page is a placeholder for a feature project I hope to create, so I just added a little more impelementation to it.
While it still does not generate actual prompts, it now displays placeholders in a variety of formats. 


### HTML
Before going into the actual javascript file, I'm going to cover all the changes I made to the original html and CSS documents.

<br/>

First I made these buttons call the javascript method "setText" that I created. I also added a class to them so I could
easily use my css file to format them if I wanted to. 

```html
<font size="5">
    <div class="col-sm-3 sideBar"  style="background-color:lightgray">
        <button type="button" onclick="setText('Concept')", class="SideButton">
            Concepts
        </button>
        <br />
        <button type="button" onclick="setText('Sentence')" , class="SideButton">
            Sentences
        </button>
        <br />
        <button type="button" onclick="setText('Character')" , class="SideButton">
            Characters
        </button>
        <br />
        <button type="button" onclick="setText('Setting')" , class="SideButton">
            Settings
        </button>
        <br />
        <button type="button" onclick="setText('Style')" , class="SideButton">
            Styles
        </button>
        <br />
        <button type="button" onclick="setText('Chain')" , class="SideButton">
            Chains
        </button>
        <br />
    </div>
</font>
```

I also went on to add an area where I could put the placeholder prompts for the user, and a button to generate said
prompt.

```html
<font size="4">
    <div class="titleRow", id="Title">
            Concept Generator
    </div>
</font>
<p class="GenerationField" id="GenerationField">
</p>
<div class="buttonRow">
    <button type="button" id="GenerateButton" onclick="generatePrompt()">
        Generate
	</button>
</div>
```

I made it default to concept generator since it was both a the top of the row of options, and in my opinion the primary
type of prompt. 

### JavaScript

Next, I created my javascript file. I created a first method called setText(), which simply set the title to state which
type of prompt would be generated, and updates the storedType to be correct.

```javascript
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
```

I initalize the variable to concept to match the default title. 

<br/>

I then made another method that was called by pressing the "Generate" button shown earlier. This method simply puts 
a placeholder where the prompt would go. There are, however, two distinctly different prompt types: character and 
chain. Character creates a table which holds a number of character attributes such as name and age. Chain creates a list
of multiple sentences. You can select how many sentences you want up to a max of 5. If you enter other values into this field,
nothing happens. 

```javascript
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
```

## Screenshots:

Here's a screenshot of the website fully rendered.

[Shouldn't see this.](Screenshot.png)
