import React, {FC, FormEvent, useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";
import {ChangeType, User} from "./types";
import './App.css';

const App: FC = () => {
    const {data, loading, error} = useQuery(GET_ALL_USERS)
    const [users, setUsers] = useState<User[]>([])
    const [text, setText] = useState<string>('')
    const allUsers = users.length !== 0 ? users.map(({id, name, username}) =>
        <div className="user" key={name}>
            <div className="user-body">
                {id} {username} {name}
                <button onClick={() => removeUser(id)}>Delete</button>
            </div>
        </div>
    ) : <p className="bold">No users...</p>
    const changeHandler = ({target: {value}}: ChangeType) => setText(value)
    const addTodo = (name: string) => {
        const newUser = [
            ...users,
            {id: Date.now(), name}
        ];
        setUsers(newUser);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) return;
        addTodo(text);
        setText("");
    };
    const removeUser = (id: number) => {
        const newUsers = [...users];
        newUsers.splice(id, 1);
        setUsers(newUsers);
    };
    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data, loading])
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{error.message}</h1>
    }
    return (
        <>
            <form className="col-3" onSubmit={handleSubmit}>
                <input
                    className="effect-1"
                    type="text"
                    value={text}
                    onChange={changeHandler}
                    placeholder="Enter name"
                />
                <span className="focus-border"/>
            </form>
            <div>
                {allUsers}
            </div>
        </>

    );
}

export default App;
