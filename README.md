# OTP Generator

## Description

The OTP Generator is an application that creates and verifies OTPs (One-Time Passwords) for users. It allows users to generate OTPs and verify them for secure authentication.

## Table of Contents

- Requirements
- Installation
- Usage
- Routes
- Error Handling
- Database
- Author


## Requirements

Before you begin, ensure you have met the following requirements:

- Node (Latest Version)
- MySQL
- Express
- Sequelize
- MVC Design Pattern

## Installation

1. Clone the repository - git clone ----repo link----
2. Install project dependencies - npm install
3. Run the database migrations to create the Users table - npx sequelize db:migrate
4. Start the server - npm start

## Usage
To use the OTP Generator, you can make HTTP requests to the following routes

## Create User
Create a user in the Users table.

Route: POST {{ baseURL }}/users
Request Body: { "phone_number": "03404934234" }

## Generate OTP
Generate a random 4-digit numeric OTP for a user if their phone number exists in the Users table. The OTP is saved in the Users table with an expiration date set to 5 minutes in the future. The user ID is returned in the response.

Route: POST {{ baseURL }}/users/generateOTP
Request Body: { "phone_number": "03404934234" }

## Verify OTP
Check if the OTP is correct and within the expiration time. If the OTP is correct, it sends the user object in the response. If incorrect, it returns an error status.

Route: GET {{ baseURL }}/users/:user_id/verifyOTP?otp=3490

## Handling Incorrect Routes
If you attempt to access an incorrect route (e.g., {{ baseURL }}/helloWorld), the application will return a 404 status with an error message indicating that the route does not exist.

## Author
Mosa Beryal (MERN stack Developer)
