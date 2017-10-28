---
title: Homework 4
layout: default
---
# Homework 4

The main objective of this homework was to create a webpage using ASP.NET MVC 5 that uses both GET and POST methods, as well as the ViewBag.

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW4.html)

[Web Page Code](https://github.com/Hindelburg/Homework4)

##	Step 1: New Repository 

I created a whole new repository for Homework 4. While with previous projects I had put them all in the same
repository but in different folders, but I was inexperience with git and my repositories quickly became messy.
So I started over from scratch (multiple times) and got one that, in my opinion, looks much better.

It is also important to note that I had to use ```bash git config --global core.autocrlf false``` to make it work
with Visual Studios. Otherwise, it wouldn't let me open my project after merging a branch. 

## Step 2: Creating Main Page and Controller

First I created the HomeController, and immediately created the home view after that, calling it "Index.cshtml" for obvious reasons. 

I inserted the following into the view:

```cshtml
<ul>
    <li>@Html.ActionLink("Page 1", "Page1")</li>
    <li>@Html.ActionLink("Page 2", "Page2")</li>
    <li>@Html.ActionLink("Page 3", "Page3")</li>
</ul>
```

And then one of these for each of the different methods. (Obviously changing the names as need be.)

```cs
[HttpGet]
public ActionResult Page2()
{
    ViewBag.RequestMethod = "GET";
    return View();
}
```

These would return views that are named the same as them, but since none of those existed yet, the links were all broken.

After that I just merged this branch back into the master branch and made a new branch called f1calc.

## Step 3: Creating View for Page1.

For this page, I kept it simple and did a temperature conversion calculator. I wanted to do something more unique, but with
the amount of work I'm trying to keep up with I thought it best to keep it a bit simpler. 

In the page1 view, I had the following form.

```cshtml
<form method="get" action="Page1">
    <label for="temp1">temperature</label>
    <input type="number" name="temp1" value=""/>
    <label for="to">to</label>
    <input type="text" name="to" value="" />
    <input type="submit" name="submit" value="Submit" />
</form>
```

This calls the Page1 action method in the home controller. Then, to get the answer, I had the following segment.

```cshtml
<p>
    Answer: @ViewBag.Message
</p>
```

In the home controller, I changed the page1 method to do a simple calculation for the conversion, but I'm going to
ommit that because it really isn't significant to this assignment. However, the following code snippit is.
It shows how I got information from the query string.

```cs
string text = Request.QueryString["temp1"];
string to = Request.QueryString["to"];
ViewBag.RequestMethod = "GET";
```

And then, to give the answer back:

```cs
ViewBag.Message = answerText;
```

## Step 4: Page 2

For page 2, I created another view. It was extreamly similiar to page 1's view with the small adjustment that
instead of the method="get" I had method="post". 

In the home controller, I created a second page2 method of type [HttpPost].

Instead of getting information from the query string, I did the following.

```cs
string value = Request.Form["amount"];
string from = Request.Form["from"];
string to = Request.Form["to"];
```

The rest of the code is not noteworthy for this assignment.

## Step 5: Page 3

For the last page, page 3, the main objective was to use model binding. In the home controller, I created a post
method for page3 with the following header.

```cs
[HttpPost]
public ActionResult Page3(double amount, double iRate, double tLength)
```

Since the names matched up with those from my form element, it automatically binded them for me.
The only other important thing I did in this one was return two values through the viewbag.
I did that with the following.

```cs
ViewBag.Month = p + "";
ViewBag.Total = p * n + "";
```

## Screenshots:

This are examples of the program being used. 

[Screenshot](Untitled.png)
[Screenshot](Untitled2.png)
[Screenshot](Untitled3.png)