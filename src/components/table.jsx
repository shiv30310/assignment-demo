import { useContext, useEffect, useState } from "react"
import { Context } from "../reducer"
import Pagination from "./pagination"

const Table = () => {
    const [rows, setRows] = useState([])
    const [state, dispatch] = useContext(Context)
    const [searchWord, setSearchWord] = useState("")
    const [edit, setEdit] = useState({
        state: false,
        idx: 0
    })
    const [currentPage, setCurrentPage] = useState(1)

    const [changeData, setChangeData] = useState({
        email: '',
        name: '',
        role: ''
    })

    let selected = []
    const handleCheckbox = (event,id) => {

        
        
        if (event.target.checked) {
            selected.push(id)
            const checkBoxElement = document.getElementsByClassName(`body ${id}`)
            checkBoxElement.className = `body ${id} greyish`
        } else {
            selected.splice(selected.indexOf(id), 1)
            const checkBoxElement = document.getElementsByClassName(`body ${id} greyish`)
            checkBoxElement.className = `body ${id}`
        }
    }
    
    useEffect(() => {
        setRows(state.slice(currentPage*10, (currentPage+1)*10))
    }, [currentPage])

    const handleChange = (event) => {
      setSearchWord(event.target.value);
    };
  
    const handleSearch = (searchKeyword) => {
      rows.filter((row) => {
        row.email.toLowerCase.includes(searchKeyword.toLowerCase) &&
        row.name.toLowerCase.includes(searchKeyword.toLowerCase) &&
        row.role.toLowerCase.includes(searchKeyword.toLowerCase) 
    })
    };

    const handleDelete = (email) => {
        dispatch({
                type: "delete",
                email: email
        })
    }

    const handleEdit = (id, email, role, name) => {
        
        console.log(email,role, name, 'handleEdit')
        setChangeData({
            email: email,
            name: name,
            role: role
        })
        setEdit({
            state: true,
            idx: id
        })
        console.log(id)
    }

    const handleSave = () => {
        try {
            dispatch({
                type: 'modify',
                email: changeData.email,
                role: changeData.role,
                name: changeData.name
            })
            setEdit({
                state: false,
                idx: 0
            })
        } catch {
            console.log('Error in Save')
        }
        
    }

    const deleteSelected = () => {
        let selectAllCheckbox = document.querySelector('.selectAll');

        if(selectAllCheckbox.checked){
            dispatch({
                type: 'delete selected',
                start: currentPage*10,
                end: (currentPage+1)*10
            })
        }
    }

    const handleSelectAll = () => {
            let selectAllCheckbox = document.querySelector('.selectAll');
            let rowCheckboxes = document.querySelectorAll('.rowCheckbox');

            console.log(selectAllCheckbox, rowCheckboxes)

            rowCheckboxes.forEach(function(checkbox) {
                checkbox.checked = selectAllCheckbox.checked;
            });

    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, email and role"
                    value={searchWord}
                    onChange={handleChange}
                />
                <button className="search-button" onClick={() => handleSearch(searchWord)}>
                    Search
                </button>
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
                             
                            <tr className={`body ${row.id}`} key={row.id}>
                                <td >
                                    <input type="checkbox"  className="rowCheckbox" onChange={(event) => handleCheckbox(event, row.id)} />
                                </td>
                                <td>{edit.idx == row.id ? <input value={changeData.name} onChange={(event) => setChangeData({'name': event.target.value})}/> : row?.name}</td>
                                <td>{edit.idx  == row.id ? <input value={changeData.email} onChange={(event) => setChangeData({'email': event.target.value})}/> : row?.email}</td>
                                <td>{edit.idx == row.id ? <input value={changeData.role} onChange={(event) => setChangeData({'role': event.target.value})}/> : row?.role}</td>
                                <td>
                                    <button className="action-button" onClick={() => handleDelete(row.email)}>
                                        delete
                                    </button>
                                    {edit.idx == row.id ?
                                    <button className="action-button" onClick={() => handleSave()}>
                                    save </button>:
                                        <button className="action-button" onClick={() => handleEdit(row.id, row.email, row.role, row.name)}>
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