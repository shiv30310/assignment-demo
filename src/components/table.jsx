import { useContext, useEffect, useState } from "react"
import { Context } from "../reducer"
import Pagination from "./pagination"

const Table = () => {
    const [rows, setRows] = useState([])
    const [state, dispatch] = useContext(Context)
    const [edit, setEdit] = useState({
        state: false,
        idx: 0
    })
    const [currentPage, setCurrentPage] = useState(1)

    let selected = []
    const handleCheckbox = (event, id) => {

        if (event.target.checked) {
            selected.push(id)
            const checkBoxElement = document.querySelector(`.row${id}`)
            checkBoxElement.className = `row${id} greyish`

        } else {
            selected.splice(selected.indexOf(id), 1)
            const checkBoxElement = document.getElementById(`${id}`)
            checkBoxElement.className = `row${id}`
        }
    }
    
    useEffect(() => {
        setRows(state.slice(currentPage*10, (currentPage+1)*10))
    }, [currentPage, state])

    const handleChange = (event) => {
      let searchWord = event.target.value
      const searchedRows = rows.filter((row) => 
        row.email.toLowerCase().includes(searchWord.toLowerCase()) ||
        row.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        row.role.toLowerCase().includes(searchWord.toLowerCase()) 
    )
    
    const searchBar = document.querySelector('.search-input')
    if (searchBar.value === '') {
        setRows(state.slice(currentPage*10, (currentPage+1)*10))
    } else {
        setRows(searchedRows)
    }
    };

    const handleDelete = (id) => {
        try {
            dispatch({
                type: "delete",
                id: id
        })
        } catch(error) {
            console.log(error)
        }
    }

    const handleEdit = (id) => {
        setEdit({
            state: true,
            idx: id
        })
    }

    const handleSave = (id) => {

        const email = document.querySelector(`.email${id}`)
        const name =  document.querySelector(`.name${id}`)
        const role = document.querySelector(`.role${id}`)
        
        console.log(email, name, role)
        try {
            dispatch({
                type: 'modify',
                id: id,
                email: email.textContent,
                role: name.textContent,
                name: role.textContent
            })
            setEdit({
                state: false,
                idx: 0
            })
        } catch (error) {
            console.log(error, 'Error in Save')
        }
    }

    const deleteSelected = () => {
        let selectAllCheckbox = document.querySelector('.selectAll');
        try {
            if(selectAllCheckbox.checked){
                dispatch({
                    type: 'delete selected',
                    start: currentPage*10,
                    end: (currentPage+1)*10
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleSelectAll = () => {
            let selectAllCheckbox = document.querySelector('.selectAll');
            let rowCheckboxes = document.querySelectorAll('.rowCheckbox');
            if(selectAllCheckbox.checked){
                rowCheckboxes.forEach(function(checkbox) {
                    checkbox.checked = selectAllCheckbox.checked;
                    let rowEl = checkbox.parentElement.parentElement
                    rowEl.className = `row${rowEl.id} greyish`
                });
              }
            else {
                rowCheckboxes.forEach(function(checkbox) {
                    checkbox.checked = selectAllCheckbox.checked;
                    let rowEl = checkbox.parentElement.parentElement
                    rowEl.className = `row${rowEl.id}`
                });
            }}
            

    return (
        <>
            <div className="search-container">
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search by name, email and role"
                    onChange={handleChange}
                />
            </div>
            <div className="table-container">
                <table className='table'>
                    <thead>
                        <tr>
                        <th>
                            <input type='checkbox' className='selectAll' onChange={() => handleSelectAll()}/>
                        </th>
                        <th>
                            Name
                        </th>
                        <th >
                            Email
                        </th>
                        <th >
                            Role
                        </th>
                        <th >
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) =>
                             
                            <tr className={`row${row.id}`} id={row.id} key={row.id}>
                                <td >
                                    <input type="checkbox"  className="rowCheckbox" onChange={(event) => handleCheckbox(event, row.id)} />
                                </td>
                                <td className={`name${row.id}`} contentEditable={edit.idx == row.id ? true : false} > {row.name} </td>
                                <td className={`email${row.id}`} contentEditable={edit.idx == row.id ? true : false}> {row.email}</td>
                                <td className={`role${row.id}`} contentEditable={edit.idx == row.id ? true : false}> {row.role} </td>
                                <td>
                                    <button className="action-button" onClick={() => handleDelete(row.id)}>
                                        delete
                                    </button>
                                    {edit.idx == row.id ?
                                    <button className="action-button" onClick={() => handleSave(row.id)}>
                                    save </button>:
                                        <button className="action-button" onClick={() => handleEdit(row.id)}>
                                        edit </button>
                                        
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
            <div className="wrapper">
                <button className="delete-button" onClick={() => deleteSelected()}>
                    Delete Selected
                </button>
            </div>
            <Pagination totalRows={parseInt(state.length/10)} current={currentPage} setCurrent={(page) => setCurrentPage(page)}/>
            </div>
        </>
    )
}

export default Table