import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Edit } from '@emotion-icons/entypo/Edit';
import { Trash } from '@emotion-icons/entypo/Trash'

import {
    updateTask,
    deleteTask,
  } from './tableSlice';
import { useDispatch } from 'react-redux';

const StyledRow = styled.div`
    border-top: 1px solid black;
    padding: 1rem 0rem 1rem 3.5rem;

`
const StyledTask = styled.div`
    display: inline-block;
    margin-left: 0.5rem;

`
const ButtonContainer = styled.div`
    display:inline-block;
    float: right;
    margin-right: 0.5rem;
`

const StyledSave = styled.button`
    background-color: black;
    color: white;
    &:hover {
        background-color: #2E8B57;
    }
    :disabled{
        opacity: 0.5;
      }

    border: solid 2px transparent;
    border-radius: 0.4em; 
`

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
`

const StyledEdit= styled(Edit)`
    width: 1em;
    display: inline;
    &:hover {
        color: #2E8B57;
    }
`
const StyledTrash = styled(Trash)`
    width: 1em;
    display: inline;
    &:hover {
        color: #B22222;
    }
`

const Circle = styled.span`
    position: relative;
    background-color: white;
    border: 1px #0366d6 solid; 
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    float: left;
    margin-top: 0.2rem;
    margin-left: -2.5rem;

`

const TableRow = (props) => {

    const{ id, task} = props.item;

    const [toggleEdit, setEdit] = useState(task === '');
    const [taskInput, setTask] = useState(task);
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    useEffect(()=>{
        if(toggleEdit){
            inputRef.current.focus();
        }
    },[toggleEdit])

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(updateTask({ 'id':id, 'task': taskInput,}))
        setEdit(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteTask(id));
    }

    return(
        <StyledRow onDragStart={props.onDragStart} onDragEnter={props.onDragEnter} draggable={props.draggable}>
            <Circle/>
            <form>
                {toggleEdit?(
                    <StyledTask>
                        <input 
                            ref={inputRef}
                            type="text"
                            name="task"
                            value={taskInput}
                            onChange={e => setTask(e.target.value)}
                            disabled={props.isDisabled}
                            autocomplete="off"
                            />
                    </StyledTask>
                ):(
                    <StyledTask>
                        {taskInput}
                    </StyledTask>
                )}
            
                    <ButtonContainer>
                        {toggleEdit? (<StyledSave onClick={handleEdit} disabled={(taskInput.length<1 || taskInput.length>25)}>Save</StyledSave>
                            ):(
                            <span>
                                <StyledButton onClick={()=>setEdit(!toggleEdit)} ><StyledEdit/></StyledButton>
                                <StyledButton onClick={handleDelete} ><StyledTrash/></StyledButton>
                            </span>
                            )}
                    </ButtonContainer>
          </form>
        </StyledRow>
    )

}

export default TableRow;