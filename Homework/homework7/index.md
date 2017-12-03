---
title: Homework 6
layout: default
---
# Homework 7

Lab was using web API and AJAX to create a page for browsing GIFs.

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW7.html)

[Web Page Code](https://github.com/Hindelburg/Homework7)

##	Step 1: The View

I know that traditionally it is a bad idea to start with the view. You're generally supposed to start with tbe data, then the controller, and work your way to the visuals.
Hoever, when I started coding I didn't really know what I wanted this to do as a whole. I knew the general concept of what I needed done, but not specifics.
Normally, you should play this out before hand, think before you code, but honestly I was short on time. The quarter had been busy and I was running short on time. So
instead of doing work before hand, I started making the view so I would be able to figure out what it needed to do before I got to the functionality. 

Here's the basic body of the view.

```html
<body>
    <center>
        <h1 class="Title">Search Giffy!</h1>
        <div>
            <input type="text" id="searchFor" />
            <button type="button" id="getter" onclick="requesting()">Search!</button>
            <br />
            Animated: <input type="checkbox" id="animated" />
            <form>
                Rating: G<input type="radio" name="rate" id="g" />
                PG<input type="radio" name="rate" id="pg" />
                PG-13<input type="radio" name="rate" id="pg13" />
                R<input type="radio" name="rate" id="r" />
            </form>
        </div>

        <div id="test">

        </div>
    </center>
</body>
```
As you can see from this view, I wanted to be able to differentiate ratings in my searches and be able to return either animated or static gifs. The name of the method
called by the button was added in later, as was styling via a CSS document.

Note: I also removed the navbar from the shared layout.

##	Step 2: Controller

Here's the controller. I'll break it into parts as I cover it.

```cs
public ActionResult Find(string search, string rating, string userAgent)
{
    string s = "https://api.giphy.com/v1/gifs/search?api_key=" + System.Web.Configuration.WebConfigurationManager.AppSettings["test"] + "&q=" + search + "&limit=25&offset=0&rating=" + rating + "&lang=en";
    Debug.WriteLine(s);


    WebRequest request = WebRequest.Create(s);
    WebResponse response = request.GetResponse();
    Stream dataStream = response.GetResponseStream();
    StreamReader reader = new StreamReader(response.GetResponseStream());

    string response2 = reader.ReadToEnd();

    Debug.WriteLine(response2);

    //JObject result = JObject.Parse(response2);

    //Debug.WriteLine(result);


    var test = new JavaScriptSerializer().DeserializeObject(response2);

    Debug.WriteLine(test);

    reader.Close();
    response.Close();

    JsonResult errorMessage = Json(test, JsonRequestBehavior.AllowGet);

    Debug.WriteLine(errorMessage);


    string searched = search;
    DateTime dateSearched = DateTime.Now;
    string requestorIP = Request.UserHostAddress.ToString();
    string requestorAgent = userAgent;

    if(requestorIP == null)
    {
        requestorIP = "Not Available.";
    }
    if (requestorAgent == null)
    {
        requestorAgent = "Not Available.";
    }

    Debug.WriteLine(requestorAgent);

    var logEntry = new Log();
    logEntry.searched = searched;
    logEntry.dateSearched = dateSearched;
    logEntry.requestorIP = requestorIP;
    logEntry.requestorAgent = requestorAgent;

    db.Logs.Add(logEntry);
    db.SaveChanges();


    return Json(test, JsonRequestBehavior.AllowGet);
}
```

So for starters, you can see how I used the web config file to hide my API key outside of my repository. I also inluded the rating which was collected by the radio buttons.

```cs 
string s = "https://api.giphy.com/v1/gifs/search?api_key=" + System.Web.Configuration.WebConfigurationManager.AppSettings["test"] + "&q=" + search + "&limit=25&offset=0&rating=" + rating + "&lang=en";
Debug.WriteLine(s);
```

After that, there's some lines that create the web request and get the response. I think that code is self explanitory so I won't cover it here.

This section was added slightly later in the timeline, after I had created the up.sql and down.sql files. It collects some of the data needed for the log. 

```cs
string searched = search;
DateTime dateSearched = DateTime.Now;
string requestorIP = Request.UserHostAddress.ToString();
string requestorAgent = userAgent;

if(requestorIP == null)
{
    requestorIP = "Not Available.";
}
if (requestorAgent == null)
{
    requestorAgent = "Not Available.";
}

Debug.WriteLine(requestorAgent);

var logEntry = new Log();
logEntry.searched = searched;
logEntry.dateSearched = dateSearched;
logEntry.requestorIP = requestorIP;
logEntry.requestorAgent = requestorAgent;
```

Then, in the end, instead of returning a view I returned a JSON object where "test" is the returned object deserialized and then reserialized for javascript.

```cs
return Json(test, JsonRequestBehavior.AllowGet);
```

## Step 3: Javascript

```js

var httpRequest;
//document.getElementById("getter").addEventListener('click', requesting);

function requesting() {

    var rating;
    if (document.getElementById('g').checked == true) {
        rating = "G";
    }
    else if (document.getElementById('pg').checked == true) {
        rating = "PG";
    }
    else if (document.getElementById('pg13').checked == true) {
        rating = "PG-13";
    }
    else if (document.getElementById('r').checked == true) {
        rating = "R";
    }
    else {
        rating = "G";
    }

    $.ajax({
        url: "Home/Find",
        type: "Get",
        data: {
            search: (document.getElementById('searchFor').value),
            rating: rating,
            userAgent: navigator.userAgent
        },
        success: function (data) { 
            $('img').remove();

            data.data.forEach(function (item) {
                if (document.getElementById('animated').checked == true){
                    $('#test').append(`<img style="background-color: black; padding: 5px 5px 5px 5px; margin: 10px 10px 10px 10px;" src="${item.images.fixed_height.url}" id="tmp">`);

                }
                else {
                    $('#test').append(`<img style="background-color: black; padding: 5px 5px 5px 5px; margin: 10px 10px 10px 10px;" src="${item.images.fixed_height_still.url}" id="tmp">`);
                }
            })
        }
    });
}
```

Once again, starting at the top and working down, the first section of if else statements simply sets the rating based off of the radio boxes. If none were selected, I 
play it safe and set it to G.

```js
var rating;
if (document.getElementById('g').checked == true) {
    rating = "G";
}
else if (document.getElementById('pg').checked == true) {
    rating = "PG";
}
else if (document.getElementById('pg13').checked == true) {
    rating = "PG-13";
}
else if (document.getElementById('r').checked == true) {
    rating = "R";
}
else {
    rating = "G";
}
```

Then we get to the real meat of this thing, the ajax object. I'll explain this bit by bit.

The url refers to the method and controller being called.

The type is self explanitory.

The data is essentially the parameters being passed.

"Success:" shows what happens if the function is successful. I don't have very good error checking so I have nothing for if it fails. In this success area, I start out by
removing any images that already exist from possible previous searches. Then, I iterate through the data, generating and image for each item in the data. I added just a tiny
amount of styling here so it wouldn't look hideous, but I didn't spend too much time on it. I didn't have much time to spare, and I actually liked the somewhat oddball
look of the array it returned.

```js
$.ajax({
    url: "Home/Find",
    type: "Get",
    data: {
        search: (document.getElementById('searchFor').value),
        rating: rating,
        userAgent: navigator.userAgent
    },
    success: function (data) { 
        $('img').remove();

        data.data.forEach(function (item) {
            if (document.getElementById('animated').checked == true){
                $('#test').append(`<img style="background-color: black; padding: 5px 5px 5px 5px; margin: 10px 10px 10px 10px;" src="${item.images.fixed_height.url}" id="tmp">`);

            }
            else {
                $('#test').append(`<img style="background-color: black; padding: 5px 5px 5px 5px; margin: 10px 10px 10px 10px;" src="${item.images.fixed_height_still.url}" id="tmp">`);
            }
        })
    }
});
```
## Step 4: Log

Here's the up.sql file for the database that holds a log of searches. Pretty simple, pretty easy. Just one table and that's it. I auto generated the context model and whatnot for it
so no need to show that. 

```sql
CREATE TABLE dbo.Logs(
	id				int				IDENTITY(1,1) NOT NULL PRIMARY KEY,
	searched		varchar(128)	NOT NULL,
	dateSearched	dateTime		NOT NULL,
	requestorIP     varchar(128)	NOT NULL,
	requestorAgent  varchar(808)	NOT NULL
)
```

## Screenshots:

This are examples of the website being used. 

[Screenshot](Untitled.png)
[Screenshot](Untitled2.png)
[Screenshot](Untitled3.png)
[Screenshot](Untitled4.png)