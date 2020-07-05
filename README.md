# Forms
>Forms is an interactive surveying applications. Which can create forms with a slick interface.

## Features
* Authentication
* Notifications
* Survey data analysis
* Multiple question types e.g. multiple choice, written, slider etc.
* All basic features related to creating a survey

## Running code
To run the code you will need [Golang](https://golang.org/) and [NodeJs](https://nodejs.org/en/). Then you can run the following commands:
```bash
git clone https://github.com/nireo/forms
```

### Run front-end
```bash
cd client
npm install
npm run
```

### Run back-end
```
cd server
go run main.go
```
If you don't have multiple Golang dependencies loaded you will probably come across errors while running the code. This can fixed by installing the dependencies like this:
```
go get -u dependency-name
```

## Contributing
Anyone can commit to the project, but completely new and unaccounted features will probably not be accepted.
