import {useState,useEffect} from "react";
import "./App.css";
export default  function App() {

    const [text, setText] = useState("");
    const  [todoList, setTodoList] = useState([] );

    useEffect(() => {
        const todoList = localStorage.getItem("todoList");
        if(todoList) {
            setTodoList(JSON.parse(todoList));
        }
    },[])

    useEffect(() => {
        if(todoList.length > 0) {
            saveToLocalStorge();
        }
    },[todoList])
    const keyPressEvent = async (e) => {
        if(e.key === "Enter") {
            const newTodo = {
                id: todoList.length + 1,
                isComplate: false,
                text: text
            };
            await setTodoList([...todoList, newTodo])
            setText("");

        }
    }
    const doneEvent = (id) => {
        const newTodoList = [...todoList];
        newTodoList.map((todo) => {
            if(todo.id === id) {
                todo.isComplate = !todo.isComplate;
            }
        })
        setTodoList(newTodoList);

    }

    const todoDelete = (id) => {
        const newTodoList = [...todoList];
        newTodoList.map((todo,index) => {
            if(todo.id === id) {
                newTodoList.splice(index,1);
            }
        })
        console.log(newTodoList)
        setTodoList(newTodoList);
        saveToLocalStorge(newTodoList);
    }

    const  saveToLocalStorge = (todo) => {

        localStorage.setItem("todoList", todo? JSON.stringify(todo) :JSON.stringify(todoList));
    }
    return (
        <div className="App">
            <h1>Todo List</h1>
            <input type="text" placeholder="Todos" value={text} onChange={(e) => setText(e.target.value)} onKeyPress={keyPressEvent} />
            <ul>
                {todoList.map((todo,index) => (
                    <>
                        <li className={`todo ${todo.isComplate && 'done'}` } key={todo.id}  >
                            <span onClick={()=>doneEvent(todo.id)} style={{"cursor":"pointer"}}>{todo.text}</span>
                              <button className="delete-button" onClick={()=> todoDelete(todo.id)}> Delete</button>
                        </li>
                    </>
                ))}
            </ul>
        </div>
    );

}