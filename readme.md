# Term 3 JS Project : Birthday App

Hey team! So the final project here will be a birthday list.

We have a list of persons. The app will show us whose person is the closest to have their birthday.

You have a file in the project called person.json. It contains a list of persons, and we want to add all those persons to our birthday list app.

The first time you launch the app, it should fetch all the data from the people.json local file. You can use fetch for that, it also works with local files.

Once they are loaded in the app, you can save them on localstorage, and you don't need to work with the json file anymore.

The app will show the list of people, sorted by the ones who will have their birthday the soonest.

![assets/Screenshot_2020-09-12_at_16.57.18.png](assets/Screenshot_2020-09-12_at_16.57.18.png)

The screenshot is just an example of a possible layout. Feel free to create a custom layout with boostrap if you want to.

The users will be able to add a new element on the list (only on the app list localstorage, not on the json). Here are the fields :

-   first name
-   last name
-   birthday (datepicker)
-   an url for their avatar image
-   an id for handling the operations on the objects. (no need to add that on the form)

The users should be able to edit an element on the list. When you click the edit button, a modal should appear with a form inside, to edit any attribute.

The users should be able to delete an element. There will be a modal that will ask if you're sure to delete the element.

Every action should be persisted into the local storage.

Here is the package you should use for handling date computations. Add it as a dependency of your project

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

Again, try to make a plan, by dividing big tasks into smaller ones.
You have the whole week to work on it. You can collaborate with other students, but copy/pasting code is forbidden.
Once you're finished with the functionality, try to make your app more appealing with css and other tricks.
Be creative 🎨

Good Luck



## Student report.

I only work in this project on Thursday and Friday so I didn't manage to get everything working. I fetch the data from the people.json file and added all the popups for add item, edit and delete buttons. I only have a few functions in my code and only some of them are working in the way I expected them to be. I didn't go really deep in this project because I ama stuck with some input values.

## Code stucture.

I started this code by adding some html elements in the index.html file. The first function in the script.js file is a function that fetch the data from the people.json file. Created some sting html to generate the data into html.

## Improvement.

If I have more time, I would finish all the features that we are asked to do, and style the code nicely.

## Lessons learned.


## Biggest challenge.

HOnestly, I didn't meet the most challenging part in this project, but I have a problem about the localstorage, only the list that I have just add that I can see in my local storage not all of them. Not only that but also I have a probless with the popup for editing a person's information.

## More explanation.
I need more explanation on making the birthday date not looks like a timestamp.


