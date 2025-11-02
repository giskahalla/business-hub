'use client';

import { Box, Grid } from "@mui/material"
import { FormControl, FormLabel, Input, Textarea, List, ListItem, ListDivider, Sheet, Select, 
         Option, Drawer, IconButton } from "@mui/joy"
import { KeyboardArrowDown, Edit, Delete, Check } from '@mui/icons-material';
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { useDrawer, MainButton } from "@/components";

import { BTN_STYLE, PROJECT_PRIORITY } from "@/constants";

import { project } from "@/services/redux/actions";

import '../../globals.css';

export default function ProjectCU() {

    const dispatch = useDispatch()

    const { toggleDrawer, openDrawer, data, updateData } = useDrawer();

    const customers = Object.values(useSelector((state) => state.customer.byID));
    const teams = Object.values(useSelector((state) => state.team.byID));

    const { action } = data || {}

    const [task, setTask] = useState('')
    const [values, setValues] = useState({
        name: "",
        desc: '',
        priority: '',
        budget: 0,
        client: '',
        assignee: '',
        start_date: '',
        due_date: '',
        tasks: [],
    });
    const [editingTask, setEditingTask] = useState(null);
    const [taskList, setTaskList] = useState([]);

    const handleEmpty = () => {
        setValues({ name: "", company: "", email: "", contact: "", address: ""}); 
    }

    useEffect(() => {
        if(action === 'edit' && data){
            setValues({...data, budget: data?.budget?.estimated || 0})
            setTaskList(data?.tasks || [])
        } else {
            handleEmpty()
        }
    }, [action, data])

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value});
    };

    const onClose =  () => {
        updateData(null)
        handleEmpty()
        toggleDrawer();
    }

    const handleSubmit = (e) => {
        if(values?.tasks?.length > 0){
            e.preventDefault();
            
            if(action === 'edit'){
                const { action, budget, ...rest } = values
                dispatch(project.update_project_request(rest))
            } else {
                const { action, ...rest } = values
                dispatch(project.create_project_request(rest))
            }

            onClose()
        } else {
            alert("Please add at least one task")
        };  
    }

    const handleAddTask = () => {
        if (task.trim()) { 
            const newTask = {
                title: task,
                status: undefined,  
            };
            setTaskList([...taskList, newTask]);
            setValues(prevValues => ({
                ...prevValues,
                tasks: [...taskList, newTask]
            }));
            setTask(""); 
        }
    }

    const handleDeleteTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
        setValues(prevValues => ({
            ...prevValues,
            tasks: updatedTasks
        }));
    };

    const handleEditTask = (index) => {
        setEditingTask(index);
        setTask(taskList[index].title);
    };

    const handleSaveEdit = () => {
        const updatedTasks = taskList.map((t, i) => i === editingTask ? { ...t, title: task } : t);
        setTaskList(updatedTasks);
         setValues(prevValues => ({
            ...prevValues,
            tasks: updatedTasks
        }));
        setEditingTask(null);
        setTask('');
    };

    return (
        <Drawer open={openDrawer} anchor="right" onClose={onClose}>
            <Box
                sx={{ width: 450, p: 3, height: '90%' }}
                >
                    <h2 className="font-bold text-xl">{action === 'edit' ? 'Edit Project' : 'Add New Project'}</h2>
                    <p>{action === 'edit' ? `Update details for ${data?.name}` : 'Add a new customer to your client database' }</p>

                    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col h-full justify-between mt-8">

                        <Grid container spacing={2}>  
                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Project Name</FormLabel>
                                    <Input
                                        variant="plain"
                                        value={values.name}
                                        onChange={handleChange}
                                        name="name"
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl>
                                    <FormLabel sx={{ fontWeight: 600 }}>Description</FormLabel>
                                    <Textarea
                                        variant="plain"
                                        name="desc"
                                        value={values.desc}
                                        onChange={handleChange}
                                        className="border border-gray-200"
                                        minRows={2}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Priority</FormLabel>
                                     <Select
                                        indicator={<KeyboardArrowDown />} 
                                        variant="plain"
                                        name="priority"
                                        value={values.priority || ''}
                                        onChange={(e, val) => {
                                            setValues({ ...values, priority: val});
                                        }}
                                    >
                                        {Object.values(PROJECT_PRIORITY).map((s) => (
                                            <Option value={s.value} key={s.value}>{s.label}</Option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                             <Grid size={6} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Client</FormLabel>
                                     <Select
                                        indicator={<KeyboardArrowDown />} 
                                        variant="plain"
                                        name="client"
                                        value={values.client || ''}
                                        onChange={(e, val) => {
                                            setValues({ ...values, client: val});
                                        }}
                                    >
                                        {customers.map((s) => (
                                            <Option value={s.id} key={s.id}>{s.name}</Option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={6} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Assignee</FormLabel>
                                     <Select
                                        indicator={<KeyboardArrowDown />} 
                                        variant="plain"
                                        name="assignee"
                                        value={values.assignee || ''}
                                        onChange={(e, val) => {
                                            setValues({ ...values, assignee: val});
                                        }}
                                    >
                                        {teams.map((s) => (
                                            <Option value={s.id} key={s.id}>{s.name}</Option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Estimated Budget</FormLabel>
                                    <Input
                                        type="number"
                                        variant="plain"
                                        startDecorator="$"
                                        value={values.budget}
                                        onChange={handleChange}
                                        name="budget"
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        disabled={action === 'edit'}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={6} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Start Date</FormLabel>
                                    <Input
                                        variant="plain"
                                        placeholder="Enter company name"
                                        name="start_date"
                                        type="date"
                                        value={values.start_date || ''}
                                        onChange={handleChange}
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={6} item>
                                <FormControl required>
                                    <FormLabel sx={{ fontWeight: 600 }}>Due Date</FormLabel>
                                    <Input
                                        variant="plain"
                                        placeholder="Enter company name"
                                        name="due_date"
                                        type="date"
                                        value={values.due_date || ''}
                                        onChange={handleChange}
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid size={12} item>
                                <FormControl>
                                    <FormLabel sx={{ fontWeight: 600 }}>Tasks</FormLabel>
                                    <Input
                                        variant="plain"
                                        value={task}
                                        placeholder="Input task"
                                        name="tasks"
                                        onChange={(e) => setTask(e.target.value)}
                                        className="border border-gray-200"
                                        sx={{ '--Input-minHeight': '50px', '--Input-radius': '6px' }}
                                        endDecorator={
                                        <MainButton
                                            onClick={() => handleAddTask()}
                                            title='Add'
                                        />
                                    }
                                    />
                                </FormControl>

                                {values?.tasks?.length > 0 &&
                                    <Sheet sx={{ marginTop: 2, borderRadius: 8 }} variant="soft" >
                                        <List variant="outlined">
                                             {taskList?.map((taskItem, i) => (
                                                <div key={i}>
                                                    <ListItem
                                                     endAction={
                                                        <>
                                                            <IconButton hidden={taskItem?.status} onClick={editingTask === null ? () => handleEditTask(i) : handleSaveEdit} sx={{ marginLeft: 1 }}>
                                                                {editingTask === null ?<Edit /> : editingTask === i && <Check />}
                                                            </IconButton>
                                                            <IconButton hidden={taskItem?.status} onClick={() => handleDeleteTask(i)}>
                                                                <Delete />
                                                            </IconButton>
                                                        </>
                                                    }>
                                                        {editingTask === i ? (
                                                            <Input
                                                                value={task}
                                                                onChange={(e) => setTask(e.target.value)}
                                                                variant="outlined"
                                                                size="small"
                                                                fullWidth
                                                            />
                                                        ) : (
                                                            taskItem.title
                                                        )}
                                                    </ListItem>
                                                    {i < taskList.length - 1 && <ListDivider inset="gutter" />}
                                                </div>
                                            ))}
                                        </List>
                                    </Sheet>
                                }
                            </Grid>
                        </Grid>

                        <div style={{ display: 'flex', gap: 10, textAlign: "right", marginTop: 20 }}>
                            <MainButton type="submit" title='Submit' />
                            <MainButton variant="outlined" onClick={onClose} title='Cancel' style={{...BTN_STYLE.outlined }}/>
                        </div>

                    </form>
                </Box>
        </Drawer>
    )
}