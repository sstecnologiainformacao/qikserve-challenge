# qikserve-challenge

First things first, I'd like to say thank you to have this opportunity. If you have any questions about the code feel free to tell me.

## Requirements
To run this app you need:
 - The correct Java version to run the wiremock sent by QikServe.
 - Node version 12.
 - Change the line number 5 on **checkout-supermarket-server/src/app.js** to the correct wiremock URL address that you would like to use.
 - Run the command **yarn install** inside the folders **checkout-supermarket-server** and **checkout-supermarket**.
 - Inside the root project folder run **yarn start**.
 - Enjoy!


## Follow-up Questions

 - How long did you spend on the test? 
	 - I did the tests during the development and after features as been done. More time than I used to write the code, but I would like to test more. Much more test means fewer bugs.
 - What would you add if you had more time? 
	 - I think would be good to add more unit tests and more time testing. Aside from this, I would like to add a feature to decrease the number of items that the user selected before and one more to remove the items, removing all items just clicking and confirming. 
 - How would you improve the product APIs that you had to consume? 
	 - The product API is returning duplicate values: We have name and price being return by two different URLs. I think would be a good idea to have this information in just one source of truth. Another thing is an API to return just the promotion. 
 - What did you find most difficult?
	 - The calculation, of course. I needed to have the Mac calc opened to check if the calcs was correct.
 - How did you find the overall experience, any feedback for us?
	 - The test is good. Maybe ask more about CSS to check more about front-end and some process that needs to be executed on the back-end
