import React, { useState } from 'react';
import './ExpenseDisplay.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { expenseActions } from '../../Store/ExpenseSlice';
import axios from 'axios'


const ExpenseDisplay = () => {
    const expenses = useSelector(state => state.expense.expenses)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(null);
    const [editData, setEditData] = useState({
        money: '',
        description: '',
        typeofexpense: 'food'
    });

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`https://expensetracker-57345-default-rtdb.firebaseio.com/expenses/${id}.json`)
            alert('Your expense got deleted!')
            console.log('Your expense got deleted!')
            dispatch(expenseActions.deleteExpense(id));
        } catch (error) {
            console.log(error.message)
        }
    };

    const editHandler = (expense) => {
        setEditing(expense.id);
        setEditData({ money: expense.money, description: expense.description, typeofexpense: expense.typeofexpense });
    };

    const saveHandler = async (id) => {
        try {
            const response = await axios.put(`https://expensetracker-57345-default-rtdb.firebaseio.com/expenses/${id}.json`,
                editData
            )
            console.log(response.data)
            dispatch(expenseActions.updateExpense({ id, ...editData }))
            alert('Your expense got updated!')
            console.log('Your expense got updated!')

        } catch (error) {
            console.log(error.message)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({ ...prevState, [name]: value }));
    };

    const expenseData = expenses.map((expense, index) => (
        <li key={index} id={index}>
            {editing !== expense.id ? (
                <>
                    <span>Amount: ${expense.money}</span>
                    <span>Description: {expense.description}</span>
                    <span>Type of Expense: {expense.typeofexpense}</span>
                    <button onClick={() => deleteHandler(expense.id, index)}>Delete</button>
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
            <ul >
                {expenseData}
            </ul>
        </div>
    );
};

export default ExpenseDisplay;
