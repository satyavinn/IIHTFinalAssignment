package com.iiht.projectmanager.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.*;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ParentTaskDto {

    private Long parentId;
    private String parentTask;

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getParentTask() {
        return parentTask;
    }

    public void setParentTask(String parentTask) {
        this.parentTask = parentTask;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParentTaskDto that = (ParentTaskDto) o;
        return Objects.equals(parentId, that.parentId) &&
                Objects.equals(parentTask, that.parentTask);
    }

    @Override
    public int hashCode() {
        return Objects.hash(parentId, parentTask);
    }
}
