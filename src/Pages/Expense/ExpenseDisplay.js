import React, { useContext, useState } from 'react';
import ExpenseContext from '../../Contexts/ExpenseContext';
import './ExpenseDisplay.module.css'

const ExpenseDisplay = () => {
    const expenseCtx = useContext(ExpenseContext);
    const [editing, setEditing] = useState(null);
    const [editData, setEditData] = useState({
        money: '',
        description: '',
        typeofexpense: 'food'
    });

    const deleteHandler = (id) => {
        expenseCtx.deleteExpense(id);
    };

    const editHandler = (expense) => {
        setEditing(expense.id);
        setEditData({ money: expense.money, description: expense.description, typeofexpense: expense.typeofexpense });
    };

    const saveHandler = (id) => {
        expenseCtx.editExpense(id, editData);
        setEditing(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({ ...prevState, [name]: value }));
    };

    const expenseData = expenseCtx.expenses.map((expense, index) => (
        <li key={index} id={index}>
            {editing !== expense.id ? (
                <>
                    <span>Amount: ${expense.money}</span>
                    <span>Description: {expense.description}</span>
                    <span>Type of Expense: {expense.typeofexpense}</span>
                    <button onClick={() => deleteHandler(expense.id,index)}>Delete</button>
                    <button onClick={() => editHandler(expense)}>Edit</button>
                </>
            ) : (
                <>
                    <label>Amount: </label>
                    <input
                        name="money"
                        value={editData.money}
                        onChange={handleChange}
                    />
                    <label>Description: </label>
                    <input
                        name="description"
                        value={editData.description}
                        onChange={handleChange}
                    />
                    <label>Type of Expense: </label>
                    <select
                        name="typeofexpense"
                        value={editData.typeofexpense}
                        onChange={handleChange}
                    >
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="shopping">Shopping</option>
                        <option value="rent">Rent</option>
                    </select>
                    <button onClick={() => saveHandler(expense.id)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                </>
            )}
        </li>
    ));

    return (
        <div>
            <div>
                <ul >
                    {expenseData}
                </ul>
            </div>
        </div>
    );
};

export default ExpenseDisplay;
