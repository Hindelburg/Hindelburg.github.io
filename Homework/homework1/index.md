---
title: Homework 1
layout: default
---
# Homework 1 

The objective for this assignment is to create a website using HTML. CSS files are used for styling, primarily 
Bootstrap, which is a common CSS file for web developement. Along with HTML and CSS, we are using Git, which 
can be used for version control in a project.

[Last version of website before homework 2](https://github.com/Hindelburg/Website1/tree/6d0479d004ee7568ce1fcd042f2310322a352e7e)

##	Step 1: Git & Github

I configured my git to be able to synchronize it to my github account. Then I initialized the repository and
pushed an initial version 

```bash
git config --global user.name "William Leingang"
git config --global user.email wleingang15@mail.wou.edu

git init
git add .
git commit -m "Initialized website pages."
git push origin master
```

After checking my github account to make sure the project was properly pushed to the site. Note that many versions were 
both commited and pushed as the project was developed.

## Step 2: HTML
### Page 1
I first created an html file and opened it with Visual Studios to edit it. Before I began actually creating a website
I included all the things I thought would be useful, based off of what I'd found on the interent. First I included
Bootstrap and my own custom css file, which at this point was empty. Then I included jQuery and JavaScript. Neither of
these two are used in this homework assignment, but I knew that I would need them in the future, so I included them
anyways.

```html
<div>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="this.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
```

I then added the title of the webpage, and some initial metadata. The concept of this website is a prompt generator.
I've worked with sentence generation with python in the past and really want to make it an actual thing. None of that
is actually implemented in this website, it is simply a shell that it could later be inserted into. 

```html
    <html>
    <title>
        Story Prompt Generator V0.0
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
```

I then created the main header, using the class jumbotron across the entire body of the page. I created a navigation
bar as well which links to all the other main pages of the website. 

```html
    <!--title-->
    <body class="jumbotron">
        <div>
            <h1 class="text-center">
                Prompt Generator
            </h1>

            <!--Navigation Bar-->
            <font size="4">
                    <nav class="navbar navbar-default">
                        <div class="padding">
                            <a href="WebsiteV1.html">Home</a> 
                            <a href="WebsiteV1About.html">About</a> 
                            <a href="WebsiteV1Features.html">Features</a>
                        </div>
                    </nav>
            </font>
```

These buttons along this side would change the prompt generator to generate the appropriate type of prompt. However, this
this is only a shell, they simply link back to the same page.

```html
            <!--Buttons-->
            <font size="5">
                <div class="col-sm-2" style="background-color:lightgray">
                    <a href="WebsiteV1.html" class="button">
                        Concepts
                    </a>
                    <br />
                    <a href="WebsiteV1.html" class="button">
                        Sentences
                    </a>
                    <br />
                    <a href="WebsiteV1.html" class="button">
                        Characters
                    </a>
                    <br />
                    <a href="WebsiteV1.html" class="button">
                        Settings
                    </a>
                    <br />
                    <a href="WebsiteV1.html" class="button">
                        Styles
                    </a>
                    <br />
                    <a href="WebsiteV1.html" class="button">
                        Chains
                    </a>
                    <br />
                </div>
            </font>
```
There is then a block of text which explains how to use the website, if it were operational. I have it as a column because
of the sidebar of buttons on the left.

```html 
            <!--Block Text-->
            <div>
                <p class="col-sm-10">
                    To use prompt generator, select which style of story prompt you want to have generated on the 
                    left side. None of these links are yet operational due to the actual prompt generating
                    software is still in developement.
                </p>
            </div>
        </div>
    </div>
    </body>
</div>
```

### Page 2

This is the "features" page of the website. To reduce redundancy on this page, any repeated elements will not be shown. 
To see the full code, go to my repository which is linked on the main page of this website. 

This sidebar button is used only to link back to the same page that you are currently on. While this may seem useless,
I have to keep the page styles consistant. 

```html
<!--Buttons-->
<font size="5">
    <div class="col-sm-2" style="background-color:lightgray">
        <a href="WebsiteV1Features.html" class="button">
            Features
        </a>
        <br />
    </div>
</font>
```

The primary element of this page is the table of features. None of the features are currently operational, but as they
are developed they would be recorded on this table.

```html
<!--Block Text-->
<div class="col-sm-10">
    <p>
        There are currently no features in this website. This is just a placeholder for what is to come.
    </p>

    <table style="width:90% ">
        <tr>
            <th>Feature</th>
            <th>Type</th>
            <th>Status</th>
        </tr>
        <tr>
            <td>Character Generator</td>
            <td>Traditional</td>
            <td>Not available</td>
        </tr>
        <tr>
            <td>Map Generator</td>
            <td>Traditional</td>
            <td>Not available</td>
        </tr>
        <tr>
            <td>Prompt generator</td>
            <td>Machine Learning</td>
            <td>Not available</td>
        </tr>
    </table>
</div>
```
### Page 3

This page actually is a total of four pages that are linked together by the buttons on the lefthand side. 

These buttons connect to all the subpages.
```html
<!--Buttons-->
<font size="5">
    <div class="col-sm-2" style="background-color:lightgray">
        <a href="WebsiteV1About.html" class="button">
            What is prompt generator?
        </a>
        <br />
        <a href="WebsiteV1About2.html" class="button">
            How does it work?
        </a>
        <br />
        <a href="WebsiteV1About3.html" class="button">
            Why prompt generator?
        </a>
        <br />
        <a href="WebsiteV1About4.html" class="button">
            About the author.
        </a>
        <br />
    </div>
</font>
```
### Subpage 1

This page lists all the different prompts that prompt generator would, in its finished state, be able to generate. I used
an ordered list simply because I enjoy being able to number the features somewhere. 

```html
<font size="4">
    <div class="col-sm-6">
        <p>
        Prompt generator is a program that uses a series of machine learning methods and a context free grammar
        to generate the following types of story prompts.
        <ol>
            <li>
                Concept prompts.
            </li>
            <li>
                Character prompts.
            </li>
            <li>
                Setting prompts.
            </li>
            <li>
                Sentence prompts.
            </li>
            <li>
                Style prompts.
            </li>
            <li>
                Markov Chains.
            </li>
        </ol>
        </p>
    </div>
</font>
```

I also an image on the other side. While this might not be an ideal place for it, it is an image of mine I truely 
like and I wanted to make sure I was able to add images to by webpage.

```html
<p class="col-sm-4"  style="text-align: center;" >

    <img src="20160808232039_1.png" alt="You shouldn't see this.'" style="width:360px;height:220px;">

</p>
```
### Subpage 2

This page explains how prompt generator works/will work. It also lists a few other features that, while not necessary, I would 
also like to add in the future. 

```html
<font size="2">
    <div class="col-sm-6">
        <p>
            <font size="2">
                The prompts are generated using several different methods, both by machine learning and
                traditional coding. With machine learning, two different approaches are taken, LSTM, and Markov chains.
                LSTM, or Long Short Term Memory, is an improved type of Recurrent Nerual Network that is
                particularly good at learning grammar. This is used for a large number of the machine learning
                generated prompts. Markov chains have their own advantages. While their generation of
                sentences are less sophisticated, it is easy to have them follow the style of a certain writer or
                book. However, since neither method always generates valid sentences, the generated sentecnes
                are parsed out and compared against a context free grammar of the english language. Any invalid
                sentences are filtered out through this process.
                </font>
        </p>
        <p>
            <font size="2">
                Prompt generator is still a work in progress, so many of these features are still either just a 
                concept, or only partially functional. Here is a list of features we hope to have in the 
                future.
            </font>
        </p>
        <p>

        <Ul>
            <li>
                Map generation. (City and world.)
            </li>
            <li>
                Sharing prompts via social media sites.
            </li>
            <li>
                Prompt saving.
            </li>
        </Ul>
                    
        </p>

    </div>
</font>
<div class="col-sm-4" style="text-align: center;" >

        <img src="20160808232039_1.png" alt="You shouldn't see this.'" style="width:360px;height:220px;">

    <p>
        <font size="2">
        All machine learning techniques are coded in python using the tensorflow library.
        <font size="2">
    </p>
</div>
```
### Subpage 3

This page is just shameless self promotion for the site. Nothing special about it really, but I feel like every website needs 
a page like this. 

```html
<font size="2">
    <div class="col-sm-6">
        <p>
            <font size="2">
                Unlike other websites designed for the storage of prompts, prompt generator generates unique 
                prompts with each visit. This means that no other user has received the same prompts as you.
                This leads to me unique and original story ideas and executions. Prompt generator also hosts
                a multitude of other features such as a character creating suite and writing tips that can
                help ease the writing process.
            </font>
        </p>
        <p>
            <font size="2">
                Prompt generator is a free service and we intend to keep it that way. 
                Of course, there are a number of ways you can help contribute to the continued support and creation
                of prompt generator. No, we aren't asking for you money, but here's a list of things you can do.
            </font>
        </p>
        <p>

        <dl>
            <li>
                Report inapproriate or nonsensical prompts and sentences.
            </li>
            <li>
                Tell your friends about prompt generator.
            </li>
            <li>
                Continue to use our service.
            </li>
        </dl>
                    
        </p>

    </div>
</font>
<p class="col-sm-4"  style="text-align: center;" >

    <img src="20160808232039_1.png" alt="You shouldn't see this.'" style="width:360px;height:220px;">

</p>
```
### Subpage 4

This final page is about me, the author. However, I'm not big on putting out my information on the internet, nor do I think that it 
matters who created the website. So, I gave no information, and no image. Perhaps later I'll add information here, but I this page
sums up my opinion of that. 

```html
<font size="2">
    <div class="col-sm-9">
        <p>
            <font size="2">
                You don't need to know anything about me other than that I like to write and I like to
                code and decided to see if I could mix the two in this website.
            </font>
        </p>
    </div>
```

##	Step 3: CSS

I did very little work with the css file in this first homework. I mostly used the features in bootstrap for this project, but there were a few
things I added on my own. I added a small buffer to all div's, and I made paragraphs properly indented.

```css
div.padding {
    padding-left: 1cm;
}
p {
    text-indent: 50px;
}
```

