# apiexpensemanager

An application to track expenses, depending on the configurable categories and modes.

APIs used:

GET: /api/users/getDetails/:userID to get the details of a user based on the ID.
POST: /api/users/createUser to create a new user in the system
POST: /api/users/loginUser to login and get the JWT signature.

GET: /api/categories/getAllCategories  to get all the categories in the system.
GET: /api/categories/getCategories to get the details of the categories created by the user.
POST: /api/categories/createCategory to create a new category in the system.
POST: /api/categories/removeCategory/:categoryID to remove a category based on the ID for the user.

GET: /api/modes/getAllModes to get all the modes in the system.
GET: /api/modes/getModes to get the details of all the modes created by the user.
POST: /api/modes/createMode to create a new mode in the system.
POST: /api/modes/removeMode/:modeID to remove a mode based on the ID for the user.

GET: /api/expenses/getDetails/:expenseID to get the details of an expense based on the ID for the user.
GET: /api/expenses/getExpenses to get the paginated expenses for the user.
POST: /api/expenses/createExpense to register an expense in the system.
POST: /api/expenses/updateExpense/:expenseID to update an expense data made by the same user.
