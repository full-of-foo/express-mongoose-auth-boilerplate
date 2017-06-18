Express Mongoose Auth Boilerplate
==========

Just enough boilerplate to get you meaningfully going with TODO. The tooling set up is as follows:
 * Express 4+
 * Babel Es6 pipeline
 * Jasmine (for unit and functional testing)
 * Dockerised Xenial image (for running test and application containers)

## Usage

Clone the repo and `cd` into it. Then build and run the application with:

```
docker build -t express-mongoose-auth-boilerplate . && docker run -it -p 8080:8080 express-mongoose-auth-boilerplate app
```

We can visit the API with:

```
$ curl http://localhost:8080/api
{"version":"0.0.1","env":"development"}
```

## Testing

```
docker build -t express-mongoose-auth-boilerplate . && docker run express-mongoose-auth-boilerplate app
```
