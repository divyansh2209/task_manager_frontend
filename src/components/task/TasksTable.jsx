import React, { useEffect, useState } from 'react'

import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    CardBody,
    Chip,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { db } from '../../firebase';
import { get, ref } from 'firebase/database';
import toast from 'react-hot-toast';
import { updateTask } from './taskApi';

const TasksTable = ({ myTasks }) => {
    const [assignedUserObjects, setAssignedUserObjects] = useState([]);


    const TaskList = myTasks

    // console.log(`TASK LIST : ${TaskList}`)

    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("due_date");

    

    const sortTasks = () => {
        const sortedTasks = [...TaskList];

        sortedTasks.sort((a, b) => {
            const aValue = sortBy === "due_date" ? new Date(a[sortBy]) : a[sortBy];
            const bValue = sortBy === "due_date" ? new Date(b[sortBy]) : b[sortBy];

            if (sortOrder === "asc") {
                return aValue < bValue ? -1 : 1;
            } else {
                return aValue > bValue ? -1 : 1;
            }
        });

        return sortedTasks;
    };


    const handleSortClick = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    const handleUpdate = (e , task ) => {
        const updatedTask = {...task , status: e.target.value};
        updateTask(updatedTask).then(()=>{toast.success("Status changed , reload")});
    }


    return (
        <div>
            <CardBody className="px-0 mb-6">
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            <th
                                className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Title
                                </Typography>
                            </th>
                            <th
                                className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors "
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Description
                                </Typography>
                            </th>
                            <th onClick={() => handleSortClick("due_date")}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Due Date
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </Typography>
                            </th>
                            <th onClick={() => handleSortClick("status")}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Status
                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                </Typography>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortTasks().map((task, index) => {
                            const { title, description, status, due_date, user } = task;
                            const assigned_user_object = assignedUserObjects[index];
                            const isLast = index === myTasks.length - 1;
                            const classes = isLast ? "p-4 pb-0" : "p-4 border-b border-blue-gray-50";

                            return (
                                <React.Fragment key={title}>
                                    <tr key={title}>
                                        <td className={`${classes} `}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                    >
                                                        {title}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col w-max">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {description}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {new Date(due_date).toLocaleDateString('en-GB')}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max flex">

                                                <select
                                                    value={status}
                                                    onChange={(e) => handleUpdate(e, task)}
                                                    className={`bg-${status === 'pending' ? "red" : "green"}`}
                                                    name=""
                                                    id=""
                                                >
                                                    <option value="pending">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            value="Pending"
                                                            color="red"
                                                        />
                                                    </option>
                                                    <option value="completed">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            value="Completed"
                                                            color="green"
                                                        />
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </div>
    );
};

export default TasksTable;