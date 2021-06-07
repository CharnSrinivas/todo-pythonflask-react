import { apiUrl } from "../../Containers/App";

import { v4 as uuidv4 } from "uuid";

export const AddTodo = async (title, userId) => {
  let data = {
    title: title,
    id: uuidv4(),
    isCompleted: false,
  };
  let request = await fetch(`${apiUrl}/todo/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (request.status === 500) {
    // If task created with same title as other one
    console.log("Added again " , request)
    return -1;
  }
  if (request.status === 200) {
    // Return Newly created task
    console.log('Added ',request)
    return data;
  }
};



export const deleteTodo = async (userId, taskId) => {
  let request = await fetch(`${apiUrl}/todo/${userId}/${taskId}`, {
    method: "DELETE",
  });
  if (request.status === 500) {
    return -1;
  }
  return request.status
};

export const updateTodo = async (userId,taskId) =>
{
  let request = await fetch(`${apiUrl}/todo/${userId}/${taskId}`, {
    method: "PUT",
  });
  if (request.status === 500) {
    return -1;
  }
  return request.status
}