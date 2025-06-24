const User = require('./userModel')
const Expense = require('./expenseModel')



User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });


module.exports = {User, Expense}