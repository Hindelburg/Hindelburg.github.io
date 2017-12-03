---
title: Homework 6
layout: default
---
# Homework 8

This assignment was to create a simple page where you can view a list of artworks, artists, and genres. Also, you can CRUD (create, read, update, and delete) artists or view artworks by genre. \

Now before I get into this one, I'll let you know that it is going to be slightly different. Normally I do a bit of an overview of what I did, talking about the specifics only in places that I think are of 
interest. This time, however, I'm going to go into great detail on EXACTLY how I did everything. The buttons I pressed, the order in which I pressed them, everything. I want this so I have a really
detailed reference for the final. It might be a bit tedious, and I apologize for that, but I simply don't have time to write a detailed one and a summerized one.

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW8.html)

[Web Page Code](https://github.com/Hindelburg/Homework8)

## Step 1: Creating the Project.

I opened up visual studios 2017 and clicked "File" in the top left corner. Then new, and project. From the menu, I clicked "Visual C#" on the left, then selected 
"ASP.NET Web Application (.NET Framework)" from those listed. Here I named it "HW8-1" because the last lab I had to do multiple times so I thought I might as well start numbering them now.

When you press okay, another menu pops up. Select MVC and Web API from the check boxes, and empty from the templates. Press okay. Generating this will take a painfully
long time. I probably need a faster computer (specifically my hard drive, mine is super slow). 

## Step 2: Creating the Databse.

Go to your SQL Server Object Explorer, which can be found under view, and expand "DESKTOP...", which is the name of the SQL Server I'm using. Right click the databases folder and add new database.
Give it a semi-stupid name, in this case, I named it "Artabase", a combination of "Art" and "Database". I was bored, alright?

## Step 3: Creating the Tables.

Now I navigated to my repository that's in the "C:\Users\lego_\source\repos" folder. Go to App_Data and create a new text file called "up.sql" and another called "down.sql". Go back to visual studio.

Right click on App_Data again and select add, existing item. Select one of these .sql files, and then do the same for the other. Open the up.sql in visual studios. 
Connect to your database using the symbol to the left on the checkmark. Pretty self explanitory there, select the server then the database by name. Now that you've connected, you can write the script.

Here's the code for my up.sql.

```sql
CREATE TABLE Artists(
	id		int	IDENTITY NOT NULL,
	aName	varchar(100) NOT NULL,
	DOB		date		 NOT NULL,
	city	varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Artworks(
	id		int IDENTITY NOT NULL,
	aName	varchar(100) NOT NULL,
	idA		int			 NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (idA) REFERENCES Artists(id)
);

CREATE TABLE Genres(
	id		int IDENTITY NOT NULL,
	gName	varchar(100) NOT NULL
	PRIMARY KEY (id)
);

CREATE TABLE Classifications(
	id		int IDENTITY NOT NULL,
	idA		int			 NOT NULL,
	idG		int			 NOT NULL,
	FOREIGN KEY (idA) REFERENCES Artworks(id),
	FOREIGN KEY (idg) REFERENCES Genres(id),
	PRIMARY KEY (id)
)

INSERT INTO dbo.Artists(aName, DOB, city) VALUES
	('M.C. Escher', '06/17/1898', 'Leeuwarden, Netherlands'),
	('Leonardo Da Vinci', '05/02/1519', 'Vinci, Italy'),
	('Hatip Mehmed Efendi', '11/18/1680', 'Unknown'),
	('Salvador Dali', '05/11/1904', 'Figueres, Spain')
GO

INSERT INTO dbo.Artworks(aName, idA) VALUES
	('Circle Limit III', 1),
	('Twon Tree', 1),
	('Mona Lisa', 2),
	('The Vitruvian Man', 2),
	('Ebru', 3),
	('Honey Is Sweeter Than Blood', 4)
GO

INSERT INTO dbo.Genres(gName) VALUES
	('Tesselation'),
	('Surrealism'),
	('Portrait'),
	('Renaissance')
GO

INSERT INTO dbo.Classifications(idA, idG) VALUES
	(1, 1),
	(2, 1),
	(2, 2),
	(3, 3),
	(3, 4),
	(4, 4),
	(5, 1),
	(6, 2)
GO
```

Using this code as a guildeline, you should be able to create your own relational tables easily, as well as populate it with some initial entries. Note the order in which I do that as well, making sure
to create those that do not relay on others first. This is very important.

Connect your down.sql file the same way as you did the up.sql file. Simply add a "DROP TABLE tableName" line for each table in your database. It is important that you do this in the opposite order to which
you created them in. Here's mine:

```sql
DROP TABLE Classifications;
DROP TABLE Genres;
DROP TABLE Artworks;
DROP TABLE Artists;
```

## Step 4: Git

Now it's about time we made a git repository. Perhaps I should have done that sooner, but I think that now's the first time that I actually have something worth saving on it.
So, open up the windows command line. Type cd C:\Users\lego_\source\repos\HW8-1 (though adjust this for your repository directory, this just happens to be mine). 

Now type "git init".

Before you add anything though, you need a .gitignore. Now I couldn't get one to generate ever, so I found one online. If you don't have one, I don't know how to help you other than suggest you do the same.
If you DO have one though, just copy and paste it into your repository. I keep one in my repos folder just for this. 

Now type "git add ."

Then type "git status" to make sure that nothing that should not have been added has been added. Everything looks good, so I'm gonna commit.

"git commit -m "Initial commit."

Now if you accidently forget a message, type in :q! and press enter. This will quit out of the hellish editor that automatically opened. (Why can't I just type quit or something like a normal program?)

Next thing you want is a feature branch. Type in "git branch feature" and then "git checkout feature". You're now on the feature branch. You can change the name from
feature to whatever you want, but I keep it simple here.

Periodically add and commit to this branch. I'll return to git later to show you how to push it to your online git account and how to merge back to the maaster branch.

## Step 5: DbContext

Next we want to create the DbContext file. Right click of Models, then add, new item. Go to "Data" on the left and then select "ADO.NET Entity Data Model" from the options. 
Call it dbContext.

Select Code First from Database. Now you're gonna need a new connection, so click on that. You'll have to type in the server name exactly because it won't come up as an option, trust me.

Then select your database from the dropdown list, and test connection. If it doesn't work you probably got the name wrong, or maybe you're just screwed. You DO want it to save your connection setting in web.config as the default.

Allow it do pluralize and singularize as it wants, and select ALL the tables and press Finish. It might take it a bit to do its thing here, so be patientish. This will make all the models you will need (beside view models).

## Step 6: Home Controller

Simply right click the controllers folder, add, controller. Select an empty controller and call it "HomeController". Just leave it as it is for now, we'll return to it in a minute.

## Step 7: Index Home View

You guessed it, right click on the home folder in Views, and add a new view. Let it use the layout page, and call it Index. At this point, test your code to make sure it runs, and also commit it to git if it does.

## Step 8: View Models

I was going to jump straight to step 9 here, but I realised that we were going to need some viewmodels to get want we want from the views. So right click Models and add a new folder called "ViewModels".

Right click this new folder and add a class called "ArtistArtowrkVM". VM stands for view model, and Artist Artwork tells you want models it can hold. 

Here's the code I typed into mine, pretty obvious why.

```cs
public Artist artist = new Artist();
public Artwork artwork = new Artwork();

public ArtistArtworkVM(Artist artistP, Artwork artworkP)
{
    artist = artistP;
    artwork = artworkP;
}
```

We also make one called "GenreArtworkVM" that is basically the same thing.

```cs
public class GenreArtworkVM
{
    public Genre genre = new Genre();
    public Artwork artwork = new Artwork();

    public GenreArtworkVM(Genre genrep, Artwork artworkP)
    {
        genre = genrep;
        artwork = artworkP;
    }
}
```

Along with adding this code, I also changed the namespace to not include .ViewModels. Now we have the viewmodels we'll need.


## Step 9: Returning to the Home Controller

We know we're gonna need some more pages to go to, so we're gonna add the action methods for those now. We are NOT going to make one for artists because it says later in this lab that we'll be using CRUD, are we want
to auto generate that stuff. 

This is what we will add. 

```cs
// GET: Artworks
public ActionResult Artworks()
{
    var tmp = db.Artworks;
    List<ArtistArtworkVM> arts = new List<ArtistArtworkVM>();

    foreach (var i in tmp)
    {
        arts.Add(new ArtistArtworkVM(db.Artists.Where(s => s.id == (i.idA)).FirstOrDefault(), i));
    }

    return View(arts);
}

// GET: Classifications
public ActionResult Classifications()
{
    var tmp = db.Artworks;
    List<GenreArtworkVM> classies = new List<GenreArtworkVM>();

    foreach (var i in tmp)
    {
        classies.Add(new GenreArtworkVM(db.Genres.Where(s => s.id == (db.Classifications.Where(d => d.idA == i.id)).Select(f => f.idG).FirstOrDefault()).FirstOrDefault(), i));
    }

    return View(classies);
}
```

## Step 10: More Views

Next you want to add the two views you made controller actions for. Add them both to the home folder, you've done it before this tutorial so I want step you through it again.

Name one Artworks, and another Classifications.

Here's the code for Artworks.

At the top it tells you that you'll be getting an enuerable of ArtistArtworkVM's. and then we iterate through this model to generate a table of data for it. (You'll probably want
to change teh headers of the table, mine are pretty ugly here.)

```html
@model IEnumerable<HW8_1.Models.ArtistArtworkVM>

@{
    ViewBag.Title = "Artworks";
}

<h2>Artworks</h2>


<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.artwork.aName)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.artist.aName)
        </th>
    </tr>

    @foreach (var item in Model)
    {
        <tr>
            <td>
                @Html.DisplayFor(model => item.artwork.aName)
            </td>
            <td>
                @Html.DisplayFor(model => item.artist.aName)
            </td>
        </tr>
    }
</table>
```

Classifications looks pretty much the same.

```html
@model IEnumerable<HW8_1.Models.GenreArtworkVM>

@{
    ViewBag.Title = "Classifications";
}

<h2>Classifications</h2>


<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.artwork.aName)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.genre.gName)
        </th>
    </tr>

    @foreach (var item in Model)
    {
        <tr>
            <td>
                @Html.DisplayFor(model => item.artwork.aName)
            </td>
            <td>
                @Html.DisplayFor(model => item.genre.gName)
            </td>
        </tr>
    }
</table>
```

## Step 11: _Layout.cshtml

What you should be noticing now is that the main page doesn't have links to our other pages. What were we thinking? Well, like most smart people, I wanted to add it to the shared layout page instead. 
(I might sound a bit condesending at times, but I'm mostly writing this for myself for the final, and I know that me during a test can be pretty dumb.) 

Open up this file and add some links directly below the <div> that is being used to store the one action linke that already exists.

Here's mine.

```html
<div>
    @Html.ActionLink("Artworks", "Artworks", "Home", new { area = "" }, new { @class = "navbar-brandS" })
    @Html.ActionLink("Classifications", "Classifications", "Home", new { area = "" }, new { @class = "navbar-brandS" })
</div>
```

Also, change anything that says "Application Name" to something better. I changed mine to "That Art Website". 
Now try it out!

If it works, commit it to git. 

## Step 12: CSS

I know that CSS stuff isn't "needed" but let's be honest, it's really ugly right now. I'm not sure why, but I know I had a reason. I added to the bootstrap.min.css file instead of making a new one.

I added the following:

```css
.navbar-brandS {
    float: left;
    padding: 15px 15px;
    font-size: 14px;
    line-height: 20px;
    color: grey;
}
.navbar-brandS {
    color: #777777;
}
```

However, do NOT do this. Add it to the site.css file like you're supposed to. It will work there too! This sis also why we gave our action links those classes, so it would apply to them. It isn't perfect, but 
it's an improvement.

## Step 13: Artists

It should be obvious that I've been avoiding talking about or doing anything with the artists, but it's time we do that. Right click controllers and add a new controller with views, using Entity Framework.

For model, select Artist, for context class, select dbContext. Everything else should work with the defaults.

It may take a while, but give it time, it will still save you a TON of time.

Once it is done generating, go back to the shared layout and add another ActionLink, like so:

```html
@Html.ActionLink("Artists", "Index", "Artists", new { area = "" }, new { @class = "navbar-brandS" })
```

This is all swell and good, probably change it to not say "index" in the Artists>Index.cshtml file. But now, we're almost done. Let's real quick add some attribute checking.

## Step 14: Attribute Checking

Okay, so this should be easy. Double click Artist in the models. You'll see that everything already have some auto attribute checking, but we want to modify it. Go to name and limit the StringLength to be 50
instead of 100 (probably should have done that in the database, but oh well). Now add Required to date, and you're done! Wait, no, you aren't. You have to make sure the date isn't in the future. That's gonna be more involved than the others. 

Make a new class in the models folder and call it RestrictedDate.

First thing, add "using System.ComponentModel.DataAnnotations;" to the top of the file. Then, add : Validation after restricted date. Now, what we need is a method called "IsValid" that takes an object and
returns a boolean value. Here's how I went about doing that.

```cs
public override bool IsValid(object date)
{
    DateTime date2 = (DateTime)date;
    return date2 < DateTime.Now;
}
```

Simple, easy, compares the date given to today's date. If today is bigger, then boom, it return true and you're good. Now just go back to Artists and add "[RestrictedDate]" to be right below required.

Attribute checking, actually done!

## Step 15: Razor

Of course, we can't be done yet, we haven't touched the home/index page! Before I go into actually changing that view, we're gonna have to do some javascript and change the HomeController.

Starting with the home controller, we need to add a new action method. This method will take a key for the genre (so I don't have to make a ton of methods) and return a json object.

```cs
public ActionResult Get(string keyG)
{
    var keyG2 = Convert.ToInt32(keyG);
    List<string> arts = new List<string>();
    arts = db.Artworks.Where(s => db.Classifications.Where(a => a.idG == keyG2).Select(d => d.idA).ToList().Contains(s.id)).Select(f => f.aName).ToList();
                
    return Json(arts, JsonRequestBehavior.AllowGet);
}
```

This simply gets the name of all the artworks that are this genre. Now, I tried to return the whole artwork but that WOULD NOT WORK. I did everything I could but to no avail, so
if I have to get more than just the name during the final, I'm gonna have to cheese it a bit, maybe use some sort of view model or something. Oh well, this worked here and that's enough
for now.

To make the javascript file, I had to go to the directory in file explorer and create a new text document called "script.js". Then, I added it to the scripts folder same way I did before with the .sql files.

Here, I needed a function that took a key and appended some things as a result. Everything here is done in a ajax objext. The URL is the method being used, get is the type of method
and data is the parameters for the method. When it succeeds, it does the following. It removes any tmp things on the page and appends a new temporary unordered list.
Then, for each string in the data, it appends a list element to this unordered list. Viola! Magic!

```js
function cat(key) {
    $.ajax({
        url: "Home/Get",
        type: "Get",
        data: {
            keyG: key
        },
        success: function (data) { 
            $('#tmp').remove();
            $('#test').append(`<ul id="tmp"></ul>`);

            $.each( data, function (i, item) {
                $('#tmp').append(`<li>` + item + `</li>`);
            })
        }
    });
}
```
In the head of your layout file, add "    <script src="~/Scripts/script.js"></script>" so that your script can be accessed.

Only one thing left now, and that's changing the index file. Here's what I did.

```html
@{
    ViewBag.Title = "Index";
}

<div>
    <button type="button" id="getter" onclick="cat(1)">Tesselation</button>

    <button type="button" id="getter" onclick="cat(2)">Surrealism</button>

    <button type="button" id="getter" onclick="cat(3)">Portrait</button>

    <button type="button" id="getter" onclick="cat(4)">Renaissance</button>
</div>


<div id="test">

</div>
```

Each of the buttons calls the same javascript method, cat, but with a different parameter.I also have a <div> with the id="test" so that I can append my list to it with my cat method.

## Step 16: Commit to git and enjoy!

# WAIT!!!!!!!!!!!!!!!!!!!!!!

DO NOT DO THIS! THIS IS A MISTAKE! Okay, that hopefully caught your attention. Doing what follows is fine, but first make sure you don't have it open in a windows file explorer, and make a copy of the whole repo.
While typing this, I almost lost everything because I didn't back it up and git just about ate it (which has happened many a time). 

Okay, resuming what I was going to say.

After this, I'm assuming you immediately added and commited to git. Now you have to push it.

Go to your github repositories and press the green "new" button on the right and give it a funny name (mine was boring, but you COULD have done a funny one). follow the steps it gives, I.E. 
run the commands for pushing and existing repo. Instead of pushing master, push your feature branch. Then, merge with master and push master.



## Screenshots:

These are examples of the website being used. 

[Screenshot](Untitled.png)
[Screenshot](Untitled2.png)
[Screenshot](Untitled3.png)
[Screenshot](Untitled4.png)