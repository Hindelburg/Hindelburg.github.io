---
title: Homework 1
layout: default
---
# Homework 1 

The objective for this assignment is to create a website using HTML. CSS files are used for styling, primarily 
Bootstrap, which is a common CSS file for web developement. Along with HTML and CSS, we are using Git, which 
can be used for version control in a project.

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

##	Step 2: HTML
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

```html
    <html>
    <title>
        Story Prompt Generator V0.0
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <head>
        <link rel="stylesheet" href="w3.css">
    </head>
```

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
            

            <!--Buttons-->
            <font size="5">
                <div class="col-sm-2" style="background-color:lightgray">
                    <a href="eta" class="button">
                        Concepts
                    </a>
                    <br />
                    <a href="eta" class="button">
                        Sentences
                    </a>
                    <br />
                    <a href="eta" class="button">
                        Characters
                    </a>
                    <br />
                    <a href="eta" class="button">
                        Settings
                    </a>
                    <br />
                    <a href="eta" class="button">
                        Styles
                    </a>
                    <br />
                    <a href="eta" class="button">
                        Chains
                    </a>
                    <br />
                </div>
            </font>

            
            <!--Block Text-->
            <div>
                <p class="col-sm-10">
                    To use prompt generator, select which style of story prompt you want to have generated on the 
                    left side. None of these links are yet operational due to the actual prompt generating
                    software is still in developement.
                </p>
            </div>
        </div>

        <div style="position: absolute; bottom: 5px; background-color: white">
            wleingang15@mail.wou.edu
        </div>
    </div>
    </body>
</div>
```

##	Step 3: CSS




