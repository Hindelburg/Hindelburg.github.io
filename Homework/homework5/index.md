---
title: Homework 5
layout: default
---
# Homework 5

The main objective of this homework was to create a webpage using ASP.NET MVC 5 that uses both GET and POST methods, as well as the ViewBag.

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW4.html)

[Web Page Code](https://github.com/Hindelburg/Homework5)

##	Step 1: New Repository 

From here on out I'm creating a new repository for every individual homework. I think this will make things a bit cleaner and easier to follow.

## Step 2: Creating Main Page

I created a main page that had links to the other pages. Not really any noteworth code in this section.  
The links were all broken at the start because no other views existed at this point.

## Step 3: Creating a Database

Next I added a database named Database1 (very creative, I know) to the App_Data folder. Also in this folder I added the
up.sql and down.sql files. Note that the following queries are the final version, not what I initially made. It took several
version for me to get everything working properly. 

###up.sql
```sql
CREATE TABLE dbo.Addresses(
	id			 int			IDENTITY NOT NULL PRIMARY KEY CLUSTERED (ID ASC),	
	customerNum	 int			NOT NULL,
	dob			 date			NOT NULL,
	currentDate	 date			NOT NULL,
	fullName	 varchar(100)	NOT NULL,
	city		 varchar(100)	NOT NULL,
	st			 varchar(100)	NOT NULL,
	zip			 int			NOT NULL,	 
	street		 varchar(100)	NOT NULL
);

INSERT INTO dbo.Addresses (customerNum, dob, currentDate, fullName, city, st, zip, street) VALUES
	(1200, '01/10/1998', '1/1/1999', 'April Thew', 'Seattle', 'WA', 23687, 'Mountainton Drive'),
	(4370, '01/09/1973', '1/1/1999', 'Alyssa Watts', 'Monmouth', 'OR', 348774, 'Sampal Street'),
	(5489, '01/11/1920', '1/1/1999', 'Leroy Brown', 'Monmouth', 'OR', 346733, 'Heilk Road'),
	(5893, '01/02/1989', '1/1/1999', 'Zachariah Comstock', 'Columbia', 'NA', 854434, 'Comstock Drive'),
	(8342, '01/12/2001', '1/1/1999', 'Booker Dewitt', 'Rapture', 'NA', 000000, 'Webster Road')
GO
```

###down.sql
```sql
DROP TABLE Addresses;
```

One extra note. I tried to make it so that the "currentDate" would automatically be filled with the current date, which seemed simple enough.
However, it seemed to think it was null despite me following both the example in class for calculated values and some tutorials, so I gave up on
it and made the user write it in just as they would with the paper copy.

## Step 4: Model and Context

First, I attempted to create the context, however, I ran into some difficulties with that and skipped ahead to the model since I didn't see them having
any dependencies in creation order. At first, I only created the standard get and set methods, but later I added display names. Here's the finish version.

Address.cs
```cs
namespace WebApplication4.Models
{
    public class Address
    {
        [Display(Name = "ID")]
        public int id { get; set; }
        [Display(Name = "Customer Number")]
        public int customerNum { get; set; }
        [Display(Name = "DOB")]
        public DateTime dob { get; set; }
        [Display(Name = "Full Name")]
        public string fullName { get; set; }
        [Display(Name = "City")]
        public string city { get; set; }
        [Display(Name = "State")]
        public string st { get; set; }
        [Display(Name = "Zip Code")]
        public int zip { get; set; }
        [Display(Name = "Street")]
        public string street { get; set; }
        [Display(Name = "Current Date")]
        public DateTime currentDate { get; set; }
    }
}
```

I then returned to working on the AddressContext.cs file. I discovered my problem was because I didn't have DbContext because I did not have
entity framework installed. So, I looked it up online, and found I could easily get it with NuGet. So I opened it up as a console and typed in 
"install-package EntityFramework". After a quick restart of Visual Studios, that fixed my problems. 

```cs 
namespace WebApplication4.DAL
{
    public class AddressContext : DbContext
    {
        public AddressContext() : base("name=OurDBContext")
        { }

        public virtual DbSet<Address> Addresses { get; set; }
    }
}
```

## Step 5: Web.config

this part was easy, I added the following to the configuration section of the Web.config file. 

```config
  <connectionStrings>
    <add name="OurDBContext" connectionString="Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\lego_\source\repos\WebApplication4\WebApplication4\App_Data\Database1.mdf;Integrated Security=True" providerName="System.Data.SqlClient"/>
  </connectionStrings>
```

I couldn't find exactly what this string should look like, so I used the one from the classes repository as a base and made modifications that were obviously needed.

## Step 6: Controller Additions

The next step was adding new methods for each page in the HomeController.cs file. The first method listed in for adding
to the table. The second is for viewing everything in the table. This method is where I had the issues that forced me to not
have currentDate automatically filled in. 

```cs
[HttpPost]
public ActionResult Add([Bind(Include = "customerNum,dob,currentDate,fullName,city,st,zip,street")] Address address)
{
    if (ModelState.IsValid)
    {
        db.Addresses.Add(address);
        db.SaveChanges();
        return RedirectToAction("List");
    }
    return View(address);
}

public ActionResult List()
{
    return View(db.Addresses.ToList());
}
```
### Step 7: Views.

The add view for this is fairly simple, however, it was also very long, so I'm going to just include one example of a form element instead of 
showing them all. All form elements are required in this case. 

```cshtml
<div class="form-group">
    @Html.LabelFor(model => model.zip, htmlAttributes: new { @class = "control-label col-md-2" })
    <div class="col-md-10">
        @Html.EditorFor(model => model.zip, new { required = "required", htmlAttributes = new { @class = "form-control" } })
        @Html.ValidationMessageFor(model => model.zip, "", new { @class = "text-danger" })
    </div>
</div>
```

The view for showing all forms was slightly more annoying. It was mostly just a simple foreach loop, but I had some errors elsewhere in my code
that made it not work, so it took me a few hours to figure out where things were going wrong. In the end, this is what it looked like.

```cshtml
<table class="table">
    <tr>
        <th>
            @Html.DisplayNameFor(model => model.id)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.fullName)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.dob)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.customerNum)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.street)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.city)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.st)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.zip)
        </th>
        <th>
            @Html.DisplayNameFor(model => model.currentDate)
        </th>
        <th></th>
    </tr>

    @foreach (var item in Model)
    {
        <tr>
            <td>
                @Html.DisplayFor(model => item.id)
            </td>
            <td>
                @Html.DisplayFor(model => item.fullName)
            </td>
            <td>
                @Html.DisplayFor(model => item.dob)
            </td>
            <td>
                @Html.DisplayFor(model => item.customerNum)
            </td>
            <td>
                @Html.DisplayFor(model => item.street)
            </td>
            <td>
                @Html.DisplayFor(model => item.city)
            </td>
            <td>
                @Html.DisplayFor(model => item.st)
            </td>
            <td>
                @Html.DisplayFor(model => item.zip)
            </td>
            <td>
                @Html.DisplayFor(model => item.currentDate)
            </td>
        </tr>
    }
```

This simply gets the display name for each element for the table headers, and then uses the foreach loop to populate the
rest with the values of each attribute of each element.

## Screenshots:

This are examples of the website being used. 

[Screenshot](Untitled.png)
[Screenshot](Untitled2.png)
[Screenshot](Untitled3.png)