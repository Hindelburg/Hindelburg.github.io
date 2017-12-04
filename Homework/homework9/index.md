---
title: Homework 9
layout: default
---
# Homework 9

This is deploying lab 8 on the cloud, I will be keeping it detailed like my lab 8 page.

[Assignment Page](http://www.wou.edu/~morses/classes/cs46x/assignments/HW9.html)

[Deployed](http://thatartwebsite.azurewebsites.net/)

## Continuing from Lab 8

## Step 1: Azure

As I tried to do this a second time for practice, Azure decided to suspend my account. All I have to do to get it back is have them text me something, but since I have no phone
this was troublesome. If this happens during the final, hopefully I can work something out with Morse. (This is not the first issue I've had with Azure, I'm starting to hate them.)

Alright, back to writing the pages. 

Log into Azure and hope it works.

## Step 2: Resource Group

Press "Resource Groups" of the left hand side of the page, then press "+ Add" to create a new resource group. Call it whatever you'd like. For subscription, keep it on the free trial option, and for
resource group it would be best to select West US 2.

## Step 3: SQL Database

Once again, select SQL database from the menu on the left and then add a new SQL database. Give it the same name as your database from lab 8, though you don't have to.
Use the resource group you just created. For source, keep it blank. Now, you have to select a server. You don't have one yet, so press "Create a new server". I called mine
"thatartwebsite". Give it your login name and password, remember these! Also, make the location West US 2 and have Azure Services able to access it. Then click "select".

Now for pricing tier, give it basic, NOT standard. Pin this to the dashboard and create! 

## Step 4: Database Stuff

Go to visual studio and open up your lab 8 that you wish to deploy. Go to your up.sql script and try to connect to this server. It will tell you that you have to make a new firewall rule, do this.

Now, you should be able to connect, under database name, make sure to type in this name correctly. Now execute it. You should now have the database created with tables on your azure! Congrats!

Go back to Azure and click SQL database, and then your database. Select connection strings from the list. Now copy this into your clipboard, it will come in handy later.

## Step 5: Publish

Right click on your project name from the solution explorer on the right. Select "Publish" from the dropdown list. Obviously, click "Microsoft Azure App Service" and create new. 

Name it, use free trial, make sure to use the resource group you just created, and for App Service Plan I already have one made, and if you don't that sucks for you and you'll have to do that
from azure. 

## Step 6: Connection Strings

Now you need to go to azure and slick "app services" then the name you just gave your app, then go to "Application settings". There you can add a connection string.
Call it dbContext, paste that connection string I told you to copy earlier in, and you're good, save it. Okay, you aren't really good. Add your username and password where
they belong in it THEN do it again, also, for good measure, type the following into your web config in "configuration".

```
<system.diagnostics>
<trace>
    <listeners>
    <add type="Microsoft.WindowsAzure.Diagnostics.DiagnosticMonitorTraceListener, Microsoft.WindowsAzure.Diagnostics, Version=2.8.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
        name="AzureDiagnostics">
        <filter type="" />
    </add>
    </listeners>
</trace>
</system.diagnostics>
```

Also change MultipleActiveResultSets to be true.

Now republish it. You are done. 