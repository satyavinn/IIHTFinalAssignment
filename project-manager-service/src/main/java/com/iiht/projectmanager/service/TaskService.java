package com.iiht.projectmanager.service;

import com.iiht.projectmanager.dto.TaskDto;
import com.iiht.projectmanager.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
    Task getTaskById(Long taskId);
    void addTask(Task task);
    void updateTask(Task task);
    void endTask(Task task);
    List<Task> getTasksByProjectId(Long projectId);
    Task getTaskFromTaskDto(TaskDto taskDto);
    TaskDto getTaskDtoFromTask(Task task);
}
