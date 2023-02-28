# Auth-Redis-Nest
This Project demonstrate the Authenication module with Redis implmentation. <br>
The purpose of this project is to implemented the redis with the NestJs <br> 
It is build with NestJs framework with MongoDB as Database and Redis database to store and verify OTP authenication.<br>

# Prerequisites
Tech should be installed before running the application<br>
1. NestJs 
2. Docker
3. Redis
4. MongoDB
5. Postman (To execute the APIs)


# Installing Guide
After cloning the project <br>
Install Npm libraries using &nbsp; ```npm i``` <br>

Add  ```.env``` file in the root folder with variables <br>
```
DB_URL
#REDIS
REDIS_HOST
REDIS_PORT
```
# To Run
Run redis in docker <br>
Connect with Database <br>
Run ```npm run start:dev``` to run the application <br>
If everything is good you won't see red lines else you have stackoverflow to debug.

# Brief Info about project
This is build with NestJs framework. I have created auth module which includes CRUD APIs with login and OTP verfication which is implmented using redis database. Later I have discussed more about redis.

Here, User can do the following actions:<br> 
1. Create User<br>
2. Login User<br>
3. Get all Users<br>
4. Get User by Id<br>
5. Update User<br>
6. Delete User<br>
7. Request Otp for User<br>
8. Verfiy Otp for User<br>

I have use argon2 library for hashing. Redis for OTP verfication as it gives more feature above normal database. <br>
It stores at key value pair so you don't have to manage the occurence of redundany. It has Time to live (TTL) which can be used to expire otp in certain specified time.

# POSTMAN file for the APIs
Copy and paste below code in a file with ```.json``` extension and import it in the postman<br>

```
{
	"info": {
		"_postman_id": "68a8f2e8-24a7-4533-9337-1df99e9f17ad",
		"name": "RedisOtp",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "24806169"
	},
	"item": [
		{
			"name": "Get users",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{base_url}}/users",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"users"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create user",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Login user",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Get user by id",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "UpdateUser",
			"request": {
				"method": "PATCH",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userName\":\"newUser\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{base_url}}/users/update?userId=63f6014e256f9ecc6586f296",
					"host": [
						"{{base_url}}"
					],
					"path": [
						"users",
						"update"
					],
					"query": [
						{
							"key": "userId",
							"value": "63f6014e256f9ecc6586f296"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Delete User",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Generate OTP",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "Verify OTP",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		}
	]
}
```


# Things can be improve
1. I have added dtos for some APIs you can added them<br>
2. Tokens were not scope of my agenda but you can added them for session<br>
3. Caching can be added for quick response like for getAll users<br>

Please add suggestion if you thing something is not right. Help us to improve<br>
<h1>Keep coding</h1>

