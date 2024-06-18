package com.example.springboot.service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AmazonDynamoDBException;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.example.springboot.entity.MelodyMap2;
import com.example.springboot.entity.MelodyMap_course;
import com.example.springboot.entity.Users;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DynamoDBFindService {
    private static final Logger log = LoggerFactory.getLogger(DynamoDBFindService.class);

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

//    @Autowired
//    private ObjectMapper objectMapper;

    // 객체 조회 (해시 키로 조회) 및 count 값 증가
    public <T> Optional<T> findAndUpdateCount(Class<T> clazz, Object hashKey) {
        log.info("findAndUpdateCount called with hashKey: {}", hashKey);

        if (hashKey == null) {
            log.error("Hash key is null");
            return Optional.empty();
        }

        try {
            T result = dynamoDBMapper.load(clazz, hashKey);
            if (result != null && result instanceof MelodyMap2) {
                MelodyMap2 melodyMap = (MelodyMap2) result;
                melodyMap.setCount(melodyMap.getCount() + 1);
                log.info("Updating count for {} to: {}", hashKey, melodyMap.getCount());
                dynamoDBMapper.save(melodyMap);
            }
            return Optional.ofNullable(result);
        } catch (AmazonDynamoDBException e) {
            log.error("Error loading item with hashKey {}: {}", hashKey, e.getErrorMessage(), e);
            return Optional.empty();
        }
    }

    public <T> Optional<T> find(Class<T> clazz, Object hashKey) {
        log.info("find called with hashKey: {}", hashKey);

        if (hashKey == null) {
            log.error("Hash key is null");
            return Optional.empty();
        }

        try {
            T result = dynamoDBMapper.load(clazz, hashKey);
            return Optional.ofNullable(result);
        } catch (AmazonDynamoDBException e) {
            log.error("Error occurred while fetching data from DynamoDB with hashKey {}: {}", hashKey, e.getErrorMessage(), e);
            return Optional.empty();
        }
    }
    public <T> T save(T entity) {
        try {
            dynamoDBMapper.save(entity);
            return entity;
        } catch (AmazonDynamoDBException e) {
            log.error("Error saving entity: {}", e.getErrorMessage());
            return null;
        }
    }

    // 특정 키에 해당하는 항목 삭제
    public <T> void deleteByKey(Class<T> clazz, Object hashKey) {
        // 항목 조회
        T item = dynamoDBMapper.load(clazz, hashKey);

        // 항목이 존재하면 삭제
        if (item != null) {
            dynamoDBMapper.delete(item);
        }
    }
    // 전체 조회
    public <T> List<T> findAll(Class<T> clazz) {
        return dynamoDBMapper.scan(clazz, new DynamoDBScanExpression());
    }

    // 결과저장
    public Optional<Users> appendUserResult(String userID, List<List<Map<String, String>>> newUserResults) {
        Users user = dynamoDBMapper.load(Users.class, userID);
        if (user == null) {
            log.error("User not found for userID: {}", userID);
            return Optional.empty();
        }

        List<List<Map<String, String>>> existingResults = user.getUserResult();
        if (existingResults == null) {
            existingResults = new ArrayList<>();
        }
        existingResults.addAll(newUserResults);
        user.setUserResult(existingResults);

        try {
            dynamoDBMapper.save(user);
            log.info("User data saved successfully for userID: {}", userID);
        } catch (Exception e) {
            log.error("Error saving user data for userID {}: {}", userID, e.getMessage(), e);
            return Optional.empty();
        }

        return Optional.of(user);
    }

    // 전체 조회
    public List<MelodyMap_course> findCoursesByRegion(String courseRegion) {
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterConditionEntry("Course_region",
                        new Condition().withComparisonOperator("EQ").withAttributeValueList(new AttributeValue().withS(courseRegion)));

        List<MelodyMap_course> courses = dynamoDBMapper.scan(MelodyMap_course.class, scanExpression);
        log.info("Courses from DB: {}", courses);

        for (MelodyMap_course course : courses) {
            log.info("Course Details - Region: {}, Courses: {}",
                    course.getCourseRegion(), course.getCourses());
        }

        return courses;
    }

//    public <T> List<T> scan(Class<T> clazz) {
//        return dynamoDBMapper.scan(clazz, new DynamoDBScanExpression());
//    }

//    // MelodyMap2 테이블에서 모든 result_choice와 count 값을 가져오는 메서드
//    public List<Map<String, Object>> getAllResultChoiceAndCount() {
//        List<Map<String, Object>> resultList = new ArrayList<>();
//        try {
//            // Scan 모든 항목 가져오기
//            List<MelodyMap2> items = dynamoDBMapper.scan(MelodyMap2.class, new DynamoDBScanExpression());
//            for (MelodyMap2 item : items) {
//                resultList.add(Map.of(
//                        "result_choice", item.getResult_choice(),
//                        "count", item.getCount()
//                ));
//            }
//        } catch (AmazonDynamoDBException e) {
//            log.error("Error occurred while scanning MelodyMap2 table: {}", e.getErrorMessage(), e);
//        }
//        return resultList;
//    }

}
