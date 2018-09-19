# 2017 Fall 316 Final Project - Foodie

http://dukefood.herokuapp.com/

To run:

note: for some commands, terminal might say: command not found/modules not found, etc. Google this error and install the packages on your local computer.

1. cd into this git directory on your local computer;

2. in data.py, change all "wenqinwang" into your computer username. (for example, "zhouyiqin", "peilinlai")

3. in server/congif/env.js, change all "wenqinwang" into your computer username.

4. in terminal, run:
   npm install  
   //this would install all the npm packages needed;

5. in terminal, run:
   createdb food

6. in terminal, run:
   npm install -g webpack 
   
   webpack --progress --colors --watch (leave this webpack process running)

7. open another terminal, run:
   bin/www  
   //this process would generate all tables in postgresql, which you can see in terminal;

8. open another terminal, run:
   python data.py  
   //this would populate your local postgresql database food.

9. go to web browser, open up:
   localhost:3000


Everytime you made some changes, need to run bin/www again (this is supposed to solve by webpack, but somehow it doesn't work on my computer)

# CS316FinalProject
