package com.example.springboot.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.List;

@DynamoDBTable(tableName = "MelodyMap_course")
public class MelodyMap_course {

    private String courseRegion;
    private List<Course> courses;

    @DynamoDBHashKey(attributeName = "Course_region")
    public String getCourseRegion() {
        return courseRegion;
    }

    public void setCourseRegion(String courseRegion) {
        this.courseRegion = courseRegion;
    }

    @DynamoDBAttribute(attributeName = "Courses")
    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    @DynamoDBDocument
    public static class Course {
        private String courseName;
        private String courseDistance;
        private String courseTime;
        private String courseInfo;
        private List<CourseDesc> courseDesc;

        @DynamoDBAttribute(attributeName = "Course_name")
        public String getCourseName() {
            return courseName;
        }

        public void setCourseName(String courseName) {
            this.courseName = courseName;
        }

        @DynamoDBAttribute(attributeName = "course_distance")
        public String getCourseDistance() {
            return courseDistance;
        }

        public void setCourseDistance(String courseDistance) {
            this.courseDistance = courseDistance;
        }

        @DynamoDBAttribute(attributeName = "Course_time")
        public String getCourseTime() {
            return courseTime;
        }

        public void setCourseTime(String courseTime) {
            this.courseTime = courseTime;
        }

        @DynamoDBAttribute(attributeName = "course_info")
        public String getCourseInfo() {
            return courseInfo;
        }

        public void setCourseInfo(String courseInfo) {
            this.courseInfo = courseInfo;
        }

        @DynamoDBAttribute(attributeName = "Course_desc")
        public List<CourseDesc> getCourseDesc() {
            return courseDesc;
        }

        public void setCourseDesc(List<CourseDesc> courseDesc) {
            this.courseDesc = courseDesc;
        }
    }

    @DynamoDBDocument
    public static class CourseDesc {
        private String courseOutline;
        private String coursePoi;

        @DynamoDBAttribute(attributeName = "course_outline")
        public String getCourseOutline() {
            return courseOutline;
        }

        public void setCourseOutline(String courseOutline) {
            this.courseOutline = courseOutline;
        }

        @DynamoDBAttribute(attributeName = "course_poi")
        public String getCoursePoi() {
            return coursePoi;
        }

        public void setCoursePoi(String coursePoi) {
            this.coursePoi = coursePoi;
        }
    }
}
