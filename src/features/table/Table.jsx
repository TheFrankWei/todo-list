import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TableRow from './TableRow';
import { Search } from '@emotion-icons/bootstrap/Search';
import {NewMessage} from '@emotion-icons/entypo/NewMessage';
import {
    getTaskList,
    createTask,
    filterTaskList,
    setTaskList,
  } from './tableSlice';
import { useSelector, useDispatch } from 'react-redux';

const StyledTable = styled.div`
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    min-width: 20rem;
    min-height: 9.1rem;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 1.4rem 0rem 0rem 0rem;
    border: 1px solid black;

    background: linear-gradient(to right, 
        transparent 0%, 
        transparent calc(15% - 0.81px), 
        #FFB6C1 calc(15% - 0.8px), 
        #FFB6C1 calc(15% + 0.8px), 
        transparent calc(15% + 0.81px), 
        transparent 100%); 
`
const SearchContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    padding-bottom: 1rem;
    
`
const SearchBox = styled.div`
    display: inline-flex;
    border: 0.05rem solid black;
    border-radius: 1rem;
    margin: 0rem 0.5rem 0rem 0.5rem;
    overflow:hidden;
    :focus-within{
        border: 2px dashed rgba(3, 102, 214, 0.3);
      }
`
const StyledSearch = styled(Search)`
    color: gray;
    width: 0.6rem;
    display: inline;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
`
const StyledInput = styled.input`
    border: none;
    outline: none;
    width: 11.4rem;
`

const StyledNew = styled.button`
    background-color: #191970;
    color: white;
    margin-left: 3.5rem;
    min-width: 2.5rem;
    :disabled{
        opacity: 0.5;
      }

    border: solid 2px transparent;
    border-radius: 0.4em; 

    &:hover {
        color: #191970;
        border-color: currentColor;
        background-color: white;
      }
`

const TableRowContainer = styled.div`
    :empty{
        border-top: 1px solid black;
    }
    >:nth-of-type(odd){
        background: linear-gradient(to right, 
            #F0F8FF 0%, 
            #F0F8FF calc(15% - 0.81px), 
            #FFB6C1 calc(15% - 0.8px), 
            #FFB6C1 calc(15% + 0.8px), 
            #F0F8FF calc(15% + 0.81px), 
            #F0F8FF 100%); 
    }
    >: only-child{
            border-bottom: 1px solid black;
    }
     > :not(:only-child):last-child{
        background-clip: padding-box;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }
`

/*Data is in local storage as such:

taskList:[{'task:'task_name','id':'Date.now()'},...]
  -using Date.now upon creation for id as I figured it was unique enough for these purposes

*/
const Table = () => {

    
    const [search, setSearch] = useState('');
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.table.taskList);
    const filteredList = useSelector((state)=> state.table.filteredList);

    const dragItem = useRef();
    const dropItem = useRef();

    useEffect(()=>{
        dispatch(getTaskList())
    },[])

    const createRow = () => {
        setSearch('');
        setHovered(false);
        dispatch(createTask({
                    'id': Date.now(),
                    'task':'', 
                    }))
        }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if(search.length>0){
            dispatch(filterTaskList(e.target.value));
        }
    }

    const handleDragStart = (e, position) =>{
        dragItem.current = position;
    }

    const handleDragEnter = (e, position) =>{
        dropItem.current = position;

        const taskListCopy = [...taskList];
        const dragItemContent = taskListCopy[dragItem.current];
        taskListCopy.splice(dragItem.current,1);
        taskListCopy.splice(dropItem.current,0, dragItemContent);

        dragItem.current = dropItem.current;
        dropItem.current=null;

        dispatch(setTaskList(taskListCopy));
    }

    const onHover = () => {
        setHovered(true);
      };
    
      const onLeave = () => {
        setHovered(false);
      };

    return(
        <StyledTable>
                <SearchContainer>
                    <SearchBox>
                        <StyledSearch /><StyledInput type="text" placeholder ="Search..." value={search} onChange={handleSearch}/>
                    </SearchBox>
                   
                        <StyledNew onClick={()=>createRow()} disabled={taskList[0] && taskList[0].task === ''} onMouseEnter={onHover} onMouseLeave={onLeave}>New</StyledNew>
                  
                </SearchContainer>
                
                <TableRowContainer> 
                {hovered && <TableRow key={"test"} item={{'id':-1,'task':''}} isDisabled/>}
                {search.length >0? (filteredList.map((item)=>(
                    <TableRow key={item.id} item={item}/>
                ))) : (taskList? taskList.map((item, index) =>(
                    <TableRow 
                        onDragStart={(e)=>handleDragStart(e,index)}
                        onDragEnter={(e)=>handleDragEnter(e,index)} 
                        onDragOver={(e)=>e.preventDefault()}
                        draggable={taskList[0] && taskList[0].task !== ''}
                        key={item.id} 
                        item={item}/>
                )) : null)   
                }
                </TableRowContainer>
            
            
        </StyledTable>
    )

}

export default Table;