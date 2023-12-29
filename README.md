# Employee Tracker

## Table of Contents

- [Description](#Description)
- [Usage](#Usage)
- [License](#License)
- [Installation](#Installation)
- [Testing](#Testing)
- [Contributors](#Contributors)
- [Questions](#Questions)

## Description

Employee Tracker is a command-line application designed to manage a company's employee database efficiently. It leverages Node.js, Inquirer, and MySQL to provide a comprehensive solution for H.R. teams. The motivation behind this application was to gain a deeper understanding of SQL and to simplify the process of tracking staff roles and salaries. The key learning from this project was how to manipulate SQL databases and display data tables in the terminal, thereby solving the challenge of managing employee information effectively.

## Usage

To understand how to use the application, please refer to the instructional video provided [here](https://drive.google.com/file/d/1l1RGs4eez66GYBFHCS75o0TAJbL18pqu/view). The application operates within a terminal and offers various functionalities to view, add, update, and delete employee records, alongside managing roles and departments.

## License

This project is licensed under the Apache License 2.0.

![Apache License](https://img.shields.io/badge/license-Apache--2.0-blue)

## Installation

1. Clone the repository from GitHub: `https://github.com/kandekore/employee-tracker.git`
2. In a terminal window, execute `npm install` to install necessary dependencies.
3. Launch MySQL with `mysql -u "your_username" -p "your_password"`.
4. Initialize the database with `source db/schema.sql`.
5. Optionally, seed the database for sample data with `db/seeds.sql`.
6. Exit MySQL by typing `quit`.
7. Start the application by running `node index.js` in the terminal.

# Note on Using the `.env` File in Employee Tracker

When publishing the Employee Tracker application, it's important to use a `.env` file for managing sensitive information, such as your MySQL credentials. This file helps in securely storing environment variables and keeping them separate from your source code. Here's a brief guide on how to set up and use the `.env` file:

## Setting Up the `.env` File

1. **Create the File**:
    - In the root directory of your project, create a new file named `.env`.

2. **Add Environment Variables**:
    - Inside the `.env` file, add your MySQL credentials and database name as environment variables. For example:
      ```
      DB_USER='your_mysql_username'
      DB_PASSWORD='your_mysql_password'
      DB_NAME='employee_db'
      ```
    - Replace `your_mysql_username` and `your_mysql_password` with your actual MySQL username and password.

3. **Reference in the Application**:
    - In your Node.js application, particularly in the database connection configuration file (`connection.js`), reference these variables instead of hardcoding the credentials. For example:
      ```javascript
      require('dotenv').config();

      const dbase = sql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // ... other settings ...
      });
      ```

## Benefits of Using `.env`

- **Security**: Keeps sensitive data like database credentials out of your source code, which is especially important when your code is stored in public repositories.
- **Flexibility**: Allows easy updates to your environment variables without changing the source code.
- **Environment Separation**: Useful for setting different configurations for development, testing, and production environments.

## Important Reminders

- **Do Not Commit**: Ensure that the `.env` file is included in your `.gitignore` file. This prevents it from being committed to your version control system, safeguarding your credentials.
- **Consistent Updates**: Whenever you change your database credentials, remember to update them in the `.env` file accordingly.

By following these guidelines, you can effectively use the `.env` file to manage your application’s environment variables, enhancing both security and maintainability.

## Testing

To test the application, try making various inputs such as adding, updating, or deleting employee records. Check the functionality of viewing options and ensure the delete functions operate as expected.

## Contributors

Primary Contributor: [Darren Kandekore](https://github.com/kandekore)

## Questions

For any inquiries or questions regarding this project, please contact:

- GitHub Profile: [Kandekore](https://github.com/Kandekore)
- Email: [darren@kandekore.net](mailto:darren@kandekore.net)

---

**Note**: Ensure you replace `"your_username"` and `"your_password"` with your actual MySQL credentials when setting up the database. The provided video link gives a comprehensive guide on how to use the application effectively.
