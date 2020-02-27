# Forms
A google forms inspired survey creation tool. It has all the needed features you would need when making a survey. I wanted to build a easy to use application in which you can make surveys and receive some statistics about the results.

## Challenges
The biggest challenged with this project was storing the questions and answers dynamically. But after a lot of tinkering I was able to come up with a sensible solution. Also using a relational database for the first time proved to be a little bit tricky. Even though I used a new language for the back-end I didn't really have any problems with working with golang.

## Code

### Technologies
The back-end is built with go using a framework called [gin]([https://github.com/gin-gonic/gin](https://github.com/gin-gonic/gin)). I decided to use gin the code is easier to maintain compared to the `net/http` library. The front-end is built using Typescript with react, which is a popular Javascript/Typescript library. I decided to use Typescript since the only problem I had with Javascript was its weak type system. I also chose to use react since the code is easy to maintain and it's easy to develop with.

### Structure
I tried to aim for a simple structure by naming files with the corresponding use case.
#### Back-end
The back-end consists of three directories, which are: `/database`, `/lib` and `/api`. Like with most Go applications the program starts in the `main.go`file. The database directory handles the initialization of the database, the different models and migrating those models to the database. The lib directory has all the different common functions you would use in your code; e.g. JSON type alias and UUID generation. Also all the middleware is stored in the lib directory. The api directory holds the routes and their controllers. The api is also versioned with `v[version_number]`. 

#### Front-end
The front-end has similar structure to most react applications. There is a `/components` directory which holds all the different components which the app uses. Since the front-end is built with Typescript there is a `/interface` directory which holds all the custom interfaces used by the app. The `/utils` directory holds code which is commonly used in different parts of the app. The `/services` directory holds all the api call functions which communicate with the back-end. And lastly the `/store` directory holds most of the state management which is done by redux.
