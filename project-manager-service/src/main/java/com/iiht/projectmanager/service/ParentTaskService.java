package com.iiht.projectmanager.service;

import com.iiht.projectmanager.dto.ParentTaskDto;
import com.iiht.projectmanager.entity.ParentTask;

import java.util.List;

public interface ParentTaskService {
    List<ParentTask> getAllParentTasks();
    ParentTask getParentTaskById(Long parentId);
    void addParentTask(ParentTask parentTask);
    ParentTaskDto getParentTaskDtoFromParentTask(ParentTask parentTask);
    ParentTask getParentTaskFromParentTaskDto(ParentTaskDto parentTaskDto);
}
