---
title: Homework 6
layout: default
---
# Homework 6

This homework is creating a website for the AdventureWorks database (production section only). 

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW6.html)

[Web Page Code](https://github.com/Hindelburg/Homework6)

##	Step 1: New Repository 

I'll be honest about it, I COMPLETELY forgot about making a repository for this assignment. I got so caught up in trying to get it looking good I forgot about everything
else. (This tends to happen to me a lot.)

## Step 2: Getting the Database.

Obviously it was too late into the quarter and I'm dying inside because I got the wrong database and spent a day working with that before noticing that. 
But I did eventually get it, and restored from the backup. (I can't remember if I used Visual Studio or SQL Server Manager, I have both and can use them both.) 

## Step 3: Browsing Products.

Making this entire website was a bit of a mess for me, so I'm not going to be going through everything chronologically but instead I'm go through it however makes most 
sense to me. 

This is the code for the view that lists the bikes. The first line shows that we're using a viewmodel for this so we can get information from multiple tables. You can also
see from a lot of the code in this lab that I did some styling in the html file. This is because while I know for most cases we want it in a seperate CSS file, many
of these styles were used once and never again, so putting them in a seperate file seemed unneccessary. 

Also, you can see that I used a @foreach loop in this code to create the array of images collected from the viewmodel. These images are also links. 

```html
@model IEnumerable<AdventureWorks.Models.ViewModels.ProductCatVM>

@{
    ViewBag.Title = "List";
}

<div class="trans">
    <h2>Products</h2>

    <div class="row">

        @foreach (var i in Model)
        {
            <div class="col-md-3" style="padding: 10px 10px 10px 10px; width:244px">
                <div class="col-md-3" style="background-color:rgb(225, 225, 225); padding: 6px 6px 6px 6px; width:240px">
                    <div class="row">
                        <div class="col-md-4" style="width:250px">
                            <div>
                                <div>
                                    @{
                                        var image = String.Format("data:image/gif;base64,{0}", Convert.ToBase64String(i.image.LargePhoto));
                                    }

                                    <a href="@Url.Action("Product", "Home", new { id = (i.prod.ProductID) }, null)">
                                        <img alt="ERROR" src="@image" ; style="width:230px" />
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div style="padding-left:25px; font-size:17px">
                            @Html.DisplayFor(modelItem => i.prod.Name)
                        </div>
                        <div style="padding-left:25px; color:darkgreen;">
                            Our Price: $@Html.DisplayFor(modelItem => i.prod.StandardCost)
                        </div>
                        <div style="color:grey; font-size: 12px; padding-left: 27px">
                            List Price: $@Html.DisplayFor(modelItem => i.prod.ListPrice)
                        </div>
                    </div>
                </div>
            </div>

         }
    </div>
</div>
```

Of course, along with this, I have to show you the viewmodel I used as well. I found some viewmodels I could example mine after online, but they didn't really suit my need
so I just winged it until it worked. 

As you can probably tell, this viewmodel wasn't originally created with this intent. It was made to store the reviews and images and product information for
individual products, but I ended up using it here as well instead of creating a second viewmodel that wasn't needed. 

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdventureWorks.Models.ViewModels
{
    public class ProductCatVM
    {
        public Product prod;
        public ProductDescription prodD;
        public ProductPhoto image;
        public struct review
        {
            public string message { get; set; }
            public int rating { get; set; }
            public string name { get; set; }
            public string email { get; set; }
        }
        public review tmpReview;
        public List<review> reviews = new List<review>();


        public ProductCatVM(Product prodP, ProductDescription prodDP, ProductPhoto imageP)
        {
            image = imageP;
            prodD = prodDP;
            prod = prodP;
        }


        //public IEnumerable<ProductCategory> ReviewList { get; set; }
    }
}
```

The final part of this is the controller for the List View. Nothing special about this. In fact, I almost dind't include it in the pages document because it wasn't noteworthy really.
However, I loved the stupidly long lines of code because of all the SQL queries I had, so I kept it in for that. 

```cs
public ActionResult List(string main, string sub)
{
    if (main == null && sub == null)
        return View(db.Products.ToList());
    else if (sub == null)
    {
        List<ProductCatVM> list = new List<ProductCatVM>();
        foreach (var i in db.Products.Where(s => s.ProductSubcategory.ProductCategoryID == (db.ProductCategories.Where(d => d.Name == main).Select(d => d.ProductCategoryID).FirstOrDefault())).ToList())
        {
            ProductCatVM vm = new ProductCatVM(i, null, db.ProductProductPhotoes.Where(g => g.ProductID == i.ProductID).FirstOrDefault().ProductPhoto);

            list.Add(vm);
        }

        System.Diagnostics.Debug.WriteLine("Main no sub.");
        return View(list);
    }

    else
    {
        List<ProductCatVM> list = new List<ProductCatVM>();
        foreach (var i in db.Products.Where(s => s.ProductSubcategoryID == (db.ProductSubcategories.Where(d => d.Name == sub).Select(d => d.ProductSubcategoryID).FirstOrDefault())).Where(s => s.ProductSubcategory.ProductCategoryID == (db.ProductCategories.Where(d => d.Name == main).Select(d => d.ProductCategoryID).FirstOrDefault())))
        {
            ProductCatVM vm = new ProductCatVM(i, null, db.ProductProductPhotoes.Where(g => g.ProductID == i.ProductID).FirstOrDefault().ProductPhoto);

            list.Add(vm);
        }

        System.Diagnostics.Debug.WriteLine("Main and sub.");
        return View(list);
    }
}
```


## Step 4: Product Pages

I'm not going to include the whole view here because it isn't really important. However, here is the review list generating code. I used a loop to generate the reviews
and a loop to generate the stars for the reviews, maxing at 5.


```html
<div style="padding-left:10px; padding-right:10px">
    @foreach (var i in Model.reviews)
    {
        <div style="background-color:lightgray; padding:5px 5px 5px 5px">
            <div>
                <div style="font-size: 20px">
                    @Html.DisplayFor(modelItem => i.name)
                </div>
                <div style="color:grey">
                    @Html.DisplayFor(modelItem => i.email)
                </div>
                <div style="padding-left: 5px">
                    @for (var i2 = 0; i2 < i.rating && i2 < 5; i2++)
                    {
                        <img src="\images\star.png" alt="This is a big problem..." style="width:15px;height:15px;">
                    }
                </div>
            </div>

            <p style="background-color:white; width: 100%;">
                "@Html.DisplayFor(modelItem => i.message)"
            </p>
        </div>
        <br/>
    }
</div>
```

I'm not going to include anything from the viewmodel for this one because it's the same model. For the controller, it is fairly straight forward. While I won't include any actual
code snippets here, I will mention one thing about it that also applies to another later model. There is an assignment that puts the id in a local variable called lId. lId stores 
the value so that the controller knows which reviews to pull answers for when you go to the review writing page. I probably could have gone about this some other way that
would have been smarter, but I was pushed for time and found this solution to work. 

## Step 5: Reivews

I made this a seperate page from the product pages not particularly because I wanted to, but because I wasn't quite able to get it to look the way I wanted it to. I ran out of time
so I knew it wouldn't look as good as I wanted, so I pushed it to another page so it wouldn't ruin the look of the product page. 

I'm not including all of the view for this, only the bit that is new. This is the post form for the review.

```html
 <div class="review">
    <form method="post" action="Product" style="background-color:lightgray; padding:5px 5px 5px 5px">
        <div>
            <label for="name" style="width: 60px">Name</label>
            <input type="text" name="name" value="" style="width: 300px" />

            <br />

            <label for="email" style="width: 60px">Email</label>
            <input type="text" name="email" value="" style="width: 300px" />

            <br />

            <label for="rating" style="width: 60px">Rating</label>
            <input type="text" name="rating" value="" style="width: 300px" /> out of 5
        </div>
        <div>
            <label for="message" style="width: 60px">Message</label>
            <textarea name="message" style="background-color:aliceblue; height: 200px; width: 1000px; padding: 3px; border: none;" placeholder="Enter comments here..."></textarea>
        </div>
        <div>
            <input type="submit" name="submit" value="Submit" />
        </div>
    </form>
</div>
```

Here's the controller stuff for the posting of reviews.

```cs
[HttpPost]
public ActionResult Reviews(FormCollection form)
{
    System.Diagnostics.Debug.WriteLine(lId);

    ProductCatVM vm = new ProductCatVM(db.Products.Where(s => s.ProductID == lId).FirstOrDefault(), db.ProductDescriptions.Where(s => s.ProductDescriptionID == (db.ProductModelProductDescriptionCultures.Where(d => d.ProductModelID == (db.Products.Where(f => f.ProductID == lId).FirstOrDefault().ProductModelID)).FirstOrDefault().ProductDescriptionID)).FirstOrDefault(), db.ProductProductPhotoes.Where(g => g.ProductID == lId).FirstOrDefault().ProductPhoto);


    ViewBag.RequestMethod = "POST";
    //int Rating = int.Parse(Request.Form["rating"]);
    string ReviewerName = Request.Form["name"];
    string EmailAddress = Request.Form["email"];
    string Comments = Request.Form["message"];
    int Rating = int.Parse(Request.Form["rating"]);




    var review = new ProductReview();
    review.ProductID = lId;


    review.ReviewerName = ReviewerName;
    review.EmailAddress = EmailAddress;
    review.Rating = Rating;
    review.Comments = Comments;
    review.ReviewDate = DateTime.Today;
    review.ModifiedDate = DateTime.Today;

    db.ProductReviews.Add(review);
    db.SaveChanges();

    foreach (ProductReview p in db.ProductReviews.Where(s => s.ProductID == lId))
    {
        vm.tmpReview.message = p.Comments;
        vm.tmpReview.rating = p.Rating;
        vm.tmpReview.name = p.ReviewerName;
        vm.tmpReview.email = p.EmailAddress;
        vm.reviews.Add(vm.tmpReview);
    }

    return View(vm);
}
```

## Step 6: Shared View

Okay, I am not going to show any of the code for the shared view. I did a lot of work to make it look better, but it's super long now so including it all would be a waste. 
Nothing I did there was particullarly difficult or new, so nothing needs to be shown there. That being said, I probably put as much time into it as I did any other part of the lab.


## Screenshots:

This are examples of the website being used. 

[Screenshot](Untitled.png)
[Screenshot](Untitled2.png)
[Screenshot](Untitled3.png)
[Screenshot](Untitled4.png)