Express Mongoose Authentication Boilerplate
==========

Just enough boilerplate to get you meaningfully going with Express 4+ and JWT-based authentication. The tooling set up is as follows:
 * Express 4+ (with middleware for JWT-based auth)
 * Mongoose 4+ (with some Mongoose user model boilerplate)
 * Babel Es6 pipeline
 * Jasmine (for unit and functional testing)
 * Dockerised Xenial image (for running test and application containers)

## Usage

Clone the repo and `cd` into it. Then build and run the application with:

```
docker-compose build && docker-compose up
```

We can visit the API with:

```
$ curl http://localhost:8080/api
{"version":"0.0.1","env":"development"}
```

Try to visit a sessionfull route:
```
$ curl -v http://localhost:8080/api/user/
ost:8080/api/user/
...
< HTTP/1.1 400 Bad Request
...
{}
```

Login with our seed user:

```
$ echo '{"email": "foo@bar.com", "password": "pew"}' | curl -H "Content-Type: application/json" -X POST -d @- http://localhost:8080/api/auth/login/
{"user":{"_id":"5947e2f01545d7000a03c4cc","updatedAt":"2017-06-19T14:42:56.990Z","createdAt":"2017-06-19T14:42:56.990Z","email":"foo@bar.com"},
 "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTc5NzA0NDgsImlhdCI6MTQ5Nzg4NDA0OCwic3ViIjoiNTk0N2UyZjAxNTQ1ZDcwMDBhMDNjNGNjIn0.epdYYLColsB5eycZizSQ3Qp4pmscAywwDA80kw-7lt4"}
```

Use an access token against sessionfull routes:

```
$ TOKEN=$(node -pe 'JSON.parse(process.argv[1]).token' "$(echo '{"email": "foo@bar.com", "password": "pew"}' | curl -H "Content-Type: application/json" -X POST -d @- http://localhost:8080/api/auth/login/)")
$ curl -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" http://localhost:8080/api/user/
[{"_id":"5947e94b3d5c1d00105278aa","updatedAt":"2017-06-19T15:10:03.597Z","createdAt":"2017-06-19T15:10:03.597Z","email":"foo@bar.com"}]
```



## Testing

```
docker-compose build && docker-compose run express-mongoose-auth-boilerplate test
```
